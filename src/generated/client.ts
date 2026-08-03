// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

import { type paths } from './types.js';
import {
  type ListAlertsRequest,
  type CreateAlertRequest,
  type GetAlertRequest,
  type CreateProjectRequest,
  type GetProjectRequest,
  type UpdateProjectRequest,
  type DeleteProjectRequest,
  type ListAlertsResponse,
  type CreateAlertResponse,
  type GetAlertResponse,
  type CreateProjectResponse,
  type GetProjectResponse,
  type UpdateProjectResponse,
  type DeleteProjectResponse,
} from './apiTypes.js';
import { type ClientConfig, type FetchOptions, createApiClient, unwrap } from '../util.js';

/** @inline */
class AlertsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
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
    return unwrap(
      this.#client.GET('/v1/projects/{project_id}/alerts', {
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
    return unwrap(
      this.#client.POST('/v1/projects/{project_id}/alerts', {
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
    return unwrap(
      this.#client.GET('/v1/projects/{project_id}/alerts/{alert_id}', {
        params: { path: { project_id, alert_id } },
        ...options,
      }),
    );
  }
}

/** @inline */
class ProjectsNamespace {
  #client: ReturnType<typeof createApiClient<paths>>;

  constructor(client: ReturnType<typeof createApiClient<paths>>) {
    this.#client = client;
  }

  /**
   * Create a project
   *
   * Create a project in a workspace. The parent workspace is identified by the `workspace_id`
   * path parameter alone; the `x-hh-workspace-id` header does not participate.
   *
   * The optional `project_creator` field names the user (by email) who receives the
   * project-creator membership on the new project. The named user must already be a member of
   * the workspace. When omitted, the project is created without any membership. The field is
   * only accepted on API-key-initiated requests — user-initiated creation always makes the
   * calling user the creator and rejects the field with a 400.
   */
  public create(
    request: CreateProjectRequest,
    options?: FetchOptions,
  ): Promise<CreateProjectResponse> {
    const { workspace_id, ...body } = request;
    return unwrap(
      this.#client.POST('/v1/workspaces/{workspace_id}/projects', {
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
    return unwrap(
      this.#client.GET('/v1/projects/{project_id}', {
        params: { path: { project_id } },
        ...options,
      }),
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
    return unwrap(
      this.#client.PUT('/v1/projects/{project_id}', {
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
    return unwrap(
      this.#client.DELETE('/v1/projects/{project_id}', {
        params: { path: { project_id } },
        ...options,
      }),
    );
  }
}

export class Client {
  #client: ReturnType<typeof createApiClient<paths>>;
  readonly alerts: AlertsNamespace;
  readonly projects: ProjectsNamespace;

  constructor(options: ClientConfig = {}) {
    this.#client = createApiClient<paths>(options);
    this.alerts = new AlertsNamespace(this.#client);
    this.projects = new ProjectsNamespace(this.#client);
  }
}
