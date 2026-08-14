export interface paths {
    '/v1/projects/{project_id}/alerts': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List alerts
         * @description List the alerts in a project. The project is identified by the `project_id` path parameter
         *     alone; the `x-hh-project-id` header does not participate. Supports offset pagination, an
         *     optional status filter, and sorting (defaults to most recently created first).
         */
        get: operations['listAlerts'];
        put?: never;
        /**
         * Create an alert
         * @description Create an alert in a project. The project is identified by the `project_id` path parameter
         *     alone; the `x-hh-project-id` header does not participate. The alert's `filters` and
         *     `projections` (metrics) are mapped against the project's logged-event schema; if no schema
         *     data matches them — e.g. no events have been logged to the project yet — the request fails
         *     with a 400.
         */
        post: operations['createAlert'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}/alerts/{alert_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an alert
         * @description Retrieve a single alert by id, including its thresholds, triggers, and notification
         *     configuration. The alert's project is identified by the `project_id` path parameter alone;
         *     the `x-hh-project-id` header does not participate.
         */
        get: operations['getAlert'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/virtual_dataplanes/{virtual_dataplane_id}/workspaces': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a workspace
         * @description Create a workspace in a virtual data plane. The parent virtual data plane is identified by
         *     the `virtual_dataplane_id` path parameter alone; the `x-hh-dataplane-id` header does not
         *     participate. Your organization's virtual data plane ids are listed on the API keys page of
         *     your organization settings in the HoneyHive app. Most organizations have exactly one.
         *
         *     The new workspace contains no projects. Create one with
         *     `POST /v1/workspaces/{workspace_id}/projects` if you need it, because a workspace with no
         *     projects has nowhere to log events.
         *
         *     The optional `workspace_creator` field names the user (by email) who receives the
         *     workspace-creator membership on the new workspace. The named user must already be a member
         *     of the virtual data plane. When omitted, the workspace is created without any membership.
         *     The field is only accepted on API-key-initiated requests. User-initiated creation always
         *     makes the calling user the creator, so sending the field returns a 400.
         *
         *     The roles that membership carries come from your organization's role configuration. An
         *     organization that grants no role on workspace creation is a supported case: the request
         *     still succeeds and the named user receives no access. A 200 response is not by itself
         *     confirmation that the named user was granted anything.
         *
         *     A `workspace_creator` who is already signed in does not see the new workspace immediately.
         *     A session captures its scope tree and permission grants when it is created, so a membership
         *     granted afterwards is not reflected in it. Creating the workspace marks that user's sessions
         *     for refresh, and the refresh takes effect on their next request to the control plane, so an
         *     idle browser tab may need a page reload.
         */
        post: operations['createWorkspace'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/workspaces/{workspace_id}/projects': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a project
         * @description Create a project in a workspace. The parent workspace is identified by the `workspace_id`
         *     path parameter alone; the `x-hh-workspace-id` header does not participate. A workspace's id
         *     is listed on the API keys page of its workspace settings in the HoneyHive app.
         *
         *     The optional `project_creator` field names the user (by email) who receives the
         *     project-creator membership on the new project. The named user must already be a member of
         *     the workspace. When omitted, the project is created without any membership. The field is
         *     only accepted on API-key-initiated requests. User-initiated creation always makes the
         *     calling user the creator, so sending the field returns a 400.
         *
         *     The roles that membership carries come from your organization's role configuration. An
         *     organization that grants no role on project creation is a supported case: the request
         *     still succeeds and the named user receives no access. A 200 response is not by itself
         *     confirmation that the named user was granted anything.
         *
         *     A `project_creator` who is already signed in does not see the new project immediately. A
         *     session captures its scope tree and permission grants when it is created, so a membership
         *     granted afterwards is not reflected in it. Creating the project marks that user's sessions
         *     for refresh, and the refresh takes effect on their next request to the control plane, so
         *     an idle browser tab may need a page reload.
         */
        post: operations['createProject'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/projects/{project_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a project
         * @description Retrieve a single project by id. The project is identified by the `project_id` path
         *     parameter alone; the `x-hh-project-id` header does not participate.
         */
        get: operations['getProject'];
        /**
         * Update a project
         * @description Update a project's display name and/or description. The project is identified by the
         *     `project_id` path parameter alone; the `x-hh-project-id` header does not participate.
         *     Only fields included in the request body are modified.
         */
        put: operations['updateProject'];
        post?: never;
        /**
         * Delete a project
         * @description Delete a project. The project is soft-deleted (archived) and no longer appears in reads;
         *     the response returns the archived project. The project is identified by the `project_id`
         *     path parameter alone; the `x-hh-project-id` header does not participate.
         */
        delete: operations['deleteProject'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/workspaces/{workspace_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a workspace
         * @description Retrieve a single workspace by id. The workspace is identified by the `workspace_id` path
         *     parameter alone; the `x-hh-workspace-id` header does not participate.
         *
         *     The returned `name` is the workspace's display name. The globally unique slug the workspace
         *     was assigned at creation is an internal detail and is not part of this contract.
         */
        get: operations['getWorkspace'];
        /**
         * Update a workspace
         * @description Update a workspace's display name and/or description. The workspace is identified by the
         *     `workspace_id` path parameter alone; the `x-hh-workspace-id` header does not participate.
         *     Only fields included in the request body are modified.
         *
         *     The workspace's internal slug is not part of this contract and cannot be changed here.
         */
        put: operations['updateWorkspace'];
        post?: never;
        /**
         * Delete a workspace
         * @description Delete a workspace. The workspace is soft-deleted (archived) and no longer appears in reads;
         *     the response returns the archived workspace. The workspace is identified by the
         *     `workspace_id` path parameter alone; the `x-hh-workspace-id` header does not participate.
         *
         *     **Deleting a workspace also archives every project inside it**, so the events, datasets,
         *     and evaluations in those projects are no longer reachable. Because that reaches well
         *     beyond the resource named in the URL, a workspace that still has active projects is
         *     rejected with a 409 unless the request sets `dangerously_delete_child_scopes=true`.
         *     Projects that were already archived do not count, so a workspace emptied one project at a
         *     time deletes without the flag.
         *
         *     The response describes only the workspace. It does not enumerate the projects archived
         *     alongside it, so read them first if you need that list.
         */
        delete: operations['deleteWorkspace'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/orgs/{org_id}/virtual_dataplanes': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a virtual data plane
         * @description Create a virtual data plane in an organization. The parent organization is identified by the
         *     `org_id` path parameter alone; the `x-hh-org-id` header does not participate. Your
         *     organization's id is listed on the API keys page of your organization settings in the
         *     HoneyHive app.
         *
         *     A virtual data plane is a logical tenant boundary hosted on a physical cluster, and several
         *     of them commonly share one cluster. Workspaces are created inside it.
         *
         *     `cluster_id` is optional, and omitting it is the common case: the new virtual data plane is
         *     placed on the same cluster as the organization's existing ones. Two situations require it
         *     explicitly, and both return a 400 that says so rather than guessing: an organization whose
         *     existing virtual data planes span more than one cluster, and an organization that has none
         *     yet. Every response includes `cluster_id`, so reading an existing virtual data plane tells
         *     you which value to send.
         *
         *     A cluster admits an organization only if your control plane administrator configured it to,
         *     so a `cluster_id` you can read from a sibling virtual data plane is not necessarily one you
         *     may place a new virtual data plane on. A cluster that does not admit this organization
         *     returns a 403. When you named the cluster, the fix is a configuration change your
         *     administrator makes. When this endpoint inferred the cluster, send an explicit `cluster_id`
         *     to place the virtual data plane on another cluster.
         *
         *     Deployments differ in who places virtual data planes. Where HoneyHive assigns them to
         *     organizations automatically, this endpoint returns a 403 for every request and the
         *     placement is not yours to make. Deployments whose administrators own the scope tree are
         *     the ones this endpoint serves.
         *
         *     The optional `dataplane_creator` field names the user (by email) who receives the
         *     dataplane-creator membership on the new virtual data plane. The named user must already be a
         *     member of the organization. When omitted, it is created without any membership. The field is
         *     only accepted on API-key-initiated requests; user-initiated creation always makes the
         *     calling user the creator, so sending the field returns a 400.
         *
         *     The roles that membership carries come from your organization's role configuration. An
         *     organization that grants no role on dataplane creation is a supported case: the request
         *     still succeeds and the named user receives no access. A 200 response is not by itself
         *     confirmation that the named user was granted anything.
         *
         *     A `dataplane_creator` who is already signed in does not see the new virtual data plane
         *     immediately. A session captures its scope tree and permission grants when it is created, so
         *     a membership granted afterwards is not reflected in it; the refresh takes effect on their
         *     next request to the control plane.
         */
        post: operations['createVirtualDataplane'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/v1/virtual_dataplanes/{virtual_dataplane_id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a virtual data plane
         * @description Retrieve a single virtual data plane by id. It is identified by the `virtual_dataplane_id`
         *     path parameter alone; the `x-hh-dataplane-id` header does not participate.
         *
         *     The returned `name` is the display name. The globally unique slug assigned at creation is
         *     an internal detail and is not part of this contract. `cluster_id` is the physical cluster
         *     hosting this virtual data plane, and it is the value to send when creating another one
         *     beside it.
         *
         *     Reads work on every deployment, including those where HoneyHive assigns virtual data
         *     planes automatically and the write endpoints are unavailable.
         */
        get: operations['getVirtualDataplane'];
        /**
         * Update a virtual data plane
         * @description Update a virtual data plane's display name. It is identified by the `virtual_dataplane_id`
         *     path parameter alone; the `x-hh-dataplane-id` header does not participate.
         *
         *     `name` is the only field this endpoint changes. `cluster_id` is placement rather than
         *     description: the workspaces and projects inside a virtual data plane hold data on the
         *     cluster hosting it, so moving one is a migration and not an update. A request that omits
         *     `name`, or sends the current one, changes nothing.
         *
         *     This endpoint is unavailable where HoneyHive assigns virtual data planes automatically,
         *     and returns a 403 there.
         */
        put: operations['updateVirtualDataplane'];
        post?: never;
        /**
         * Delete a virtual data plane
         * @description Delete a virtual data plane. It is soft-deleted (archived) and no longer appears in reads;
         *     the response returns the archived virtual data plane. It is identified by the
         *     `virtual_dataplane_id` path parameter alone; the `x-hh-dataplane-id` header does not
         *     participate.
         *
         *     **Deleting a virtual data plane also archives every workspace inside it and every project
         *     inside those workspaces**, so the events, datasets, and evaluations in them are no longer
         *     reachable. Because that reaches two levels below the resource named in the URL, a virtual
         *     data plane with active workspaces is rejected with a 409 unless the request sets
         *     `dangerously_delete_child_scopes=true`. Workspaces that were already archived do not count.
         *
         *     The response describes only the virtual data plane. It does not enumerate what the cascade
         *     archived, so read that first if you need the list.
         *
         *     This endpoint is unavailable where HoneyHive assigns virtual data planes automatically,
         *     and returns a 403 there.
         */
        delete: operations['deleteVirtualDataplane'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Alert object */
        AlertItem: {
            id: string;
            name: string;
            description?: string | null;
            /** @enum {string} */
            status: 'ACTIVE' | 'TRIGGERED' | 'PAUSED' | 'RESOLVED';
            /** @enum {string} */
            frequency: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
            minimum_sample_size: number;
            /** @enum {string} */
            alert_type: 'DRIFT' | 'AGGREGATE' | 'PER_EVENT';
            aggregation: string;
            event_filters: components['schemas']['AlertEventFilter'][];
            event_metrics: components['schemas']['AlertEventMetric'][];
            thresholds: components['schemas']['AlertItemThresholds'];
            last_run_at?: string | null;
            last_result?: ({
                current_bucket_score?: number | boolean;
                previous_bucket_score?: number | boolean;
                last_triggered_baseline?: number | boolean;
                drift_percentage?: number;
                thresholds?: components['schemas']['AlertItemLastResultThresholds'];
                event_filters?: unknown[];
                event_metrics?: unknown[];
                aggregation?: string;
            } & {
                [key: string]: unknown;
            }) | null;
            trigger_error?: string | null;
            is_active: boolean;
            is_muted: boolean;
            created_at: string;
            updated_at?: string | null;
            last_trigger_id?: string | null;
            scope_type: string;
            scope_id: string;
            created_by?: string | null;
            last_trigger?: components['schemas']['AlertTrigger'];
            triggers?: components['schemas']['AlertTrigger'][];
            notifications?: components['schemas']['AlertNotification'][];
        };
        AlertEventFilter: {
            filter: components['schemas']['SingleFilter'];
            /** @enum {string} */
            type: 'float' | 'numeric' | 'boolean' | 'string' | 'null';
        };
        SingleFilter: {
            field: string;
            /** @enum {string} */
            operator: 'exists' | 'not exists' | 'is' | 'is not' | 'contains' | 'not contains' | 'greater than' | 'less than' | 'after' | 'before';
            value: string | number | boolean | null;
            /** @enum {string} */
            type: 'string' | 'number' | 'boolean' | 'datetime';
        };
        AlertEventMetric: {
            /** @description Projected field or metric for this entry */
            projection: string;
            /** @enum {string} */
            type: 'float' | 'numeric' | 'boolean' | 'string' | 'null';
        };
        AlertTrigger: {
            id: string;
            alert_id: string;
            result: components['schemas']['AlertTriggerResult'];
            muted: boolean;
            notification_sent: boolean;
            triggered_time: string;
            resolved_time: string | null;
            resolved_by: string | null;
            created_at: string;
            updated_at: string;
        };
        AlertNotification: {
            id: string;
            alert_id: string;
            /** @enum {string} */
            stage: 'CRITICAL' | 'RESOLUTION';
            /** @enum {string} */
            channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
            /** @enum {string} */
            scope: 'ALL_PROJECT_MEMBERS' | 'SPECIFIC_MEMBER';
            membership_id?: string | null;
            metadata?: {
                [key: string]: unknown;
            } | null;
            last_sent_at?: string | null;
            created_at: string;
            membership?: {
                user: components['schemas']['AlertNotificationMembershipUser'];
            } | null;
        };
        PostAlertRequest: {
            name: string;
            description?: string;
            /** @enum {string} */
            frequency: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
            /** @default 0 */
            minimum_sample_size?: number;
            /**
             * @default AGGREGATE
             * @enum {string}
             */
            alert_type?: 'DRIFT' | 'AGGREGATE' | 'PER_EVENT';
            /**
             * @default AVERAGE
             * @enum {string}
             */
            aggregation?: 'AVERAGE' | 'COUNT' | 'SUM' | 'MIN' | 'MAX' | 'P90' | 'P95' | 'P99' | 'MEDIAN';
            thresholds: components['schemas']['PostAlertRequestThresholds'];
            filters: components['schemas']['SingleFilter'][];
            projections: string[];
            notification_details: components['schemas']['PostAlertRequestNotificationDetails'];
            /** @enum {string} */
            status?: 'ACTIVE' | 'TRIGGERED' | 'PAUSED' | 'RESOLVED';
        };
        /** @description A single alert */
        GetAlertResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['AlertItem'];
        };
        /** @description A paginated list of alerts */
        GetAlertsResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['AlertItem'][];
            pagination: components['schemas']['Pagination'];
        };
        Pagination: {
            page: number;
            limit: number;
            total: number;
            total_unfiltered: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        /** @description The created alert */
        CreateAlertResponse: {
            /** @enum {boolean} */
            success: true;
            data: components['schemas']['AlertItem'];
        };
        /** @description Project object */
        ProjectItem: {
            id: string;
            /** @description Project display name */
            name: string;
            /** @description Project description */
            description: string;
            created_at: string;
            updated_at?: string | null;
        };
        /** @description Request body for creating a project */
        PostProjectRequest: {
            /** @description Project display name */
            name: string;
            /** @description Project description */
            description?: string;
            /**
             * Format: email
             * @description Email of the user to grant the project-creator membership to (API key actors only). A signed-in user does not see the new project until their session refreshes, which happens on their next request to the control plane.
             */
            project_creator?: string;
        };
        /** @description Request body for updating a project */
        PutProjectRequest: {
            /** @description Project display name */
            name?: string;
            /** @description Project description */
            description?: string;
        };
        /** @description The created project */
        CreateProjectResponse: {
            success: boolean;
            data: components['schemas']['ProjectItem'];
        };
        /** @description The updated project */
        UpdateProjectResponse: {
            success: boolean;
            data: components['schemas']['ProjectItem'];
        };
        /** @description A single project */
        GetProjectResponse: {
            success: boolean;
            data: components['schemas']['ProjectItem'];
        };
        /** @description The deleted (archived) project */
        DeleteProjectResponse: {
            success: boolean;
            data: components['schemas']['ProjectItem'];
        };
        /** @description Virtual dataplane object */
        VirtualDataplaneItem: {
            id: string;
            /** @description Virtual dataplane display name */
            name: string;
            /** @description Identifier of the physical cluster hosting this dataplane */
            cluster_id: string;
            created_at: string;
            updated_at: string;
        };
        /** @description Request body for creating a virtual dataplane */
        PostVirtualDataplaneRequest: {
            /** @description Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
            name: string;
            /** @description Physical cluster to host this virtual dataplane. Omit to place it alongside the existing virtual dataplanes in this org; required when the org has none yet, or when its virtual dataplanes span more than one cluster. */
            cluster_id?: string;
            /**
             * Format: email
             * @description Email of the user to grant the dataplane-creator membership to (API key actors only). A signed-in user does not see the new dataplane until their session refreshes, which happens on their next request to the control plane.
             */
            dataplane_creator?: string;
        };
        /** @description Request body for updating a virtual dataplane */
        PutVirtualDataplaneRequest: {
            /** @description Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
            name?: string;
        };
        /** @description The created virtual dataplane */
        CreateVirtualDataplaneResponse: {
            success: boolean;
            data: components['schemas']['VirtualDataplaneItem'];
        };
        /** @description A single virtual dataplane */
        GetVirtualDataplaneResponse: {
            success: boolean;
            data: components['schemas']['VirtualDataplaneItem'];
        };
        /** @description The updated virtual dataplane */
        UpdateVirtualDataplaneResponse: {
            success: boolean;
            data: components['schemas']['VirtualDataplaneItem'];
        };
        /** @description The deleted (archived) virtual dataplane. Descendants archived by the cascade are not listed. */
        DeleteVirtualDataplaneResponse: {
            success: boolean;
            data: components['schemas']['VirtualDataplaneItem'];
        };
        /** @description Workspace object */
        WorkspaceItem: {
            id: string;
            /** @description Workspace display name */
            name: string;
            /** @description Workspace description */
            description: string;
            created_at: string;
            updated_at?: string | null;
        };
        /** @description Request body for creating a workspace */
        PostWorkspaceRequest: {
            /** @description Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
            name: string;
            /** @description Workspace description */
            description?: string;
            /**
             * Format: email
             * @description Email of the user to grant the workspace-creator membership to (API key actors only). A signed-in user does not see the new workspace until their session refreshes, which happens on their next request to the control plane.
             */
            workspace_creator?: string;
        };
        /** @description Request body for updating a workspace */
        PutWorkspaceRequest: {
            /** @description Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
            name?: string;
            /** @description Workspace description */
            description?: string;
        };
        /** @description The created workspace */
        CreateWorkspaceResponse: {
            success: boolean;
            data: components['schemas']['WorkspaceItem'];
        };
        /** @description A single workspace */
        GetWorkspaceResponse: {
            success: boolean;
            data: components['schemas']['WorkspaceItem'];
        };
        /** @description The updated workspace */
        UpdateWorkspaceResponse: {
            success: boolean;
            data: components['schemas']['WorkspaceItem'];
        };
        /** @description The deleted (archived) workspace. Descendants archived by the cascade are not listed. */
        DeleteWorkspaceResponse: {
            success: boolean;
            data: components['schemas']['WorkspaceItem'];
        };
        AlertItemThresholdsCritical: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertItemThresholdsResolved: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertItemThresholds: {
            critical: components['schemas']['AlertItemThresholdsCritical'];
            resolved: components['schemas']['AlertItemThresholdsResolved'];
        };
        AlertItemLastResultThresholdsCritical: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertItemLastResultThresholdsResolved: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertItemLastResultThresholds: {
            critical: components['schemas']['AlertItemLastResultThresholdsCritical'];
            resolved: components['schemas']['AlertItemLastResultThresholdsResolved'];
        };
        AlertTriggerResultThresholdsCritical: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertTriggerResultThresholdsResolved: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        AlertTriggerResultThresholds: {
            critical: components['schemas']['AlertTriggerResultThresholdsCritical'];
            resolved: components['schemas']['AlertTriggerResultThresholdsResolved'];
        };
        AlertTriggerResult: {
            current_bucket_score?: number | boolean;
            previous_bucket_score?: number | boolean;
            last_triggered_baseline?: number | boolean;
            drift_percentage?: number;
            thresholds?: components['schemas']['AlertTriggerResultThresholds'];
            event_filters?: unknown[];
            event_metrics?: unknown[];
            aggregation?: string;
        } & {
            [key: string]: unknown;
        };
        AlertNotificationMembershipUser: {
            id: string;
        };
        PostAlertRequestThresholdsCritical: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        PostAlertRequestThresholdsResolved: {
            /** @enum {string} */
            operator: 'greater_than' | 'less_than' | 'equal_to';
            value: number;
        };
        PostAlertRequestThresholds: {
            critical: components['schemas']['PostAlertRequestThresholdsCritical'];
            resolved: components['schemas']['PostAlertRequestThresholdsResolved'];
        };
        PostAlertRequestNotificationDetailsCritical: {
            /** @enum {string} */
            channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
            /** @enum {string} */
            scope: 'ALL_PROJECT_MEMBERS' | 'SPECIFIC_MEMBER';
            user_ids?: string[];
            metadata: {
                [key: string]: unknown;
            };
        };
        PostAlertRequestNotificationDetailsResolved: {
            /** @enum {string} */
            channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
            /** @enum {string} */
            scope: 'ALL_PROJECT_MEMBERS' | 'SPECIFIC_MEMBER';
            user_ids?: string[];
            metadata: {
                [key: string]: unknown;
            };
        };
        PostAlertRequestNotificationDetails: {
            critical: components['schemas']['PostAlertRequestNotificationDetailsCritical'];
            resolved: components['schemas']['PostAlertRequestNotificationDetailsResolved'];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listAlerts: {
        parameters: {
            query?: {
                /** @description 1-indexed page number */
                page?: number;
                /** @description Number of alerts to return per page */
                limit?: number;
                /** @description Only return alerts in this status */
                status?: 'ACTIVE' | 'TRIGGERED' | 'PAUSED' | 'RESOLVED';
                /** @description Field to sort results by */
                sort_by?: 'created_at' | 'updated_at' | 'name' | 'status' | 'frequency' | 'last_triggered';
                /** @description Sort order */
                sort_order?: 'asc' | 'desc';
            };
            header?: never;
            path: {
                /** @description The unique identifier of the project whose alerts are listed */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Alerts retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAlertsResponse'];
                };
            };
            /** @description Invalid pagination or filter parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createAlert: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the alert is created in */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostAlertRequest'];
            };
        };
        responses: {
            /** @description Alert created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateAlertResponse'];
                };
            };
            /** @description Invalid request body, or no schema data matches the selected filters/metrics */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Project not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getAlert: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project the alert belongs to */
                project_id: string;
                /** @description The unique identifier of the alert to retrieve */
                alert_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Alert retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetAlertResponse'];
                };
            };
            /** @description Alert not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createWorkspace: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the virtual data plane the workspace is created in */
                virtual_dataplane_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostWorkspaceRequest'];
            };
        };
        responses: {
            /** @description Workspace created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateWorkspaceResponse'];
                };
            };
            /** @description Invalid request body, or an unknown/ineligible `workspace_creator` */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Virtual data plane not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the workspace the project is created in */
                workspace_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostProjectRequest'];
            };
        };
        responses: {
            /** @description Project created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateProjectResponse'];
                };
            };
            /** @description Invalid request body, or an unknown/ineligible `project_creator` */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project to retrieve */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Project retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetProjectResponse'];
                };
            };
            /** @description Project not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project to update */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutProjectRequest'];
            };
        };
        responses: {
            /** @description Project updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateProjectResponse'];
                };
            };
            /** @description Invalid request body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Project not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the project to delete */
                project_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Project deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteProjectResponse'];
                };
            };
            /** @description Project not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getWorkspace: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the workspace to retrieve */
                workspace_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Workspace retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetWorkspaceResponse'];
                };
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateWorkspace: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the workspace to update */
                workspace_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutWorkspaceRequest'];
            };
        };
        responses: {
            /** @description Workspace updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateWorkspaceResponse'];
                };
            };
            /** @description Invalid request body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteWorkspace: {
        parameters: {
            query?: {
                /**
                 * @description Archive the workspace even when it still has active projects, archiving those projects
                 *     too. Without it, such a request fails with a 409 and no changes are made.
                 */
                dangerously_delete_child_scopes?: boolean;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the workspace to delete */
                workspace_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Workspace deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteWorkspaceResponse'];
                };
            };
            /** @description `dangerously_delete_child_scopes` is not `true` or `false` */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The workspace still has active projects and `dangerously_delete_child_scopes` was not set */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createVirtualDataplane: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the organization the virtual data plane is created in */
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PostVirtualDataplaneRequest'];
            };
        };
        responses: {
            /** @description Virtual data plane created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['CreateVirtualDataplaneResponse'];
                };
            };
            /** @description Invalid request body, an unknown or ineligible `dataplane_creator`, `cluster_id` omitted when it could not be inferred, or the named cluster is disabled */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The caller may not create a virtual data plane here: the permission is missing at this organization, the API key's root scope does not contain it, this deployment assigns virtual data planes automatically, or the cluster (named or inferred) does not admit this organization */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Organization or cluster not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getVirtualDataplane: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the virtual data plane to retrieve */
                virtual_dataplane_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Virtual data plane retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['GetVirtualDataplaneResponse'];
                };
            };
            /** @description Virtual data plane not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateVirtualDataplane: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The unique identifier of the virtual data plane to update */
                virtual_dataplane_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['PutVirtualDataplaneRequest'];
            };
        };
        responses: {
            /** @description Virtual data plane updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['UpdateVirtualDataplaneResponse'];
                };
            };
            /** @description Invalid request body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The caller may not update this virtual data plane, or this deployment assigns virtual data planes automatically */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Virtual data plane not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteVirtualDataplane: {
        parameters: {
            query?: {
                /**
                 * @description Archive the virtual data plane even when it still has active workspaces, archiving
                 *     those workspaces and their projects too. Without it, such a request fails with a 409
                 *     and no changes are made.
                 */
                dangerously_delete_child_scopes?: boolean;
            };
            header?: never;
            path: {
                /** @description The unique identifier of the virtual data plane to delete */
                virtual_dataplane_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Virtual data plane deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': components['schemas']['DeleteVirtualDataplaneResponse'];
                };
            };
            /** @description `dangerously_delete_child_scopes` is not `true` or `false` */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The caller may not delete this virtual data plane, or this deployment assigns virtual data planes automatically */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Virtual data plane not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The virtual data plane still has active workspaces and `dangerously_delete_child_scopes` was not set */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
//# sourceMappingURL=types.d.ts.map