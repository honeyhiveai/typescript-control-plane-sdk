// AUTO-GENERATED — do not edit manually. Run `pnpm turbo run generate` to regenerate.

// ---- Request types ----

export interface ListAlertsRequest {
  /** @description The unique identifier of the project whose alerts are listed */
  project_id: string;
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
}

export interface CreateAlertRequest {
  /** @description The unique identifier of the project the alert is created in */
  project_id: string;
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
  thresholds: PostAlertRequestThresholds;
  filters: SingleFilter[];
  projections: string[];
  notification_details: PostAlertRequestNotificationDetails;
  /** @enum {string} */
  status?: 'ACTIVE' | 'TRIGGERED' | 'PAUSED' | 'RESOLVED';
}

export interface GetAlertRequest {
  /** @description The unique identifier of the project the alert belongs to */
  project_id: string;
  /** @description The unique identifier of the alert to retrieve */
  alert_id: string;
}

export interface CreateWorkspaceRequest {
  /** @description The unique identifier of the virtual data plane the workspace is created in */
  virtual_dataplane_id: string;
  /** @description Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
  name: string;
  /** @description Workspace description */
  description?: string;
  /**
   * Format: email
   * @description Email of the user to grant the workspace-creator membership to (API key actors only). A signed-in user does not see the new workspace until their session refreshes, which happens on their next request to the control plane.
   */
  workspace_creator?: string;
}

export interface GetWorkspaceRequest {
  /** @description The unique identifier of the workspace to retrieve */
  workspace_id: string;
}

export interface UpdateWorkspaceRequest {
  /** @description The unique identifier of the workspace to update */
  workspace_id: string;
  /** @description Workspace display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
  name?: string;
  /** @description Workspace description */
  description?: string;
}

export interface DeleteWorkspaceRequest {
  /** @description The unique identifier of the workspace to delete */
  workspace_id: string;
  /**
   * @description Archive the workspace even when it still has active projects, archiving those projects
   *     too. Without it, such a request fails with a 409 and no changes are made.
   */
  dangerously_delete_child_scopes?: boolean;
}

export interface CreateProjectRequest {
  /** @description The unique identifier of the workspace the project is created in */
  workspace_id: string;
  /** @description Project display name */
  name: string;
  /** @description Project description */
  description?: string;
  /**
   * Format: email
   * @description Email of the user to grant the project-creator membership to (API key actors only). A signed-in user does not see the new project until their session refreshes, which happens on their next request to the control plane.
   */
  project_creator?: string;
}

export interface GetProjectRequest {
  /** @description The unique identifier of the project to retrieve */
  project_id: string;
}

export interface UpdateProjectRequest {
  /** @description The unique identifier of the project to update */
  project_id: string;
  /** @description Project display name */
  name?: string;
  /** @description Project description */
  description?: string;
}

export interface DeleteProjectRequest {
  /** @description The unique identifier of the project to delete */
  project_id: string;
}

export interface CreateVirtualDataplaneRequest {
  /** @description The unique identifier of the organization the virtual data plane is created in */
  org_id: string;
  /** @description Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
  name: string;
  /** @description Physical cluster to host this virtual dataplane. Omit to place it alongside the existing virtual dataplanes in this org; required when the org has none yet, or when its virtual dataplanes span more than one cluster. */
  cluster_id?: string;
  /**
   * Format: email
   * @description Email of the user to grant the dataplane-creator membership to (API key actors only). A signed-in user does not see the new dataplane until their session refreshes, which happens on their next request to the control plane.
   */
  dataplane_creator?: string;
}

export interface GetVirtualDataplaneRequest {
  /** @description The unique identifier of the virtual data plane to retrieve */
  virtual_dataplane_id: string;
}

export interface UpdateVirtualDataplaneRequest {
  /** @description The unique identifier of the virtual data plane to update */
  virtual_dataplane_id: string;
  /** @description Virtual dataplane display name. Allowed characters are letters, digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one letter or digit, and must not start with a space. */
  name?: string;
}

export interface DeleteVirtualDataplaneRequest {
  /** @description The unique identifier of the virtual data plane to delete */
  virtual_dataplane_id: string;
  /**
   * @description Archive the virtual data plane even when it still has active workspaces, archiving
   *     those workspaces and their projects too. Without it, such a request fails with a 409
   *     and no changes are made.
   */
  dangerously_delete_child_scopes?: boolean;
}

// ---- Response types ----

/**
 * @description A paginated list of alerts
 */
export type ListAlertsResponse = {
  /** @enum {boolean} */
  success: true;
  data: AlertItem[];
  pagination: Pagination;
};

/**
 * @description The created alert
 */
export type CreateAlertResponse = {
  /** @enum {boolean} */
  success: true;
  data: AlertItem;
};

/**
 * @description A single alert
 */
export type GetAlertResponse = {
  /** @enum {boolean} */
  success: true;
  data: AlertItem;
};

/**
 * @description The created workspace
 */
export type CreateWorkspaceResponse = {
  success: boolean;
  data: WorkspaceItem;
};

/**
 * @description A single workspace
 */
export type GetWorkspaceResponse = {
  success: boolean;
  data: WorkspaceItem;
};

/**
 * @description The updated workspace
 */
export type UpdateWorkspaceResponse = {
  success: boolean;
  data: WorkspaceItem;
};

/**
 * @description The deleted (archived) workspace. Descendants archived by the cascade are not listed.
 */
export type DeleteWorkspaceResponse = {
  success: boolean;
  data: WorkspaceItem;
};

/**
 * @description The created project
 */
export type CreateProjectResponse = {
  success: boolean;
  data: ProjectItem;
};

/**
 * @description A single project
 */
export type GetProjectResponse = {
  success: boolean;
  data: ProjectItem;
};

/**
 * @description The updated project
 */
export type UpdateProjectResponse = {
  success: boolean;
  data: ProjectItem;
};

/**
 * @description The deleted (archived) project
 */
export type DeleteProjectResponse = {
  success: boolean;
  data: ProjectItem;
};

/**
 * @description The created virtual dataplane
 */
export type CreateVirtualDataplaneResponse = {
  success: boolean;
  data: VirtualDataplaneItem;
};

/**
 * @description A single virtual dataplane
 */
export type GetVirtualDataplaneResponse = {
  success: boolean;
  data: VirtualDataplaneItem;
};

/**
 * @description The updated virtual dataplane
 */
export type UpdateVirtualDataplaneResponse = {
  success: boolean;
  data: VirtualDataplaneItem;
};

/**
 * @description The deleted (archived) virtual dataplane. Descendants archived by the cascade are not listed.
 */
export type DeleteVirtualDataplaneResponse = {
  success: boolean;
  data: VirtualDataplaneItem;
};

// ---- Internal types ----
//
// These types are not part of the public API surface (not re-exported
// from index.ts) and are tagged @inline so TypeDoc renders their
// bodies inline at use sites rather than as standalone pages.

/**
 * @description Alert object
 * @inline
 */
export type AlertItem = {
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
  event_filters: AlertEventFilter[];
  event_metrics: AlertEventMetric[];
  thresholds: AlertItemThresholds;
  last_run_at?: string | null;
  last_result?:
    | ({
        current_bucket_score?: number | boolean;
        previous_bucket_score?: number | boolean;
        last_triggered_baseline?: number | boolean;
        drift_percentage?: number;
        thresholds?: AlertItemLastResultThresholds;
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
  last_trigger?: AlertTrigger;
  triggers?: AlertTrigger[];
  notifications?: AlertNotification[];
};

/**
 * @inline
 */
export type AlertEventFilter = {
  filter: SingleFilter;
  /** @enum {string} */
  type: 'float' | 'numeric' | 'boolean' | 'string' | 'null';
};

/**
 * @inline
 */
export type SingleFilter = {
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

/**
 * @inline
 */
export type AlertEventMetric = {
  /** @description Projected field or metric for this entry */
  projection: string;
  /** @enum {string} */
  type: 'float' | 'numeric' | 'boolean' | 'string' | 'null';
};

/**
 * @inline
 */
export type AlertTrigger = {
  id: string;
  alert_id: string;
  result: AlertTriggerResult;
  muted: boolean;
  notification_sent: boolean;
  triggered_time: string;
  resolved_time: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * @inline
 */
export type AlertNotification = {
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
    user: AlertNotificationMembershipUser;
  } | null;
};

/**
 * @inline
 */
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_unfiltered: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

/**
 * @description Project object
 * @inline
 */
export type ProjectItem = {
  id: string;
  /** @description Project display name */
  name: string;
  /** @description Project description */
  description: string;
  created_at: string;
  updated_at?: string | null;
};

/**
 * @description Virtual dataplane object
 * @inline
 */
export type VirtualDataplaneItem = {
  id: string;
  /** @description Virtual dataplane display name */
  name: string;
  /** @description Identifier of the physical cluster hosting this dataplane */
  cluster_id: string;
  created_at: string;
  updated_at: string;
};

/**
 * @description Workspace object
 * @inline
 */
export type WorkspaceItem = {
  id: string;
  /** @description Workspace display name */
  name: string;
  /** @description Workspace description */
  description: string;
  created_at: string;
  updated_at?: string | null;
};

/**
 * @inline
 */
export type AlertItemThresholdsCritical = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertItemThresholdsResolved = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertItemThresholds = {
  critical: AlertItemThresholdsCritical;
  resolved: AlertItemThresholdsResolved;
};

/**
 * @inline
 */
export type AlertItemLastResultThresholdsCritical = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertItemLastResultThresholdsResolved = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertItemLastResultThresholds = {
  critical: AlertItemLastResultThresholdsCritical;
  resolved: AlertItemLastResultThresholdsResolved;
};

/**
 * @inline
 */
export type AlertTriggerResultThresholdsCritical = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertTriggerResultThresholdsResolved = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type AlertTriggerResultThresholds = {
  critical: AlertTriggerResultThresholdsCritical;
  resolved: AlertTriggerResultThresholdsResolved;
};

/**
 * @inline
 */
export type AlertTriggerResult = {
  current_bucket_score?: number | boolean;
  previous_bucket_score?: number | boolean;
  last_triggered_baseline?: number | boolean;
  drift_percentage?: number;
  thresholds?: AlertTriggerResultThresholds;
  event_filters?: unknown[];
  event_metrics?: unknown[];
  aggregation?: string;
} & {
  [key: string]: unknown;
};

/**
 * @inline
 */
export type AlertNotificationMembershipUser = {
  id: string;
};

/**
 * @inline
 */
export type PostAlertRequestThresholdsCritical = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type PostAlertRequestThresholdsResolved = {
  /** @enum {string} */
  operator: 'greater_than' | 'less_than' | 'equal_to';
  value: number;
};

/**
 * @inline
 */
export type PostAlertRequestThresholds = {
  critical: PostAlertRequestThresholdsCritical;
  resolved: PostAlertRequestThresholdsResolved;
};

/**
 * @inline
 */
export type PostAlertRequestNotificationDetailsCritical = {
  /** @enum {string} */
  channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
  /** @enum {string} */
  scope: 'ALL_PROJECT_MEMBERS' | 'SPECIFIC_MEMBER';
  user_ids?: string[];
  metadata: {
    [key: string]: unknown;
  };
};

/**
 * @inline
 */
export type PostAlertRequestNotificationDetailsResolved = {
  /** @enum {string} */
  channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
  /** @enum {string} */
  scope: 'ALL_PROJECT_MEMBERS' | 'SPECIFIC_MEMBER';
  user_ids?: string[];
  metadata: {
    [key: string]: unknown;
  };
};

/**
 * @inline
 */
export type PostAlertRequestNotificationDetails = {
  critical: PostAlertRequestNotificationDetailsCritical;
  resolved: PostAlertRequestNotificationDetailsResolved;
};
