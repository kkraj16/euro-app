/**
 * newModuleSkeleton.ts
 *
 * Skeleton descriptor for a new feature module. This file contains only the
 * module structure (menu sections, route paths, and dashboard info) and is
 * intended to be imported by the menu or router when you are ready to enable
 * the module.
 *
 * Keep this module in "pending" state until pages and route components are
 * implemented. To integrate later: import `NEW_MODULE` in
 * `src/Layouts/LayoutMenuData.tsx` and append its sections to `menuItems`.
 */

export type ModuleChild = { label: string; path: string };
export type ModuleSection = { title: string; children: ModuleChild[] };

export const MODULE_NAME = "ESRM Detail & Admin";
export const MODULE_KEY = "esrm_module";

// Dashboard variants (informational only for now)
export const DASHBOARDS = [
  { id: "tenant", title: "Tenant Dashboard", path: "/dashboard/tenant" },
  { id: "customer", title: "Customer Dashboard", path: "/dashboard/customer" },
];

// Skeleton menu sections (pending implementation)
export const NEW_MODULE: ModuleSection[] = [
  {
    title: "Detail Info Setup",
    children: [
      { label: "System Configuration", path: "/detail/system-config" },
      { label: "Basic Information", path: "/detail/basic-info" },
      { label: "Rental Configurations", path: "/detail/rental-config" },
    ],
  },
  {
    title: "Account Administration",
    children: [
      { label: "User Accounts", path: "/account/users" },
      { label: "Roles & Permissions", path: "/account/roles" },
      { label: "Security", path: "/account/security" },
    ],
  },
  {
    title: "User Management",
    children: [
      { label: "Field Staff", path: "/users/field-staff" },
      { label: "Supervisors", path: "/users/supervisors" },
      { label: "Compliance Officers", path: "/users/compliance" },
      { label: "Department Setup", path: "/users/departments" },
    ],
  },
  {
    title: "Lead Management",
    children: [
      { label: "Lead List", path: "/leads" },
      { label: "Lead Create", path: "/leads/new" },
      { label: "Lead Conversion", path: "/leads/convert" },
      { label: "Lead Reports", path: "/leads/reports" },
    ],
  },
  {
    title: "Client Management",
    children: [
      { label: "Client List", path: "/clients" },
      { label: "Contact Person", path: "/clients/contacts" },
      { label: "Meeting Schedule", path: "/clients/meetings" },
    ],
  },
];

// Flag to indicate this module is intentionally pending (do not render in menu)
export const MODULE_PENDING = true;

export default {
  key: MODULE_KEY,
  name: MODULE_NAME,
  dashboards: DASHBOARDS,
  sections: NEW_MODULE,
  pending: MODULE_PENDING,
};
