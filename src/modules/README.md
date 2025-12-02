New Module Skeleton

This folder provides a lightweight skeleton descriptor for a new feature module.
The module is intentionally left in a "pending" state — no routes or pages are
created yet. Follow the steps below to integrate when ready.

Files:

- `newModuleSkeleton.ts` — module descriptor object exported as default and named
  exports (`NEW_MODULE`, `DASHBOARDS`, `MODULE_PENDING`).

How to integrate into the app (when implementing pages):

1. Create page components for each `path` in `NEW_MODULE` under `src/pages/...`.
   Example: `src/pages/Detail/SystemConfig.tsx`, `src/pages/Account/Users.tsx`, etc.
2. Add routes for those pages into your router (usually `src/Routes/index.tsx`)
   or route config file, mapping path to component.
3. To show the module menu, import `NEW_MODULE` in `src/Layouts/LayoutMenuData.tsx`
   and append its sections into `menuItems`. Example:

   import { NEW_MODULE } from "../modules/newModuleSkeleton";
   // later: menuItems.push(...NEW_MODULE.map(sectionToMenuItem))

4. Remove or set `MODULE_PENDING = false` when ready to expose the module.

Notes:

- The skeleton contains `DASHBOARDS` entries for Tenant and Customer -- these are
  informational and should be wired to actual dashboard pages if implemented.
- Keep menu integration behind a feature flag or permission check if needed.

If you want, I can:

- Add placeholder page components for each path (simple `Coming Soon` pages),
  and wire them into the router so you can preview the module.
- Append the module to the sidebar behind a `pending` check so it shows up
  disabled in the menu.
