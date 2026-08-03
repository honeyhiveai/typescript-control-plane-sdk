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
     *     path parameter alone; the `x-hh-workspace-id` header does not participate.
     *
     *     The optional `project_creator` field names the user (by email) who receives the
     *     project-creator membership on the new project. The named user must already be a member of
     *     the workspace. When omitted, the project is created without any membership. The field is
     *     only accepted on API-key-initiated requests — user-initiated creation always makes the
     *     calling user the creator and rejects the field with a 400.
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
      last_result?:
        | ({
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
          })
        | null;
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
      operator:
        | 'exists'
        | 'not exists'
        | 'is'
        | 'is not'
        | 'contains'
        | 'not contains'
        | 'greater than'
        | 'less than'
        | 'after'
        | 'before';
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
       * @description Email of the user to grant the project-creator membership to (API key actors only)
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
}
