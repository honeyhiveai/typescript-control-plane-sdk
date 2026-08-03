import axios from 'axios';
import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';

import { SDK_VERSION } from './generated/version.js';

// The control plane's public, API-key entrypoint. This is deliberately not the
// URL the HoneyHive web app talks to: the app authenticates with a session
// cookie rather than an API key, so its endpoint is not usable by this client.
// Self-hosted and per-customer deployments override via the `controlPlaneUrl`
// option or `HH_CONTROL_PLANE_URL`.
const DEFAULT_CONTROL_PLANE_URL = 'https://api.cp.us.honeyhive.ai';

/**
 * Gets an environment variable value, or returns the default value if the
 * environment variable is not set or is the empty string.
 *
 * Empty string is treated the same as unset because `FOO= node script.js`
 * (and `unset FOO; export FOO=`) are common shell patterns for "no value
 * here", and downstream code (`??` chains, URL fallbacks) would otherwise
 * propagate the empty string as if it were a real value.
 *
 * **This is cross-cutting behavior, not specific to URL resolution.** Every
 * caller (currently `HH_CONTROL_PLANE_API_KEY`, `HH_CONTROL_PLANE_URL`,
 * `HH_VERBOSE`) sees the empty-string-as-unset behavior. When adding a new
 * env var via `getEnv('HH_FOO', 'default')`, be aware that `HH_FOO=""`
 * will resolve to `'default'`, not `''`.
 *
 * This function is also isomorphic. If run from a non-Node.js environment,
 * it will return the default value.
 */
function getEnv(key: string, defaultValue?: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    const v = process.env[key];
    return v === undefined || v === '' ? defaultValue : v;
  }
  return defaultValue;
}

/**
 * The prefix of a fine-grained control-plane API key, whose values have the
 * shape `hh_fgcp_<key id>_<key secret>`. In practice this is the only credential
 * the control plane's API accepts, but the SDK does not enforce that — the
 * prefix's job here is masking: it identifies the values whose key id can be
 * shown, and everything else is redacted wholesale.
 */
const FGCP_KEY_PREFIX = 'hh_fgcp_';

/**
 * The shape of the key id segment of a fine-grained key value: exactly 24
 * alphanumeric characters, with `_` and `-` excluded so that an id can never
 * read as two segments.
 *
 * The length and the alphabet are fixed properties of the key format, so a value
 * whose id segment doesn't match this either wasn't issued by HoneyHive or has
 * been altered in transit — either way it is redacted rather than rendered.
 */
const FGCP_KEY_ID_PATTERN = /^[A-Za-z0-9]{24}$/;

/**
 * Returns a display-safe rendering of an API key for verbose logging.
 *
 * Renders `hh_fgcp_<key id>_******` — the key's id and none of its secret. This
 * is character-for-character the masked form HoneyHive displays for that key, so
 * a verbose log line can be matched directly against a key in your account.
 * Masking from the id rather than from the secret is what makes it unique per
 * key and free of secret material.
 *
 * The id is `_`-free by construction, so it is everything up to the first `_`
 * after the prefix.
 *
 * Anything else collapses to 8 fixed-width asterisks, revealing neither its
 * length nor its content. That covers both a value that isn't a fine-grained key
 * at all — the SDK forwards whatever it is given, so this function must assume
 * it may be handed a coarse-grained HoneyHive key or a credential belonging to
 * some other system entirely — and a fine-grained value whose id segment is
 * truncated or mangled, where the characters after the prefix could be secret
 * material rather than an id.
 *
 * Both guards are load-bearing, and the prefix guard especially: without it the
 * unconditional slice below would chop 8 characters off an arbitrary token and
 * any value whose next 24 characters happened to be alphanumerics followed by
 * `_` would render as `hh_fgcp_<24 chars of that token>_******`, echoing part of
 * a foreign credential under our own prefix. So the output is always either
 * exactly the server's mask or fully redacted, never a partial echo.
 */
function maskApiKey(apiKey: string): string {
  if (!apiKey.startsWith(FGCP_KEY_PREFIX)) {
    return '********';
  }
  const rest = apiKey.slice(FGCP_KEY_PREFIX.length);
  const separator = rest.indexOf('_');
  // An empty id never matches the pattern, so a value with no separator at all
  // takes the redacted path without a second branch.
  const keyId = separator === -1 ? '' : rest.slice(0, separator);
  if (!FGCP_KEY_ID_PATTERN.test(keyId)) {
    return '********';
  }
  return `${FGCP_KEY_PREFIX}${keyId}_******`;
}

/**
 * Configuration options for the HoneyHive Control Plane client. They extend the
 * options from openapi-fetch, but replace 'baseUrl' with 'controlPlaneUrl' so
 * the name is unambiguous (the data plane SDK uses 'dataPlaneUrl').
 */
export interface ClientConfig extends Omit<ClientOptions, 'baseUrl' | 'headers'> {
  /**
   * A fine-grained control-plane API key (`hh_fgcp_…`), the only credential the
   * control plane's API accepts in practice. Sent as a bearer token as-is; the
   * control plane is what rejects a key it doesn't accept. Defaults to the
   * `HH_CONTROL_PLANE_API_KEY` environment variable.
   */
  apiKey?: string;
  controlPlaneUrl?: string;
  middleware?: Middleware[];

  /**
   * When true, logs the resolved control plane URL, a masked API key, and the
   * SDK package + version via `console.error` on client construction (stderr in
   * Node, devtools in the browser). Useful for confirming which environment,
   * credential, and SDK build the client is configured with. Defaults to
   * true when the `HH_VERBOSE` environment variable is set to `'true'`
   * (case-insensitive).
   */
  verbose?: boolean;

  /**
   * @internal HoneyHive use only. Overrides the default SDK provenance headers
   * with custom values (e.g. for the CLI or frontend).
   */
  _internal_provenance?: {
    // Constrain the type to known values to further discourage
    // customers from setting something arbitrary
    package: 'cp-frontend' | '@honeyhive/cli';
    version: string;
  };

  // Technically speaking headers can be more complicated than this (e.g.
  // arrays), but to keep the implementation simple we constrain headers to how
  // most people use them anyways
  headers?: Record<string, string>;
}

/**
 * Custom query serializer that delegates to axios.
 *
 * openapi-fetch defaults to "explode" style (`key=a&key=b`), which the HoneyHive
 * API reads as a plain string rather than a one-element array. Axios uses bracket
 * notation (`key[]=a&key[]=b`) and handles nested objects and arrays
 * recursively, which the API parses correctly.
 */
function querySerializer(queryParams: Record<string, unknown>): string {
  const uri = axios.getUri({ url: '', params: queryParams });
  return uri.startsWith('?') ? uri.slice(1) : uri;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- needs to match openapi-fetch's own createClient<Paths extends {}> signature
export function createApiClient<Paths extends {}>(
  options: ClientConfig,
): ReturnType<typeof createClient<Paths>> {
  const { apiKey, controlPlaneUrl, middleware, verbose, _internal_provenance, ...clientOptions } =
    options;
  const resolvedApiKey = apiKey ?? getEnv('HH_CONTROL_PLANE_API_KEY');

  // Resolution order: option > env var > default. For the option, any
  // non-undefined value wins (so explicit undefined falls back). For the env
  // var, both unset and empty-string fall back, because `getEnv` normalizes
  // empty-string to undefined — see `getEnv` for the rationale. The default
  // targets HoneyHive's managed control plane; self-hosted and per-customer
  // deployments override via the option or `HH_CONTROL_PLANE_URL`.
  const resolvedControlPlaneUrl =
    controlPlaneUrl ?? getEnv('HH_CONTROL_PLANE_URL') ?? DEFAULT_CONTROL_PLANE_URL;

  const resolvedVerbose = verbose ?? getEnv('HH_VERBOSE')?.toLowerCase() === 'true';
  const provenance = _internal_provenance ?? {
    package: '@honeyhive/control-plane-sdk',
    version: SDK_VERSION,
  };

  // Log before the missing-key check so verbose users can see what *did*
  // resolve when construction is about to fail.
  if (resolvedVerbose) {
    console.error(`Control plane URL: ${resolvedControlPlaneUrl}`);
    console.error(`API key: ${resolvedApiKey ? maskApiKey(resolvedApiKey) : '(none)'}`);
    console.error(`Package: ${provenance.package} v${provenance.version}`);
  }

  // When middleware is supplied, it is assumed to handle authentication itself
  // (for example by attaching a short-lived token per request), so no key is
  // required. The URL always resolves (option > env > default), so only the key
  // can be missing here.
  if (!resolvedApiKey && !middleware?.length) {
    throw new Error(
      'Missing API key: provide apiKey in options or set the HH_CONTROL_PLANE_API_KEY environment variable',
    );
  }

  const headers: Record<string, string> = {
    'hh-client-package': provenance.package,
    'hh-client-version': provenance.version,
    'hh-client-language': 'typescript',
  };
  if (resolvedApiKey) {
    headers.Authorization = `Bearer ${resolvedApiKey}`;
  }

  const client = createClient<Paths>({
    ...clientOptions,
    querySerializer,
    // Always set (option > env > default). Middleware, when supplied, may still
    // rewrite the request URL per-request, but the resolved value is the default
    // otherwise.
    baseUrl: resolvedControlPlaneUrl,
    headers: {
      ...headers,
      ...clientOptions.headers,
    },
  });

  if (middleware?.length) {
    client.use(...middleware);
  }

  return client;
}

/**
 * Per-request fetch-level options that are orthogonal to the API request
 * payload. These are passed through to the underlying `fetch()` call via
 * openapi-fetch's init spread.
 *
 * Intentionally kept separate from `*Request` types so API-domain interfaces
 * stay serializable and free of DOM/transport concerns.
 */
export interface FetchOptions {
  /**
   * An `AbortSignal` to cancel the in-flight HTTP request. When the signal
   * fires, the underlying `fetch()` rejects with an `AbortError` wrapped in
   * a `NetworkError`.
   *
   * @example
   * ```ts
   * const controller = new AbortController();
   * setTimeout(() => controller.abort(), 5000);
   * const result = await client.alerts.get(request, { signal: controller.signal });
   * ```
   */
  signal?: AbortSignal;
}

/** Structural match for both branches of openapi-fetch's FetchResponse union. */
type FetchResult<T = unknown, E = unknown> =
  | { data: T; error?: undefined; response: Response }
  | { data?: undefined; error: E; response: Response };

/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive control
 * plane client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the client with `err instanceof HoneyHiveError`
 */
export class HoneyHiveError extends Error {}

/**
 * Type guard that returns the payload as ErrorResponse if it matches the
 * canonical shape, or undefined otherwise.
 */
function asErrorResponse(e: unknown): ErrorResponse | undefined {
  if (
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof e.message === 'string' &&
    'statusCode' in e &&
    typeof e.statusCode === 'number' &&
    'success' in e &&
    typeof e.success === 'boolean' &&
    // `errorCode` is optional here because not every error response carries it
    // yet; it will become required in a future major version.
    ('errorCode' in e ? typeof e.errorCode === 'string' : true)
  ) {
    return e as ErrorResponse;
  }
  return undefined;
}

/**
 * An error that is thrown when the API call was not successful
 *
 * @property status - The HTTP status code of the response
 * @property response - The Response object from the fetch call. Call
 * `await err.response.text()` to see details of the error.
 */
export class ApiError extends HoneyHiveError {
  public readonly status: number;
  public readonly response: Response;
  public readonly error: unknown;

  constructor(status: number, error: unknown, response: Response) {
    const parsed = asErrorResponse(error);
    const message =
      parsed !== undefined ? `API error ${status}: ${parsed.message}` : `API error ${status}`;
    super(message, { cause: error });
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
    this.error = error;
  }

  /**
   * Returns the parsed error response body with its known type, or `undefined`
   * if the body doesn't match the expected shape.
   *
   * The HoneyHive API returns `{ statusCode, message, success, errorCode }` as
   * JSON for all error responses. However, failures that happen before a request
   * reaches the API (e.g. an HTML 502 from a load balancer, or a generic 404) can
   * arrive in an unrecognized shape, in which case we return undefined.
   */
  public parseError(): ErrorResponse | undefined {
    return asErrorResponse(this.error);
  }
}

/**
 * The standard error response shape the HoneyHive API returns for all non-2xx
 * responses.
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errorCode: string;
}

/**
 * An error that is thrown when the API call fails at the network level
 * (e.g. DNS failures, timeouts, connection refused)
 */
export class NetworkError extends HoneyHiveError {
  readonly error: unknown;

  constructor(error: unknown) {
    super(error instanceof Error ? error.message : String(error), { cause: error });
    this.name = 'NetworkError';
    this.error = error;
  }
}

/**
 * Narrows a FetchResult to its success branch while also stripping the
 * `undefined` that openapi-fetch adds to `data` across both union members.
 *
 * By declaring `result is { data: T; … }` (without `| undefined`), TypeScript
 * narrows `data` from `T | undefined` to `T` after the guard — no cast needed.
 */
function isSuccess<T, E>(
  result: FetchResult<T | undefined, E>,
): result is { data: T; error?: undefined; response: Response } {
  return result.error === undefined;
}

/**
 * Unwraps a fetch result, throwing an ApiError if the result contains an error.
 * This enables a more ergonomic way of consuming the results of API calls.
 *
 * The generic accepts `FetchResult<T | undefined, E>` so that `T` itself is
 * inferred without `undefined`. openapi-fetch's union types `data` as
 * `ResponseType | undefined` across both branches; by absorbing the
 * `undefined` in the parameter, the return type is a clean `Promise<T>`.
 */
export async function unwrap<T, E>(promise: Promise<FetchResult<T | undefined, E>>): Promise<T> {
  let result: FetchResult<T | undefined, E>;
  try {
    result = await promise;
  } catch (error) {
    if (error instanceof HoneyHiveError) {
      throw error;
    }
    throw new NetworkError(error);
  }
  if (!isSuccess(result)) {
    throw new ApiError(result.response.status, result.error, result.response);
  }
  return result.data;
}
