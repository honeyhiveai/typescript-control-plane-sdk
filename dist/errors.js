/**
 * The base error class and the errors the SDK throws about its own
 * configuration. They sit apart from the request chassis so the key check can
 * throw them without importing it.
 */
/**
 * HoneyHiveError is a base class for all errors thrown by the HoneyHive control
 * plane client.
 *
 * This error is never thrown directly, but is useful for determining if an
 * error is from the client with `err instanceof HoneyHiveError`
 */
export class HoneyHiveError extends Error {
}
/**
 * Thrown at construction when no control plane API key is configured and no
 * middleware is supplied to authenticate instead. Every control plane
 * operation takes that one key, so a client without it could send nothing.
 */
export class MissingApiKeyError extends HoneyHiveError {
    constructor() {
        super('Missing API key: provide apiKey in options or set the HH_CONTROL_PLANE_API_KEY environment variable');
        this.name = 'MissingApiKeyError';
    }
}
/**
 * Thrown at construction when the control plane API key is set to a value that
 * is not a fine-grained control plane key. The message names where the value
 * came from and what it looks like instead, and never echoes the value.
 *
 * @property source - The option or environment variable the value came from.
 */
export class MalformedApiKeyError extends HoneyHiveError {
    source;
    #requirement;
    constructor(source, requirement) {
        super(`${source} ${requirement}`);
        this.name = 'MalformedApiKeyError';
        this.source = source;
        this.#requirement = requirement;
    }
    /**
     * The same message with `source` named as where the value came from, for a
     * caller that supplied the value under a different name.
     */
    messageFor(source) {
        return `${source} ${this.#requirement}`;
    }
}
//# sourceMappingURL=errors.js.map