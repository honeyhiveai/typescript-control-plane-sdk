import axios from 'axios';
import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';

import { checkControlPlaneApiKey, maskApiKey } from './apiKeys.js';
import { HoneyHiveError, MissingApiKeyError } from './errors.js';
import { type ApiClients } from './generated/client.js';
import { type paths } from './generated/types.js';
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
 * Configuration options for the HoneyHive Control Plane client. They extend the
 * options from openapi-fetch, but replace 'baseUrl' with 'controlPlaneUrl' so
 * the name is unambiguous (the data plane SDK uses 'dataPlaneUrl').
 */
export interface ClientConfig extends Omit<ClientOptions, 'baseUrl' | 'headers'> {
  /**
   * A fine-grained control-plane API key (`hh_fgcp_…`), the only credential the
   * control plane's API accepts. Defaults to the `HH_CONTROL_PLANE_API_KEY`
   * environment variable. The value is trimmed, and one that is not a
   * well-formed fine-grained key throws at construction, naming the option or
   * variable it came from. An empty value counts as no key.
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

/**
 * Resolves the client's credential and returns the openapi-fetch client that
 * carries it, keyed by the security scheme the spec defines. Every generated
 * method indexes the result by its operation's scheme.
 */
export function createApiClient(options: ClientConfig): ApiClients {
  const { apiKey, controlPlaneUrl, middleware, verbose, _internal_provenance, ...clientOptions } =
    options;
  // Option > env var. The source travels with the value so the shape check
  // below can name where a bad value came from.
  const [rawApiKey, apiKeySource] =
    apiKey !== undefined ? [apiKey, 'apiKey'] : [getEnv('HH_CONTROL_PLANE_API_KEY'), 'HH_CONTROL_PLANE_API_KEY']; // prettier-ignore

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

  // Log before either check that can throw (a malformed key, a missing key) so
  // verbose users can see what *did* resolve when construction is about to
  // fail. The mask redacts a malformed key wholesale.
  if (resolvedVerbose) {
    console.error(`Control plane URL: ${resolvedControlPlaneUrl}`);
    console.error(`API key: ${rawApiKey ? maskApiKey(rawApiKey) : '(none)'}`);
    console.error(`Package: ${provenance.package} v${provenance.version}`);
  }

  // A present key is checked for shape here, at construction, whether or not
  // middleware is supplied. An empty key is no key (below), not a bad one.
  const resolvedApiKey = rawApiKey ? checkControlPlaneApiKey(rawApiKey, apiKeySource) : rawApiKey;

  // When middleware is supplied, it is assumed to handle authentication itself
  // (for example by attaching a short-lived token per request), so no key is
  // required. The URL always resolves (option > env > default), so only the key
  // can be missing here.
  if (!resolvedApiKey && !middleware?.length) {
    throw new MissingApiKeyError();
  }

  const headers: Record<string, string> = {
    'hh-client-package': provenance.package,
    'hh-client-version': provenance.version,
    'hh-client-language': 'typescript',
  };
  if (resolvedApiKey) {
    headers.Authorization = `Bearer ${resolvedApiKey}`;
  }

  const client = createClient<paths>({
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

  // The control plane takes one credential kind, the fine-grained control
  // plane key, so every scheme maps to the one client. Keyed by the schemes
  // the spec defines, so a scheme added to or removed from the spec fails to
  // compile here until this table says which client serves it.
  const clients: ApiClients = { ControlPlaneApiKey: client };
  return clients;
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
