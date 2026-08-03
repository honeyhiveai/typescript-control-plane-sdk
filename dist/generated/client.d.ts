import { type paths } from './types.js';
import { type ListAlertsRequest, type CreateAlertRequest, type GetAlertRequest, type CreateProjectRequest, type GetProjectRequest, type UpdateProjectRequest, type DeleteProjectRequest, type ListAlertsResponse, type CreateAlertResponse, type GetAlertResponse, type CreateProjectResponse, type GetProjectResponse, type UpdateProjectResponse, type DeleteProjectResponse } from './apiTypes.js';
import { type ClientConfig, type FetchOptions, createApiClient } from '../util.js';
/** @inline */
declare class AlertsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
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
declare class ProjectsNamespace {
    #private;
    constructor(client: ReturnType<typeof createApiClient<paths>>);
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
export declare class Client {
    #private;
    readonly alerts: AlertsNamespace;
    readonly projects: ProjectsNamespace;
    constructor(options?: ClientConfig);
}
export {};
//# sourceMappingURL=client.d.ts.map