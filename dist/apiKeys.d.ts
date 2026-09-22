/**
 * What the SDK knows about the shape of HoneyHive API keys: the fine-grained
 * control-plane key's format, checked at client construction, and the mask the
 * verbose log renders a key with. Nothing here resolves or sends a key.
 */
/**
 * Returns `value` if it is a well-formed fine-grained control-plane key, and
 * throws otherwise, naming `source` (the option or environment variable the
 * value came from) and what the value looks like instead. The message never
 * echoes the value itself.
 *
 * This runs at client construction whether or not middleware is supplied: a
 * present key goes into the `Authorization` header regardless, so a malformed
 * one is a fault either way, and failing here names it where a 404 from the
 * first request would not.
 */
export declare function checkControlPlaneApiKey(value: string, source: string): string;
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
export declare function maskApiKey(apiKey: string): string;
//# sourceMappingURL=apiKeys.d.ts.map