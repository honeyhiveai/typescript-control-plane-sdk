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
  '/v1/projects/{project_id}/members': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List a project's members
     * @description Return one page of a project's members, oldest membership first. Each member carries their
     *     roles in the project and whether they have signed in yet. The project is identified by the
     *     `project_id` path parameter alone. The `x-hh-project-id` header does not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    get: operations['listProjectMembers'];
    put?: never;
    /**
     * Invite someone to a project
     * @description Invite one email address to a project, and return the member. The address is stored
     *     lowercased. An address with no HoneyHive user yet gets one, and the invitee receives an
     *     email. An email sent for a request made with an API key names the inviter as a HoneyHive
     *     teammate.
     *
     *     The invitee also becomes a member, with no roles, of the project's workspace, virtual data
     *     plane and organization, wherever they are not one already.
     *
     *     The new member has no roles, and is `INVITED` until they first sign in. Sign-in keeps any
     *     roles set before then and adds the roles the organization's roles manifest gives invited
     *     members. To give them roles now, set their roles with the `user_id` this returns.
     *
     *     Inviting an address that is already a member returns that member unchanged, and sends no
     *     email, so sending the same invite again is safe. The project is identified by the
     *     `project_id` path parameter alone. The `x-hh-project-id` header does not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    post: operations['createProjectMember'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/projects/{project_id}/members/{user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Remove someone from a project
     * @description Remove a user from a project, which also withdraws a pending invite. The user's current
     *     sessions must reauthorize. Their HoneyHive user stays, along with their memberships of the
     *     project's workspace, virtual data plane and organization. The project and the user are
     *     identified by the path parameters alone. The `x-hh-project-id` header does not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    delete: operations['deleteProjectMember'];
    options?: never;
    head?: never;
    /**
     * Set a member's roles in a project
     * @description Replace a member's roles in a project with the roles given, and return the member. The
     *     member's current sessions must reauthorize, so the new roles apply immediately. The member
     *     may still be `INVITED`. The project and the member are identified by the path parameters
     *     alone. The `x-hh-project-id` header does not participate.
     *
     *     Each role must be one the organization's roles manifest defines for projects, which are the
     *     roles the HoneyHive app offers there. Any other role is refused with 400, including one a
     *     manifest change removed, so writing back roles read before such a change can fail. When the
     *     organization has no valid roles manifest in force, the roles cannot be checked and the
     *     request is refused with 409.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    patch: operations['updateProjectMember'];
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
  '/v1/workspaces/{workspace_id}/templates_manifest': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get a workspace's templates manifest
     * @description Return the latest version of a workspace's templates manifest: the YAML that defines the
     *     metrics and charts that new projects in the workspace start with. The workspace is
     *     identified by the `workspace_id` path parameter alone. The `x-hh-workspace-id` header does
     *     not participate.
     *
     *     A workspace starts with a copy of its organization's manifest. Its projects use the
     *     workspace's manifest, together with the organization's only when the workspace's manifest
     *     sets `config.merge_strategy` to `merge`.
     */
    get: operations['getWorkspaceTemplatesManifest'];
    /**
     * Replace a workspace's templates manifest
     * @description Save a new version of a workspace's templates manifest, which becomes the latest version.
     *     It decides the metrics and charts that projects created afterward in the workspace start
     *     with. Existing projects are not changed. The workspace is identified by the `workspace_id`
     *     path parameter alone. The `x-hh-workspace-id` header does not participate.
     *
     *     A workspace manifest cannot define `workspace_templates`.
     *
     *     When an API key makes the request and the workspace's latest version already has this
     *     content, nothing is saved and that version is returned, so applying the same manifest
     *     repeatedly is safe.
     */
    put: operations['updateWorkspaceTemplatesManifest'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/workspaces/{workspace_id}/members': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List a workspace's members
     * @description Return one page of a workspace's members, oldest membership first. Each member carries their
     *     roles in the workspace and whether they have signed in yet. The workspace is identified by
     *     the `workspace_id` path parameter alone. The `x-hh-workspace-id` header does not
     *     participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    get: operations['listWorkspaceMembers'];
    put?: never;
    /**
     * Invite someone to a workspace
     * @description Invite one email address to a workspace, and return the member. The address is stored
     *     lowercased. An address with no HoneyHive user yet gets one, and the invitee receives an
     *     email. An email sent for a request made with an API key names the inviter as a HoneyHive
     *     teammate.
     *
     *     The invitee also becomes a member, with no roles, of the workspace's virtual data plane and
     *     organization, wherever they are not one already.
     *
     *     The new member has no roles, and is `INVITED` until they first sign in. Sign-in keeps any
     *     roles set before then and adds the roles the organization's roles manifest gives invited
     *     members. To give them roles now, set their roles with the `user_id` this returns.
     *
     *     Inviting an address that is already a member returns that member unchanged, and sends no
     *     email, so sending the same invite again is safe. The workspace is identified by the
     *     `workspace_id` path parameter alone. The `x-hh-workspace-id` header does not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    post: operations['createWorkspaceMember'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/workspaces/{workspace_id}/members/{user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Remove someone from a workspace
     * @description Remove a user from a workspace and from every project in it, which also withdraws a pending
     *     invite. The user's current sessions must reauthorize. Their HoneyHive user stays, along with
     *     their memberships of the workspace's virtual data plane and organization. The workspace and
     *     the user are identified by the path parameters alone. The `x-hh-workspace-id` header does
     *     not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    delete: operations['deleteWorkspaceMember'];
    options?: never;
    head?: never;
    /**
     * Set a member's roles in a workspace
     * @description Replace a member's roles in a workspace with the roles given, and return the member. The
     *     member's current sessions must reauthorize, so the new roles apply immediately. The member
     *     may still be `INVITED`. The workspace and the member are identified by the path parameters
     *     alone. The `x-hh-workspace-id` header does not participate.
     *
     *     Each role must be one the organization's roles manifest defines for workspaces, which are
     *     the roles the HoneyHive app offers there. Any other role is refused with 400, including one
     *     a manifest change removed, so writing back roles read before such a change can fail. When
     *     the organization has no valid roles manifest in force, the roles cannot be checked and the
     *     request is refused with 409.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    patch: operations['updateWorkspaceMember'];
    trace?: never;
  };
  '/v1/orgs/{org_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get an organization
     * @description Retrieve an organization's display name and email domains. The organization is identified by
     *     the `org_id` path parameter alone; the `x-hh-org-id` header does not participate. Your
     *     organization's id is listed on the API keys page of your organization settings in the
     *     HoneyHive app.
     */
    get: operations['getOrg'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * Update an organization
     * @description Update an organization's display name. The organization is identified by the `org_id` path
     *     parameter alone; the `x-hh-org-id` header does not participate.
     *
     *     The organization's email domains cannot be changed through the API. Set them in the
     *     organization settings of the HoneyHive app.
     */
    patch: operations['updateOrg'];
    trace?: never;
  };
  '/v1/orgs/{org_id}/roles_manifest': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get an organization's roles manifest
     * @description Return the latest version of an organization's roles manifest: the YAML that defines its
     *     roles and the permissions each one grants, as the organization settings page in the
     *     HoneyHive app shows it. The organization is identified by the `org_id` path parameter
     *     alone. The `x-hh-org-id` header does not participate.
     *
     *     Available on self-hosted deployments only. Elsewhere this operation returns 404. An API key
     *     that carries `org.roles.get` or `org.roles.set` can carry no permission other than the
     *     roles and membership permissions, and is created on an organization.
     */
    get: operations['getRolesManifest'];
    /**
     * Replace an organization's roles manifest
     * @description Save a new version of an organization's roles manifest, which becomes the latest version.
     *     Every member's current session must reauthorize, so the new roles apply to everyone
     *     immediately. The organization is identified by the `org_id` path parameter alone. The
     *     `x-hh-org-id` header does not participate.
     *
     *     When an API key makes the request, two further rules apply:
     *
     *     - If the organization's current roles manifest already has this content, nothing is saved
     *       and that version is returned, so applying the same manifest repeatedly is safe.
     *     - A manifest that would leave no onboarded, active member holding `org.roles.get`,
     *       `org.roles.set`, `org.fine_grained_api_key_cp.list` and
     *       `org.fine_grained_api_key_cp.delete` is refused with 409, so someone in the organization
     *       can always revoke the key.
     *
     *     Available on self-hosted deployments only. Elsewhere this operation returns 404. An API key
     *     that carries `org.roles.get` or `org.roles.set` can carry no permission other than the
     *     roles and membership permissions, and is created on an organization.
     */
    put: operations['updateRolesManifest'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/orgs/{org_id}/templates_manifest': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get an organization's templates manifest
     * @description Return the latest version of an organization's templates manifest: the YAML that defines
     *     the metrics and charts that new projects start with, as the templates page of the
     *     organization settings in the HoneyHive app shows it. The organization is identified by the
     *     `org_id` path parameter alone. The `x-hh-org-id` header does not participate.
     *
     *     A workspace gets a copy of this manifest when it is created, and its projects use that
     *     copy. They use this manifest as well only when the workspace's manifest sets
     *     `config.merge_strategy` to `merge`.
     */
    get: operations['getOrgTemplatesManifest'];
    /**
     * Replace an organization's templates manifest
     * @description Save a new version of an organization's templates manifest, which becomes the latest
     *     version. Existing projects are not changed. The organization is identified by the `org_id`
     *     path parameter alone. The `x-hh-org-id` header does not participate.
     *
     *     A workspace gets a copy of this manifest when it is created, and its projects use that
     *     copy. They use this manifest as well only when the workspace's manifest sets
     *     `config.merge_strategy` to `merge`. A new version therefore reaches projects in
     *     workspaces created afterward, and in existing workspaces whose manifest merges. To change
     *     what new projects in an existing workspace start with, update that workspace's manifest.
     *
     *     When an API key makes the request and the organization's latest version already has this
     *     content, nothing is saved and that version is returned, so applying the same manifest
     *     repeatedly is safe.
     */
    put: operations['updateOrgTemplatesManifest'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/orgs/{org_id}/members': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List an organization's members
     * @description Return one page of an organization's members, oldest membership first. Each member carries
     *     their roles in the organization and whether they have signed in yet. The organization is
     *     identified by the `org_id` path parameter alone. The `x-hh-org-id` header does not
     *     participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    get: operations['listOrgMembers'];
    put?: never;
    /**
     * Invite someone to an organization
     * @description Invite one email address to an organization, and return the member. The address is stored
     *     lowercased. An address with no HoneyHive user yet gets one, and the invitee receives an
     *     email. An email sent for a request made with an API key names the inviter as a HoneyHive
     *     teammate.
     *
     *     The new member has no roles, and is `INVITED` until they first sign in. Sign-in keeps any
     *     roles set before then and adds the roles the organization's roles manifest gives invited
     *     members. To give them roles now, set their roles with the `user_id` this returns.
     *
     *     Inviting an address that is already a member returns that member unchanged, and sends no
     *     email, so sending the same invite again is safe. The organization is identified by the
     *     `org_id` path parameter alone. The `x-hh-org-id` header does not participate.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    post: operations['createOrgMember'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/orgs/{org_id}/members/{user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Remove someone from an organization
     * @description Remove a user from an organization and from every virtual data plane, workspace and project
     *     in it, which also withdraws a pending invite. The user's current sessions must reauthorize.
     *     Their HoneyHive user stays, along with their memberships of other organizations. The
     *     organization and the user are identified by the path parameters alone. The `x-hh-org-id`
     *     header does not participate.
     *
     *     When an API key makes the request, it cannot remove a member who has signed in and whose
     *     roles grant `org.roles.get`, `org.roles.set`, `org.fine_grained_api_key_cp.list` and
     *     `org.fine_grained_api_key_cp.delete`, so someone in the organization can always revoke the
     *     key. Such a request is refused with 409, and the member has to be removed in the HoneyHive
     *     app. A member who has not signed in yet can be removed with an API key whatever their roles.
     *     When the organization has no valid roles manifest in force, a member who has signed in
     *     cannot be checked, and an API key's request to remove them is refused with 409.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    delete: operations['deleteOrgMember'];
    options?: never;
    head?: never;
    /**
     * Set a member's roles in an organization
     * @description Replace a member's roles in an organization with the roles given, and return the member. The
     *     member's current sessions must reauthorize, so the new roles apply immediately. The member
     *     may still be `INVITED`. The organization and the member are identified by the path
     *     parameters alone. The `x-hh-org-id` header does not participate.
     *
     *     Each role must be one the organization's roles manifest defines for organizations, which are
     *     the roles the HoneyHive app offers there. Any other role is refused with 400, including one
     *     a manifest change removed, so writing back roles read before such a change can fail. When
     *     the organization has no valid roles manifest in force, the roles cannot be checked and the
     *     request is refused with 409.
     *
     *     When an API key makes the request, it cannot take the ability to revoke API keys from a
     *     member who has signed in. If the member's roles grant `org.roles.get`, `org.roles.set`,
     *     `org.fine_grained_api_key_cp.list` and `org.fine_grained_api_key_cp.delete`, and the new
     *     roles would not, the request is refused with 409 and the change has to be made in the
     *     HoneyHive app. An API key can still give any member those roles, and can change the roles of
     *     a member who has not signed in yet.
     *
     *     Available on self-hosted deployments that do not enable an SSO group scheme. Elsewhere this
     *     operation returns 404. An API key that carries a membership permission can carry no
     *     permission other than the roles and membership permissions, and is created on an
     *     organization.
     */
    patch: operations['updateOrgMember'];
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
     *     returns a 404. When this endpoint inferred the cluster, send an explicit `cluster_id` to
     *     place the virtual data plane on another cluster.
     *
     *     Deployments differ in who places virtual data planes. Where HoneyHive assigns them to
     *     organizations automatically, this endpoint returns a 404 for every request and the
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
  '/v1/orgs/{org_id}/usage': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get usage for a date range
     * @description Return an organization's usage for `[start_date, end_date)`, in one bucket per calendar
     *     month, clipped to the range and ending at the current month. The organization is identified
     *     by the `org_id` path parameter alone; the `x-hh-org-id` header does not participate.
     *
     *     An event counts in the month that contains its `start_time`, which the client sets when it
     *     logs the event, so usage for a past month can still grow. `metrics_computed_count` is the
     *     number of `metrics.*` keys on those events. Results are always split by `event_type`; pass
     *     `group_by` to also split them by workspace or by project. Every row is returned in one
     *     response; there is no pagination. Quarter- and year-to-date totals are for the caller to
     *     sum across ranges.
     */
    get: operations['getUsage'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/v1/orgs/{org_id}/usage/current': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get current usage counts
     * @description Return an organization's current counts, independent of any date range: members who
     *     completed onboarding, and non-archived workspaces and projects. The organization is
     *     identified by the `org_id` path parameter alone; the `x-hh-org-id` header does not
     *     participate.
     */
    get: operations['getUsageCurrent'];
    put?: never;
    post?: never;
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
     *     and returns a 404 there.
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
     *     and returns a 404 there.
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
    PostMemberRequest: {
      /**
       * Format: email
       * @description The address to invite. It is stored lowercased, because sign-in matches addresses that way
       */
      email: string;
    };
    PatchMemberRequest: {
      /** @description The member's new roles at this scope, replacing the old ones. Each must be a role the organization's roles manifest defines for this scope's type, which are the roles the HoneyHive app offers for a member here. Any other role is refused with 400, including one a manifest change removed, so writing back roles read before a manifest change can fail */
      role_names: string[];
    };
    GetMembersResponse: {
      /** @enum {boolean} */
      success: true;
      data: components['schemas']['Member'][];
      pagination: components['schemas']['Pagination'];
    };
    /** @description One member of a scope */
    Member: {
      /** @description The member's user id, the same at every scope */
      user_id: string;
      /** @description The member's email address */
      email: string;
      /** @description The member's display name from their identity provider, when it sent one */
      name: string | null;
      /** @description The member's roles at this scope */
      role_names: string[];
      /**
       * @description `INVITED` until the member first signs in, `ONBOARDED` after. An API key cannot remove an `ONBOARDED` member whose organization roles let them revoke API keys, or change those roles to ones that do not, so an admin role a key grants can be undone with a key only while the member is `INVITED`.
       * @enum {string}
       */
      state: 'INVITED' | 'ONBOARDED';
      /** @description When the member was added to this scope */
      created_at: string;
      /** @description When the member's membership of this scope last changed */
      updated_at: string | null;
    };
    PostMemberResponse: {
      /** @enum {boolean} */
      success: true;
      data: components['schemas']['Member'];
    };
    PatchMemberResponse: {
      /** @enum {boolean} */
      success: true;
      data: components['schemas']['Member'];
    };
    DeleteMemberResponse: {
      /** @enum {boolean} */
      success: true;
    };
    /** @description Organization object */
    OrgItem: {
      id: string;
      /** @description Organization display name */
      name: string;
      /** @description Email domains for automatic membership. A user who signs in through SSO or a social login with an email at one of these domains joins the organization. The API cannot change them. Set them in the organization settings of the HoneyHive app. */
      email_domains: string[];
      created_at: string;
      updated_at?: string | null;
    };
    /** @description Request body for updating an organization */
    PatchOrgRequest: {
      /** @description Organization display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand, and the name must not start with a space. */
      name?: string;
    };
    /** @description A single organization */
    GetOrgResponse: {
      success: boolean;
      data: components['schemas']['OrgItem'];
    };
    /** @description The updated organization */
    UpdateOrgResponse: {
      success: boolean;
      data: components['schemas']['OrgItem'];
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
    /** @description One version of a manifest */
    ManifestItem: {
      /** @description The manifest, as the YAML it was saved with */
      yaml_content: string;
      /** @description When this version was saved */
      created_at: string;
    };
    /** @description Request body for replacing an organization's roles manifest */
    PutRolesManifestRequest: {
      /** @description The roles manifest, as YAML. It must parse and pass roles manifest validation. */
      yaml_content: string;
    };
    /** @description The latest version of an organization's roles manifest */
    GetRolesManifestResponse: {
      success: boolean;
      data: components['schemas']['ManifestItem'];
    };
    /** @description The organization's roles manifest after the update */
    UpdateRolesManifestResponse: {
      success: boolean;
      data: components['schemas']['ManifestItem'];
    };
    /** @description Request body for replacing an organization's templates manifest */
    PutOrgTemplatesManifestRequest: {
      /** @description The templates manifest, as YAML. It must parse and pass templates manifest validation for an organization. */
      yaml_content: string;
    };
    /** @description Request body for replacing a workspace's templates manifest */
    PutWorkspaceTemplatesManifestRequest: {
      /** @description The templates manifest, as YAML. It must parse and pass templates manifest validation for a workspace, which forbids `workspace_templates`. */
      yaml_content: string;
    };
    /** @description The latest version of an organization's or a workspace's templates manifest */
    GetTemplatesManifestResponse: {
      success: boolean;
      data: components['schemas']['ManifestItem'];
    };
    /** @description The templates manifest after the update */
    UpdateTemplatesManifestResponse: {
      success: boolean;
      data: components['schemas']['ManifestItem'];
    };
    /** @description Org usage for a date range, in monthly buckets */
    GetUsageResponse: {
      /** @enum {boolean} */
      success: true;
      data: components['schemas']['Usage'];
    };
    Usage: {
      /** @description ISO-8601 timestamp the response was computed at */
      generated_at: string;
      /** @description Calendar date, YYYY-MM-DD (UTC) */
      start_date: string;
      /** @description Calendar date, YYYY-MM-DD (UTC) */
      end_date: string;
      /** @description One bucket per calendar month in the range, through the current month. Every row is returned; there is no pagination */
      buckets: components['schemas']['UsageBucket'][];
    };
    UsageBucket: {
      /** @description Inclusive bucket start */
      start_date: string;
      /** @description Exclusive bucket end */
      end_date: string;
      results: components['schemas']['UsageResult'][];
    };
    UsageResult: {
      workspace_id?: string;
      /** @description The workspace scope name */
      workspace_slug?: string;
      /** @description The workspace scope label, or the slug if the label is empty */
      workspace_label?: string;
      project_id?: string;
      /** @description The project scope name */
      project_slug?: string;
      /** @description The project scope label, or the slug if the label is empty */
      project_label?: string;
      event_type: string;
      event_count: number;
      /** @description Number of metrics.* keys on the events */
      metrics_computed_count: number;
    };
    /** @description Point-in-time org counts */
    GetUsageCurrentResponse: {
      /** @enum {boolean} */
      success: true;
      data: components['schemas']['UsageCurrent'];
    };
    UsageCurrent: {
      /** @description ISO-8601 timestamp the counts were read at */
      as_of: string;
      /** @description Members who completed onboarding */
      user_count: number;
      /** @description Non-archived workspaces */
      workspace_count: number;
      /** @description Non-archived projects */
      project_count: number;
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
      /** @description Virtual dataplane display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one of those letters or a digit, and must not start with a space. */
      name: string;
      /** @description Globally unique identifier for the virtual dataplane, letters, digits and underscores only. Omit it and the server derives one from the name with a random suffix appended. A slug already in use returns 409. */
      slug?: string;
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
      /** @description Virtual dataplane display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one of those letters or a digit, and must not start with a space. */
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
      /** @description Workspace display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one of those letters or a digit, and must not start with a space. */
      name: string;
      /** @description Globally unique identifier for the workspace, letters, digits and underscores only. Omit it and the server derives one from the name with a random suffix appended. Supply it when the identifier has to match a value maintained outside HoneyHive, such as an identity provider group that grants access to this workspace. A slug already in use returns 409. */
      slug?: string;
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
      /** @description Workspace display name. Allowed characters are the letters A-Z and a-z (no accented letters), digits, space, underscore, hyphen, apostrophe and ampersand. The name must contain at least one of those letters or a digit, and must not start with a space. */
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
      /** @description The `slug` is already taken by another scope */
      409: {
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
  listProjectMembers: {
    parameters: {
      query?: {
        /** @description 1-indexed page number */
        page?: number;
        /** @description Number of members to return per page */
        limit?: number;
      };
      header?: never;
      path: {
        /** @description The unique identifier of the project */
        project_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Members retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetMembersResponse'];
        };
      };
      /** @description Invalid pagination parameters, or a query parameter the operation does not take */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Project not found, the caller may not list its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  createProjectMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the project */
        project_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PostMemberRequest'];
      };
    };
    responses: {
      /** @description Member invited, or returned unchanged for an address that already was one */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PostMemberResponse'];
        };
      };
      /** @description Invalid request body */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Project not found, the caller may not invite people to it, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  deleteProjectMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the project */
        project_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description User removed */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['DeleteMemberResponse'];
        };
      };
      /** @description Project not found, the user is not a member of it, the caller may not remove its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateProjectMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the project */
        project_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PatchMemberRequest'];
      };
    };
    responses: {
      /** @description Roles set */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PatchMemberResponse'];
        };
      };
      /** @description Invalid request body, or a role the organization's roles manifest does not define for projects */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Project not found, the user is not a member of it or of every scope above it, the caller may not set its members' roles, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The organization has no valid roles manifest to check the roles against */
      409: {
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
  getWorkspaceTemplatesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Templates manifest retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetTemplatesManifestResponse'];
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
  updateWorkspaceTemplatesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PutWorkspaceTemplatesManifestRequest'];
      };
    };
    responses: {
      /** @description Templates manifest saved, or returned unchanged for an API key whose content matched */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UpdateTemplatesManifestResponse'];
        };
      };
      /** @description Invalid request body, or YAML that fails templates manifest validation for a workspace */
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
  listWorkspaceMembers: {
    parameters: {
      query?: {
        /** @description 1-indexed page number */
        page?: number;
        /** @description Number of members to return per page */
        limit?: number;
      };
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Members retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetMembersResponse'];
        };
      };
      /** @description Invalid pagination parameters, or a query parameter the operation does not take */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Workspace not found, the caller may not list its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  createWorkspaceMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PostMemberRequest'];
      };
    };
    responses: {
      /** @description Member invited, or returned unchanged for an address that already was one */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PostMemberResponse'];
        };
      };
      /** @description Invalid request body */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Workspace not found, the caller may not invite people to it, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  deleteWorkspaceMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description User removed */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['DeleteMemberResponse'];
        };
      };
      /** @description Workspace not found, the user has no membership in it or in anything in it, the caller may not remove its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateWorkspaceMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the workspace */
        workspace_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PatchMemberRequest'];
      };
    };
    responses: {
      /** @description Roles set */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PatchMemberResponse'];
        };
      };
      /** @description Invalid request body, or a role the organization's roles manifest does not define for workspaces */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Workspace not found, the user is not a member of it or of every scope above it, the caller may not set its members' roles, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The organization has no valid roles manifest to check the roles against */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getOrg: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization to retrieve */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Organization retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetOrgResponse'];
        };
      };
      /** @description Organization not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateOrg: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization to update */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PatchOrgRequest'];
      };
    };
    responses: {
      /** @description Organization updated successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UpdateOrgResponse'];
        };
      };
      /** @description Invalid request body */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getRolesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Roles manifest retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetRolesManifestResponse'];
        };
      };
      /** @description Organization not found, the caller may not read its roles, or the deployment is not self-hosted. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateRolesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PutRolesManifestRequest'];
      };
    };
    responses: {
      /** @description Roles manifest saved, or returned unchanged for an API key whose content matched */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UpdateRolesManifestResponse'];
        };
      };
      /** @description Invalid request body, or YAML that fails roles manifest validation */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found, the caller may not update its roles, or the deployment is not self-hosted. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The request came from an API key, and the manifest would leave no onboarded, active member able to manage roles and revoke API keys */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getOrgTemplatesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Templates manifest retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetTemplatesManifestResponse'];
        };
      };
      /** @description Organization not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateOrgTemplatesManifest: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PutOrgTemplatesManifestRequest'];
      };
    };
    responses: {
      /** @description Templates manifest saved, or returned unchanged for an API key whose content matched */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UpdateTemplatesManifestResponse'];
        };
      };
      /** @description Invalid request body, or YAML that fails templates manifest validation */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  listOrgMembers: {
    parameters: {
      query?: {
        /** @description 1-indexed page number */
        page?: number;
        /** @description Number of members to return per page */
        limit?: number;
      };
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Members retrieved successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetMembersResponse'];
        };
      };
      /** @description Invalid pagination parameters, or a query parameter the operation does not take */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found, the caller may not list its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  createOrgMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PostMemberRequest'];
      };
    };
    responses: {
      /** @description Member invited, or returned unchanged for an address that already was one */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PostMemberResponse'];
        };
      };
      /** @description Invalid request body */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found, the caller may not invite people to it, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  deleteOrgMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description User removed */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['DeleteMemberResponse'];
        };
      };
      /** @description Organization not found, the user has no membership in it or in anything in it, the caller may not remove its members, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The request came from an API key, and the member has signed in and can revoke API keys, or the organization has no valid roles manifest to check them against */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateOrgMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
        /** @description The member's user id, as the member list returns it. One person has the same user id in every organization, workspace and project */
        user_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['PatchMemberRequest'];
      };
    };
    responses: {
      /** @description Roles set */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PatchMemberResponse'];
        };
      };
      /** @description Invalid request body, or a role the organization's roles manifest does not define for organizations */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found, the user is not a member of it, the caller may not set its members' roles, or the deployment does not offer member management. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The organization has no valid roles manifest to check the roles against, or the request came from an API key and would take the ability to revoke API keys from a member who has signed in */
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
      /** @description Organization or cluster not found, or the caller may not create a virtual data plane here. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The `slug` is already taken by another scope */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getUsage: {
    parameters: {
      query: {
        /** @description Inclusive start, `YYYY-MM-DD` (UTC), no later than today */
        start_date: string;
        /** @description Exclusive end, `YYYY-MM-DD` (UTC), 1 to 92 days after `start_date` */
        end_date: string;
        /** @description Split results by workspace, or by project (each project row also carries its workspace) */
        group_by?: 'workspace_id' | 'project_id';
      };
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Usage computed successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetUsageResponse'];
        };
      };
      /** @description Missing or malformed dates, a range outside 1 to 92 days, a `start_date` after today, an unknown `group_by`, or an unknown query parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Organization not found, or the caller may not read its usage. The response does not say which. */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description The usage query exceeded its time budget (`errorCode` `query_timeout`) or its memory budget (`errorCode` `query_too_large`). Request a shorter range, or omit `group_by`. */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getUsageCurrent: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The unique identifier of the organization */
        org_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Counts read successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GetUsageCurrentResponse'];
        };
      };
      /** @description Organization not found, or the caller may not read its usage. The response does not say which. */
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
      /** @description Virtual data plane not found, or the caller may not update it, or this deployment assigns virtual data planes automatically. The response does not say which. */
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
      /** @description Virtual data plane not found, or the caller may not delete it, or this deployment assigns virtual data planes automatically. The response does not say which. */
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
