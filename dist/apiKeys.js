/**
 * What the SDK knows about the shape of HoneyHive API keys: the fine-grained
 * control-plane key's format, checked at client construction, and the mask the
 * verbose log renders a key with. Nothing here resolves or sends a key.
 */
import { MalformedApiKeyError } from './errors.js';
/**
 * The prefix of a fine-grained control-plane API key, whose values have the
 * shape `hh_fgcp_<key id>_<key secret>`. It is the only credential the control
 * plane's API accepts, so a configured key is checked against this shape at
 * construction (see `checkControlPlaneApiKey`), and the mask below identifies
 * the values whose key id can be shown.
 */
const FGCP_KEY_PREFIX = 'hh_fgcp_';
/**
 * A complete fine-grained control-plane key: the prefix, a 24-character id, and
 * a 64-character secret over the URL-safe alphabet. Both lengths are fixed
 * properties of the key format, so a value of any other shape is a truncated or
 * corrupted key, never a newer variant.
 */
const FGCP_KEY_PATTERN = /^hh_fgcp_[A-Za-z0-9]{24}_[A-Za-z0-9_-]{64}$/;
/**
 * Returns `value` if it is a well-formed fine-grained control-plane key, and
 * throws a {@link MalformedApiKeyError} otherwise, naming `source` (the option
 * or environment variable the value came from) and what the value looks like
 * instead. The message never echoes the value itself.
 *
 * This runs at client construction whether or not middleware is supplied: a
 * present key goes into the `Authorization` header regardless, so a malformed
 * one is a fault either way, and failing here names it where a 404 from the
 * first request would not.
 */
export function checkControlPlaneApiKey(value, source) {
    const candidate = value.trim();
    if (FGCP_KEY_PATTERN.test(candidate)) {
        return candidate;
    }
    let problem = 'the value provided is not a HoneyHive API key.';
    if (candidate.startsWith(FGCP_KEY_PREFIX)) {
        problem = 'the value provided begins with it but is not a complete key.';
    }
    else if (candidate.startsWith('hh_')) {
        problem = 'the value provided looks like a different kind of HoneyHive API key.';
    }
    throw new MalformedApiKeyError(source, `must be a fine-grained control plane API key, a value beginning with '${FGCP_KEY_PREFIX}'; ${problem}`);
}
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
export function maskApiKey(apiKey) {
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
//# sourceMappingURL=apiKeys.js.map