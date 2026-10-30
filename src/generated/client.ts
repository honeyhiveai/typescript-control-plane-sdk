// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { type Client as OpenapiFetchClient } from 'openapi-fetch';

import { type paths } from './types.js';
import {
  type ListAlertsRequest,
  type CreateAlertRequest,
  type GetAlertRequest,
  type CreateWorkspaceRequest,
  type GetWorkspaceRequest,
  type UpdateWorkspaceRequest,
  type DeleteWorkspaceRequest,
  type CreateProjectRequest,
  type GetProjectRequest,
  type UpdateProjectRequest,
  type DeleteProjectRequest,
  type CreateVirtualDataplaneRequest,
  type GetVirtualDataplaneRequest,
  type UpdateVirtualDataplaneRequest,
  type DeleteVirtualDataplaneRequest,
  type GetUsageRequest,
  type GetUsageCurrentRequest,
  type ListAlertsResponse,
  type CreateAlertResponse,
  type GetAlertResponse,
  type CreateWorkspaceResponse,
  type GetWorkspaceResponse,
  type UpdateWorkspaceResponse,
  type DeleteWorkspaceResponse,
  type CreateProjectResponse,
  type GetProjectResponse,
  type UpdateProjectResponse,
  type DeleteProjectResponse,
  type CreateVirtualDataplaneResponse,
  type GetVirtualDataplaneResponse,
  type UpdateVirtualDataplaneResponse,
  type DeleteVirtualDataplaneResponse,
  type GetUsageResponse,
  type GetUsageCurrentResponse,
} from './apiTypes.js';
import { type ClientConfig, type FetchOptions, createApiClient, unwrap } from '../util.js';

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
class AlertsNamespace {
  #clients: ApiClients;

  constructor(clients: ApiClients) {
    this.#clients = clients;
  }

  /**
   * List alerts
   *
   * List the alerts in a project. The project is identified by the `project_id` path parameter
   * alone; the `x-hh-project-id` header does not participate. Supports offset pagination, an
   * optional status filter, and sorting (defaults to most recently created first).
   */
  public list(request: ListAlertsRequest, options?: FetchOptions): Promise<ListAlertsResponse> {
    const { project_id, page, limit, status, sort_by, sort_order } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/projects/{project_id}/alerts', {
        params: { path: { project_id }, query: { page, limit, status, sort_by, sort_order } },
        ...options,
      }),
    );
  }

  /**
   * Create an alert
   *
   * Create an alert in a project. The project is identified by the `project_id` path parameter
   * alone; the `x-hh-project-id` header does not participate. The alert's `filters` and
   * `projections` (metrics) are mapped against the project's logged-event schema; if no schema
   * data matches them — e.g. no events have been logged to the project yet — the request fails
   * with a 400.
   */
  public create(request: CreateAlertRequest, options?: FetchOptions): Promise<CreateAlertResponse> {
    const { project_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.POST('/v1/projects/{project_id}/alerts', {
        params: { path: { project_id } },
        body,
        ...options,
      }),
    );
  }

  /**
   * Get an alert
   *
   * Retrieve a single alert by id, including its thresholds, triggers, and notification
   * configuration. The alert's project is identified by the `project_id` path parameter alone;
   * the `x-hh-project-id` header does not participate.
   */
  public get(request: GetAlertRequest, options?: FetchOptions): Promise<GetAlertResponse> {
    const { project_id, alert_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/projects/{project_id}/alerts/{alert_id}', {
        params: { path: { project_id, alert_id } },
        ...options,
      }),
    );
  }
}

/** @inline */
class WorkspacesNamespace {
  #clients: ApiClients;

  constructor(clients: ApiClients) {
    this.#clients = clients;
  }

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
  public create(
    request: CreateWorkspaceRequest,
    options?: FetchOptions,
  ): Promise<CreateWorkspaceResponse> {
    const { virtual_dataplane_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.POST('/v1/virtual_dataplanes/{virtual_dataplane_id}/workspaces', {
        params: { path: { virtual_dataplane_id } },
        body,
        ...options,
      }),
    );
  }

  /**
   * Get a workspace
   *
   * Retrieve a single workspace by id. The workspace is identified by the `workspace_id` path
   * parameter alone; the `x-hh-workspace-id` header does not participate.
   *
   * The returned `name` is the workspace's display name. The globally unique slug the workspace
   * was assigned at creation is an internal detail and is not part of this contract.
   */
  public get(request: GetWorkspaceRequest, options?: FetchOptions): Promise<GetWorkspaceResponse> {
    const { workspace_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/workspaces/{workspace_id}', {
        params: { path: { workspace_id } },
        ...options,
      }),
    );
  }

  /**
   * Update a workspace
   *
   * Update a workspace's display name and/or description. The workspace is identified by the
   * `workspace_id` path parameter alone; the `x-hh-workspace-id` header does not participate.
   * Only fields included in the request body are modified.
   *
   * The workspace's internal slug is not part of this contract and cannot be changed here.
   */
  public update(
    request: UpdateWorkspaceRequest,
    options?: FetchOptions,
  ): Promise<UpdateWorkspaceResponse> {
    const { workspace_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.PUT('/v1/workspaces/{workspace_id}', {
        params: { path: { workspace_id } },
        body,
        ...options,
      }),
    );
  }

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
  public delete(
    request: DeleteWorkspaceRequest,
    options?: FetchOptions,
  ): Promise<DeleteWorkspaceResponse> {
    const { workspace_id, dangerously_delete_child_scopes } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.DELETE('/v1/workspaces/{workspace_id}', {
        params: { path: { workspace_id }, query: { dangerously_delete_child_scopes } },
        ...options,
      }),
    );
  }
}

/** @inline */
class ProjectsNamespace {
  #clients: ApiClients;

  constructor(clients: ApiClients) {
    this.#clients = clients;
  }

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
  public create(
    request: CreateProjectRequest,
    options?: FetchOptions,
  ): Promise<CreateProjectResponse> {
    const { workspace_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.POST('/v1/workspaces/{workspace_id}/projects', {
        params: { path: { workspace_id } },
        body,
        ...options,
      }),
    );
  }

  /**
   * Get a project
   *
   * Retrieve a single project by id. The project is identified by the `project_id` path
   * parameter alone; the `x-hh-project-id` header does not participate.
   */
  public get(request: GetProjectRequest, options?: FetchOptions): Promise<GetProjectResponse> {
    const { project_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/projects/{project_id}', { params: { path: { project_id } }, ...options }),
    );
  }

  /**
   * Update a project
   *
   * Update a project's display name and/or description. The project is identified by the
   * `project_id` path parameter alone; the `x-hh-project-id` header does not participate.
   * Only fields included in the request body are modified.
   */
  public update(
    request: UpdateProjectRequest,
    options?: FetchOptions,
  ): Promise<UpdateProjectResponse> {
    const { project_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.PUT('/v1/projects/{project_id}', {
        params: { path: { project_id } },
        body,
        ...options,
      }),
    );
  }

  /**
   * Delete a project
   *
   * Delete a project. The project is soft-deleted (archived) and no longer appears in reads;
   * the response returns the archived project. The project is identified by the `project_id`
   * path parameter alone; the `x-hh-project-id` header does not participate.
   */
  public delete(
    request: DeleteProjectRequest,
    options?: FetchOptions,
  ): Promise<DeleteProjectResponse> {
    const { project_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.DELETE('/v1/projects/{project_id}', {
        params: { path: { project_id } },
        ...options,
      }),
    );
  }
}

/** @inline */
class VirtualDataplanesNamespace {
  #clients: ApiClients;

  constructor(clients: ApiClients) {
    this.#clients = clients;
  }

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
  public create(
    request: CreateVirtualDataplaneRequest,
    options?: FetchOptions,
  ): Promise<CreateVirtualDataplaneResponse> {
    const { org_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.POST('/v1/orgs/{org_id}/virtual_dataplanes', {
        params: { path: { org_id } },
        body,
        ...options,
      }),
    );
  }

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
  public get(
    request: GetVirtualDataplaneRequest,
    options?: FetchOptions,
  ): Promise<GetVirtualDataplaneResponse> {
    const { virtual_dataplane_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/virtual_dataplanes/{virtual_dataplane_id}', {
        params: { path: { virtual_dataplane_id } },
        ...options,
      }),
    );
  }

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
  public update(
    request: UpdateVirtualDataplaneRequest,
    options?: FetchOptions,
  ): Promise<UpdateVirtualDataplaneResponse> {
    const { virtual_dataplane_id, ...body } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.PUT('/v1/virtual_dataplanes/{virtual_dataplane_id}', {
        params: { path: { virtual_dataplane_id } },
        body,
        ...options,
      }),
    );
  }

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
  public delete(
    request: DeleteVirtualDataplaneRequest,
    options?: FetchOptions,
  ): Promise<DeleteVirtualDataplaneResponse> {
    const { virtual_dataplane_id, dangerously_delete_child_scopes } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.DELETE('/v1/virtual_dataplanes/{virtual_dataplane_id}', {
        params: { path: { virtual_dataplane_id }, query: { dangerously_delete_child_scopes } },
        ...options,
      }),
    );
  }
}

/** @inline */
class UsageNamespace {
  #clients: ApiClients;

  constructor(clients: ApiClients) {
    this.#clients = clients;
  }

  /**
   * Get usage for a date range
   *
   * Return an organization's usage for `[start_date, end_date)`, in one bucket per calendar
   * month, clipped to the range and ending at the current month. The organization is identified
   * by the `org_id` path parameter alone; the `x-hh-org-id` header does not participate.
   *
   * An event counts in the month that contains its `start_time`, which the client sets when it
   * logs the event, so usage for a past month can still grow. `metrics_computed_count` is the
   * number of `metrics.*` keys on those events. Results are always split by `event_type`; pass
   * `group_by` to also split them by workspace or by project. Every row is returned in one
   * response; there is no pagination. Quarter- and year-to-date totals are for the caller to
   * sum across ranges.
   */
  public get(request: GetUsageRequest, options?: FetchOptions): Promise<GetUsageResponse> {
    const { org_id, start_date, end_date, group_by } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/orgs/{org_id}/usage', {
        params: { path: { org_id }, query: { start_date, end_date, group_by } },
        ...options,
      }),
    );
  }

  /**
   * Get current usage counts
   *
   * Return an organization's current counts, independent of any date range: members who
   * completed onboarding, and non-archived workspaces and projects. The organization is
   * identified by the `org_id` path parameter alone; the `x-hh-org-id` header does not
   * participate.
   */
  public getCurrent(
    request: GetUsageCurrentRequest,
    options?: FetchOptions,
  ): Promise<GetUsageCurrentResponse> {
    const { org_id } = request;
    const httpClient = this.#clients.ControlPlaneApiKey;
    return unwrap(
      httpClient.GET('/v1/orgs/{org_id}/usage/current', {
        params: { path: { org_id } },
        ...options,
      }),
    );
  }
}

export class Client {
  #clients: ApiClients;
  readonly alerts: AlertsNamespace;
  readonly workspaces: WorkspacesNamespace;
  readonly projects: ProjectsNamespace;
  readonly virtualDataplanes: VirtualDataplanesNamespace;
  readonly usage: UsageNamespace;

  constructor(options: ClientConfig = {}) {
    this.#clients = createApiClient(options);
    this.alerts = new AlertsNamespace(this.#clients);
    this.workspaces = new WorkspacesNamespace(this.#clients);
    this.projects = new ProjectsNamespace(this.#clients);
    this.virtualDataplanes = new VirtualDataplanesNamespace(this.#clients);
    this.usage = new UsageNamespace(this.#clients);
  }
}
