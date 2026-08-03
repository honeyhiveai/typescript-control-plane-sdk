import createClient, { type ClientOptions, type Middleware } from 'openapi-fetch';
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
        package: 'cp-frontend' | '@honeyhive/cli';
        version: string;
    };
    headers?: Record<string, string>;
}
export declare function createApiClient<Paths extends {}>(options: ClientConfig): ReturnType<typeof createClient<Paths>>;
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
type FetchResult<T = unknown, E = unknown> = {
    data: T;
    error?: undefined;
    response: Response;
} | {
    data?: undefined;
    error: E;
    response: Response;
};
/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive control
 * plane client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the client with `err instanceof HoneyHiveError`
 */
export declare class HoneyHiveError extends Error {
}
/**
 * An error that is thrown when the API call was not successful
 *
 * @property status - The HTTP status code of the response
 * @property response - The Response object from the fetch call. Call
 * `await err.response.text()` to see details of the error.
 */
export declare class ApiError extends HoneyHiveError {
    readonly status: number;
    readonly response: Response;
    readonly error: unknown;
    constructor(status: number, error: unknown, response: Response);
    /**
     * Returns the parsed error response body with its known type, or `undefined`
     * if the body doesn't match the expected shape.
     *
     * The HoneyHive API returns `{ statusCode, message, success, errorCode }` as
     * JSON for all error responses. However, failures that happen before a request
     * reaches the API (e.g. an HTML 502 from a load balancer, or a generic 404) can
     * arrive in an unrecognized shape, in which case we return undefined.
     */
    parseError(): ErrorResponse | undefined;
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
export declare class NetworkError extends HoneyHiveError {
    readonly error: unknown;
    constructor(error: unknown);
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
export declare function unwrap<T, E>(promise: Promise<FetchResult<T | undefined, E>>): Promise<T>;
export {};
//# sourceMappingURL=util.d.ts.map