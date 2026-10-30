# TypeScript Control Plane SDK Changelog

## [1.4.0] - 2026-10-30

### What's New
- Organization usage reporting through the new `usage` namespace. `usage.get({ org_id, start_date, end_date, group_by? })` returns event counts and computed-metric counts in one bucket per calendar month. You can split the results by `workspace_id` or by `project_id`. The range starts on `start_date` and ends before `end_date`, and it can cover at most 92 days.
- `usage.getCurrent({ org_id })` returns the organization's current counts of users, workspaces, and projects.
- New exported types: `GetUsageRequest`, `GetUsageResponse`, `GetUsageCurrentRequest`, and `GetUsageCurrentResponse`.
- A fine-grained control plane key needs two things to call the usage endpoints: it must be rooted at the organization, and it must hold the `org.analytics.query` permission. That permission can now be granted when you create a key.

## [1.3.0] - 2026-10-05

### What's New
- New exported error classes `MissingApiKeyError` and `MalformedApiKeyError`. Both extend `HoneyHiveError`.
- Client construction now throws `MissingApiKeyError` when no API key and no middleware are configured, and `MalformedApiKeyError` when `apiKey` or `HH_CONTROL_PLANE_API_KEY` is not a well-formed fine-grained control plane key. Before this release, both cases threw a plain `Error`. You can now catch these with `instanceof` checks. `MalformedApiKeyError.source` names the option or environment variable that held the bad value. The error never echoes the key.

## [1.2.0] - 2026-09-22

### What's New
- Scope creation accepts a caller-supplied identifier: an optional `slug` on `CreateWorkspaceRequest` and `CreateVirtualDataplaneRequest`. Omit it and the server derives one from `name` with a random suffix, as before. Supply it when the identifier has to match a value maintained outside HoneyHive, such as an identity provider group that grants access to the scope. A slug already in use gets a 409 that names it.

### Compatibility & Deprecations
- The client validates the API key at construction. A value in `apiKey` or `HH_CONTROL_PLANE_API_KEY` that is not a well-formed fine-grained control plane key (`hh_fgcp_…`) throws when you build the client. The error names the option or the environment variable the value came from, and it does not echo the key. Before this release the same value failed on the first request as an authentication error.
- Every control plane endpoint answers an authorization failure with 404 instead of 403. The status no longer reveals whether a resource you may not touch exists. The control plane does not emit 403 at all any more.
- An authentication failure on a fine-grained control plane key also answers 404 instead of 401. This covers a missing `Authorization` header and a key that is invalid, revoked, or expired.
- A 404 now means "not found", "not permitted", or "not authenticated", and the response does not say which. Code that refreshes a credential on 401 or branches on 403 no longer sees either status.
- A 404 body carries the fixed `message` `"Not found"` and the fixed `errorCode` `"not_found"`. `ApiError.message` and `parseError()` no longer name which check refused. The server logs carry that detail.
- The three status changes above are control plane changes, so they apply to every SDK version, not only 1.2.0.
- The `axios` runtime dependency moves from 1.19.0 to 1.20.0.

## [1.1.0] - 2026-08-14

### What's New
- Workspace management via the new `workspaces` namespace: `create()`, `get()`, `update()`, and `delete()`, with matching `CreateWorkspaceRequest`/`Response`, `GetWorkspaceRequest`/`Response`, `UpdateWorkspaceRequest`/`Response`, and `DeleteWorkspaceRequest`/`Response` types.
- Virtual data plane management via the new `virtualDataplanes` namespace: `create()`, `get()`, `update()`, and `delete()`, with matching `CreateVirtualDataplaneRequest`/`Response`, `GetVirtualDataplaneRequest`/`Response`, `UpdateVirtualDataplaneRequest`/`Response`, and `DeleteVirtualDataplaneRequest`/`Response` types.
- Deleting a workspace or virtual data plane archives everything inside it, so a resource with active children is rejected with a 409 unless the request sets `dangerously_delete_child_scopes: true`.

### Fixes & Improvements
- Creating a project with `project_creator` now marks that user's sessions for refresh, so they no longer have to sign out and back in to see the new project. The change is in the control plane, so it applies to any SDK version. The refresh takes effect on their next request to the control plane, so an idle browser tab may still need a page reload.

### Compatibility & Deprecations
- Security fixes

## [1.0.0] - 2026-08-03

### What's New
- First stable release of the HoneyHive TypeScript Control Plane SDK (`@honeyhive/control-plane-sdk`). Functionally identical to `1.0.0-rc.1` — no code changes, so upgrading from the release candidate requires no migration.

## [1.0.0-rc.1] - 2026-08-03

### What's New
- Initial release candidate of the HoneyHive TypeScript Control Plane SDK (`@honeyhive/control-plane-sdk`).
