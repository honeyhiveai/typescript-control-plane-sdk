import { type Client as OpenapiFetchClient } from 'openapi-fetch';
import { type paths } from './types.js';
import { type ListAlertsRequest, type CreateAlertRequest, type GetAlertRequest, type CreateWorkspaceRequest, type GetWorkspaceRequest, type UpdateWorkspaceRequest, type DeleteWorkspaceRequest, type CreateProjectRequest, type GetProjectRequest, type UpdateProjectRequest, type DeleteProjectRequest, type CreateVirtualDataplaneRequest, type GetVirtualDataplaneRequest, type UpdateVirtualDataplaneRequest, type DeleteVirtualDataplaneRequest, type ListAlertsResponse, type CreateAlertResponse, type GetAlertResponse, type CreateWorkspaceResponse, type GetWorkspaceResponse, type UpdateWorkspaceResponse, type DeleteWorkspaceResponse, type CreateProjectResponse, type GetProjectResponse, type UpdateProjectResponse, type DeleteProjectResponse, type CreateVirtualDataplaneResponse, type GetVirtualDataplaneResponse, type UpdateVirtualDataplaneResponse, type DeleteVirtualDataplaneResponse } from './apiTypes.js';
import { type ClientConfig, type FetchOptions } from '../util.js';
/** Every security scheme the API's OpenAPI spec defines. */
export type SecurityScheme = 'ControlPlaneApiKey';
/**
 * What `createApiClient` returns: for every security scheme the spec defines,
 * the openapi-fetch client that carries the credential for it. The hand-written
 * chassis builds this table, so a scheme added to or removed from the spec
 * fails to compile there until the table says which client serves it.
 */
export type ApiClients = Record<SecurityScheme, OpenapiFetchClient<paths>>;
/** @inline */
declare class AlertsNamespace {
    #private;
    constructor(clients: ApiClients);
    /**
     * List alerts
     *
     * List the alerts in a project. The project is identified by the `project_id` path parameter
     * alone; the `x-hh-project-id` header does not participate. Supports offset pagination, an
     * optional status filter, and sorting (defaults to most recently created first).
     */
    list(request: ListAlertsRequest, options?: FetchOptions): Promise<ListAlertsResponse>;
    /**
     * Create an alert
     *
     * Create an alert in a project. The project is identified by the `project_id` path parameter
     * alone; the `x-hh-project-id` header does not participate. The alert's `filters` and
     * `projections` (metrics) are mapped against the project's logged-event schema; if no schema
     * data matches them — e.g. no events have been logged to the project yet — the request fails
     * with a 400.
     */
    create(request: CreateAlertRequest, options?: FetchOptions): Promise<CreateAlertResponse>;
    /**
     * Get an alert
     *
     * Retrieve a single alert by id, including its thresholds, triggers, and notification
     * configuration. The alert's project is identified by the `project_id` path parameter alone;
     * the `x-hh-project-id` header does not participate.
     */
    get(request: GetAlertRequest, options?: FetchOptions): Promise<GetAlertResponse>;
}
/** @inline */
declare class WorkspacesNamespace {
    #private;
    constructor(clients: ApiClients);
    /**
     * Create a workspace
     *
     * Create a workspace in a virtual data plane. The parent virtual data plane is identified by
     * the `virtual_dataplane_id` path parameter alone; the `x-hh-dataplane-id` header does not
     * participate. Your organization's virtual data plane ids are listed on the API keys page of
     * your organization settings in the HoneyHive app. Most organizations have exactly one.
     *
     * The new workspace contains no projects. Create one with
     * `POST /v1/workspaces/{workspace_id}/projects` if you need it, because a workspace with no
     * projects has nowhere to log events.
     *
     * The optional `workspace_creator` field names the user (by email) who receives the
     * workspace-creator membership on the new workspace. The named user must already be a member
     * of the virtual data plane. When omitted, the workspace is created without any membership.
     * The field is only accepted on API-key-initiated requests. User-initiated creation always
     * makes the calling user the creator, so sending the field returns a 400.
     *
     * The roles that membership carries come from your organization's role configuration. An
     * organization that grants no role on workspace creation is a supported case: the request
     * still succeeds and the named user receives no access. A 200 response is not by itself
     * confirmation that the named user was granted anything.
     *
     * A `workspace_creator` who is already signed in does not see the new workspace immediately.
     * A session captures its scope tree and permission grants when it is created, so a membership
     * granted afterwards is not reflected in it. Creating the workspace marks that user's sessions
     * for refresh, and the refresh takes effect on their next request to the control plane, so an
     * idle browser tab may need a page reload.
     */
    create(request: CreateWorkspaceRequest, options?: FetchOptions): Promise<CreateWorkspaceResponse>;
    /**
     * Get a workspace
     *
     * Retrieve a single workspace by id. The workspace is identified by the `workspace_id` path
     * parameter alone; the `x-hh-workspace-id` header does not participate.
     *
     * The returned `name` is the workspace's display name. The globally unique slug the workspace
     * was assigned at creation is an internal detail and is not part of this contract.
     */
    get(request: GetWorkspaceRequest, options?: FetchOptions): Promise<GetWorkspaceResponse>;
    /**
     * Update a workspace
     *
     * Update a workspace's display name and/or description. The workspace is identified by the
     * `workspace_id` path parameter alone; the `x-hh-workspace-id` header does not participate.
     * Only fields included in the request body are modified.
     *
     * The workspace's internal slug is not part of this contract and cannot be changed here.
     */
    update(request: UpdateWorkspaceRequest, options?: FetchOptions): Promise<UpdateWorkspaceResponse>;
    /**
     * Delete a workspace
     *
     * Delete a workspace. The workspace is soft-deleted (archived) and no longer appears in reads;
     * the response returns the archived workspace. The workspace is identified by the
     * `workspace_id` path parameter alone; the `x-hh-workspace-id` header does not participate.
     *
     * **Deleting a workspace also archives every project inside it**, so the events, datasets,
     * and evaluations in those projects are no longer reachable. Because that reaches well
     * beyond the resource named in the URL, a workspace that still has active projects is
     * rejected with a 409 unless the request sets `dangerously_delete_child_scopes=true`.
     * Projects that were already archived do not count, so a workspace emptied one project at a
     * time deletes without the flag.
     *
     * The response describes only the workspace. It does not enumerate the projects archived
     * alongside it, so read them first if you need that list.
     */
    delete(request: DeleteWorkspaceRequest, options?: FetchOptions): Promise<DeleteWorkspaceResponse>;
}
/** @inline */
declare class ProjectsNamespace {
    #private;
    constructor(clients: ApiClients);
    /**
     * Create a project
     *
     * Create a project in a workspace. The parent workspace is identified by the `workspace_id`
     * path parameter alone; the `x-hh-workspace-id` header does not participate. A workspace's id
     * is listed on the API keys page of its workspace settings in the HoneyHive app.
     *
     * The optional `project_creator` field names the user (by email) who receives the
     * project-creator membership on the new project. The named user must already be a member of
     * the workspace. When omitted, the project is created without any membership. The field is
     * only accepted on API-key-initiated requests. User-initiated creation always makes the
     * calling user the creator, so sending the field returns a 400.
     *
     * The roles that membership carries come from your organization's role configuration. An
     * organization that grants no role on project creation is a supported case: the request
     * still succeeds and the named user receives no access. A 200 response is not by itself
     * confirmation that the named user was granted anything.
     *
     * A `project_creator` who is already signed in does not see the new project immediately. A
     * session captures its scope tree and permission grants when it is created, so a membership
     * granted afterwards is not reflected in it. Creating the project marks that user's sessions
     * for refresh, and the refresh takes effect on their next request to the control plane, so
     * an idle browser tab may need a page reload.
     */
    create(request: CreateProjectRequest, options?: FetchOptions): Promise<CreateProjectResponse>;
    /**
     * Get a project
     *
     * Retrieve a single project by id. The project is identified by the `project_id` path
     * parameter alone; the `x-hh-project-id` header does not participate.
     */
    get(request: GetProjectRequest, options?: FetchOptions): Promise<GetProjectResponse>;
    /**
     * Update a project
     *
     * Update a project's display name and/or description. The project is identified by the
     * `project_id` path parameter alone; the `x-hh-project-id` header does not participate.
     * Only fields included in the request body are modified.
     */
    update(request: UpdateProjectRequest, options?: FetchOptions): Promise<UpdateProjectResponse>;
    /**
     * Delete a project
     *
     * Delete a project. The project is soft-deleted (archived) and no longer appears in reads;
     * the response returns the archived project. The project is identified by the `project_id`
     * path parameter alone; the `x-hh-project-id` header does not participate.
     */
    delete(request: DeleteProjectRequest, options?: FetchOptions): Promise<DeleteProjectResponse>;
}
/** @inline */
declare class VirtualDataplanesNamespace {
    #private;
    constructor(clients: ApiClients);
    /**
     * Create a virtual data plane
     *
     * Create a virtual data plane in an organization. The parent organization is identified by the
     * `org_id` path parameter alone; the `x-hh-org-id` header does not participate. Your
     * organization's id is listed on the API keys page of your organization settings in the
     * HoneyHive app.
     *
     * A virtual data plane is a logical tenant boundary hosted on a physical cluster, and several
     * of them commonly share one cluster. Workspaces are created inside it.
     *
     * `cluster_id` is optional, and omitting it is the common case: the new virtual data plane is
     * placed on the same cluster as the organization's existing ones. Two situations require it
     * explicitly, and both return a 400 that says so rather than guessing: an organization whose
     * existing virtual data planes span more than one cluster, and an organization that has none
     * yet. Every response includes `cluster_id`, so reading an existing virtual data plane tells
     * you which value to send.
     *
     * A cluster admits an organization only if your control plane administrator configured it to,
     * so a `cluster_id` you can read from a sibling virtual data plane is not necessarily one you
     * may place a new virtual data plane on. A cluster that does not admit this organization
     * returns a 404. When this endpoint inferred the cluster, send an explicit `cluster_id` to
     * place the virtual data plane on another cluster.
     *
     * Deployments differ in who places virtual data planes. Where HoneyHive assigns them to
     * organizations automatically, this endpoint returns a 404 for every request and the
     * placement is not yours to make. Deployments whose administrators own the scope tree are
     * the ones this endpoint serves.
     *
     * The optional `dataplane_creator` field names the user (by email) who receives the
     * dataplane-creator membership on the new virtual data plane. The named user must already be a
     * member of the organization. When omitted, it is created without any membership. The field is
     * only accepted on API-key-initiated requests; user-initiated creation always makes the
     * calling user the creator, so sending the field returns a 400.
     *
     * The roles that membership carries come from your organization's role configuration. An
     * organization that grants no role on dataplane creation is a supported case: the request
     * still succeeds and the named user receives no access. A 200 response is not by itself
     * confirmation that the named user was granted anything.
     *
     * A `dataplane_creator` who is already signed in does not see the new virtual data plane
     * immediately. A session captures its scope tree and permission grants when it is created, so
     * a membership granted afterwards is not reflected in it; the refresh takes effect on their
     * next request to the control plane.
     */
    create(request: CreateVirtualDataplaneRequest, options?: FetchOptions): Promise<CreateVirtualDataplaneResponse>;
    /**
     * Get a virtual data plane
     *
     * Retrieve a single virtual data plane by id. It is identified by the `virtual_dataplane_id`
     * path parameter alone; the `x-hh-dataplane-id` header does not participate.
     *
     * The returned `name` is the display name. The globally unique slug assigned at creation is
     * an internal detail and is not part of this contract. `cluster_id` is the physical cluster
     * hosting this virtual data plane, and it is the value to send when creating another one
     * beside it.
     *
     * Reads work on every deployment, including those where HoneyHive assigns virtual data
     * planes automatically and the write endpoints are unavailable.
     */
    get(request: GetVirtualDataplaneRequest, options?: FetchOptions): Promise<GetVirtualDataplaneResponse>;
    /**
     * Update a virtual data plane
     *
     * Update a virtual data plane's display name. It is identified by the `virtual_dataplane_id`
     * path parameter alone; the `x-hh-dataplane-id` header does not participate.
     *
     * `name` is the only field this endpoint changes. `cluster_id` is placement rather than
     * description: the workspaces and projects inside a virtual data plane hold data on the
     * cluster hosting it, so moving one is a migration and not an update. A request that omits
     * `name`, or sends the current one, changes nothing.
     *
     * This endpoint is unavailable where HoneyHive assigns virtual data planes automatically,
     * and returns a 404 there.
     */
    update(request: UpdateVirtualDataplaneRequest, options?: FetchOptions): Promise<UpdateVirtualDataplaneResponse>;
    /**
     * Delete a virtual data plane
     *
     * Delete a virtual data plane. It is soft-deleted (archived) and no longer appears in reads;
     * the response returns the archived virtual data plane. It is identified by the
     * `virtual_dataplane_id` path parameter alone; the `x-hh-dataplane-id` header does not
     * participate.
     *
     * **Deleting a virtual data plane also archives every workspace inside it and every project
     * inside those workspaces**, so the events, datasets, and evaluations in them are no longer
     * reachable. Because that reaches two levels below the resource named in the URL, a virtual
     * data plane with active workspaces is rejected with a 409 unless the request sets
     * `dangerously_delete_child_scopes=true`. Workspaces that were already archived do not count.
     *
     * The response describes only the virtual data plane. It does not enumerate what the cascade
     * archived, so read that first if you need the list.
     *
     * This endpoint is unavailable where HoneyHive assigns virtual data planes automatically,
     * and returns a 404 there.
     */
    delete(request: DeleteVirtualDataplaneRequest, options?: FetchOptions): Promise<DeleteVirtualDataplaneResponse>;
}
export declare class Client {
    #private;
    readonly alerts: AlertsNamespace;
    readonly workspaces: WorkspacesNamespace;
    readonly projects: ProjectsNamespace;
    readonly virtualDataplanes: VirtualDataplanesNamespace;
    constructor(options?: ClientConfig);
}
export {};
//# sourceMappingURL=client.d.ts.map