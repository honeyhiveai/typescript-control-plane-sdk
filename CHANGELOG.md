# TypeScript Control Plane SDK Changelog

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
