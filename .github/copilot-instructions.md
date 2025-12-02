# ESRM Application — Copilot Instructions

## Overview

ESRM is a React 19 + TypeScript admin dashboard for enterprise scaffolding rental management. It uses Redux Toolkit for state management, fake backend helpers for mock API calls, and a modular architecture with vertical/horizontal layout support.

**Tech Stack**: React 19, TypeScript, Redux Toolkit, React Router v6, Reactstrap, i18next, Formik/Yup validation, FullCalendar, React Table

---

## Architecture Essentials

### Data Flow & State Management

- **Redux Toolkit** centralized state in `src/slices/` with `createAsyncThunk` for async operations
- Each domain (departments, staff, meetings, etc.) has `thunk.ts` (async actions) + `reducer.ts` (state updates)
- Thunks dispatch to fake backend helpers (`src/helpers/fakebackend_helper.ts`) which return mock data
- **Pattern**: Component → `useDispatch()` → thunk → API/fake helper → reducer → state → component re-render
- Root reducer combines all domain slices in `src/slices/index.ts`

### Routing Architecture

- Public routes (login, register) wrapped in `NonAuthLayout`; protected routes in `AuthProtected` + `VerticalLayout`
- Routes defined in `src/Routes/allRoutes.tsx`; render logic in `src/Routes/index.tsx`
- **AuthProtected guard** (`src/Routes/AuthProtected.tsx`): validates `userProfile` + `token` from localStorage (key: `"authUser"`)
- Token set in axios headers via `setAuthorization()` after login

### Layout & Theme

- **VerticalLayout** (`src/Layouts/index.tsx`) manages global layout state: theme, sidebar visibility, mode (light/dark)
- Layout actions dispatched on mount to wire up sidebar/header/footer; scroll listener adds topbar shadow
- Menu structure in `src/Layouts/LayoutMenuData.tsx`; modules (pending or active) appended here

---

## Key Patterns & Conventions

### Redux Thunks

```typescript
// src/slices/departments/thunk.ts pattern:
export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async () => {
    const response = getDepartmentsApi(); // fake backend helper
    return response; // auto-handled by builder.fulfilled/rejected
  }
);
// Toast notifications on success/error common pattern
```

**Convention**: Action type string format: `"domain/actionName"`. Always call fake backend helpers, not direct API (unless refactoring to real backend).

### Component State & Redux

- Use `useSelector(selectDomainState)` with `createSelector` for memoization (see `src/Layouts/index.tsx` for example)
- Use `useDispatch()` to trigger thunks; status/data from Redux
- Local state for UI concerns (expanded rows, filters, modal visibility)

### Fake Backend Pattern

- `src/helpers/fakebackend_helper.ts` exports domain CRUD helpers that:
  - Import mock data from `src/common/data/` (e.g., `departmentsData`, `meetingsData`)
  - Return Promises with 300ms delay (simulating network latency)
  - Modify arrays in-place; push to source of truth
- **URLs** mapped in `src/helpers/url_helper.ts` (unused for fake backend, but structure in place for real API migration)

### Forms & Validation

- Forms use **Formik** + **Yup** schema validation
- Example: ClientsList page shows form patterns with controlled inputs
- Redux holds persisted domain data; forms capture user input locally

### i18n

- Translations in `src/locales/en.json`; loaded via `src/i18n.ts`
- Use `useTranslation()` hook in components (setup in `index.tsx`)

---

## Common Workflows

### Adding a New Feature Module

1. Create domain folder in `src/slices/domain/` with `thunk.ts`, `reducer.ts`
2. Add mock data to `src/common/data/domain.ts`
3. Create CRUD helpers in `src/helpers/fakebackend_helper.ts`
4. Export thunks in `src/slices/thunks.ts` and add reducer to `src/slices/index.ts`
5. Wire routes in `src/Routes/allRoutes.tsx`, add menu in `src/Layouts/LayoutMenuData.tsx`
6. Create page components in `src/pages/Domain/` (List, Create, Edit, View patterns available)

### Debugging Redux State

- Redux DevTools enabled in `configureStore({ devTools: true })`
- Inspect state shape: `state.Layout`, `state.Departments`, `state.Meetings`, etc.
- Check localStorage (`authUser` for user/token, used by `useProfile()` hook)

### Adding a Page

- Pages placed in `src/pages/PageName/`; use `BreadCrumb`, `Card`, `TableContainer` from Common components
- Dispatch thunks on mount via `useEffect`; consume Redux state with `useSelector`
- Use React Router hooks: `useNavigate()`, `useParams()`

### Authentication Flow

1. User submits login form → `postFakeLogin()` thunk
2. Response stored in localStorage under `"authUser"` (key expected by `useProfile()` hook)
3. Token extracted and set in axios headers
4. On app reload, `AuthProtected` validates token/profile; if invalid, redirects to `/login`

---

## File Structure Quick Reference

- `src/slices/` — Redux domain state (thunk.ts + reducer.ts per feature)
- `src/pages/` — Page components organized by feature (Clients, Staff, Departments, etc.)
- `src/Components/Common/` — Reusable UI components (BreadCrumb, TableContainer, DeleteModal, etc.)
- `src/Components/Hooks/` — Custom React hooks (UserHooks.tsx exports `useProfile()`)
- `src/helpers/` — API client, fake backend, authentication helpers
- `src/Layouts/` — Layout wrapper, sidebar, header, footer components
- `src/common/data/` — Mock data objects
- `src/assets/scss/` — SCSS stylesheets and theme files

---

## Important Notes

### Fake Backend Transition

- Currently **mock data only** — when migrating to real API:
  1. Replace `fakebackend_helper.ts` calls with `api_helper.ts` (APIClient exists but unused)
  2. Update URLs in `url_helper.ts` to point to real backend
  3. Thunk signature remains unchanged (Promises → API calls)

### Module Pending Pattern

- Modules can be marked "pending" (incomplete, not routed)
- See `src/modules/newModuleSkeleton.ts` and `src/modules/README.md` for integration guide
- Menu items conditionally shown; hide pending modules behind feature flag if needed

### Build & Run

- `npm start` — dev server on React Scripts (HMR enabled)
- `npm build` — production build in `build/` directory
- `npm test` — run Jest tests (test files: `*.test.tsx`, `*.spec.tsx`)

### TypeScript Strict Mode

- Enabled in `tsconfig.json`; all types required
- Base path set to `src/` for cleaner imports
- Don't rely on implicit `any`; always type thunk payload and state shapes

---

## Quick Win Checklist for Agents

- ✓ Check Redux state shape before adding selectors
- ✓ Validate fake backend helper exists before calling from thunk
- ✓ Use `useProfile()` hook to check auth state, not raw localStorage access
- ✓ Add toast notifications on success/error in thunks (copy-paste from departments pattern)
- ✓ Protect routes via `AuthProtected`; check token in `useProfile()` for conditional UI
- ✓ Test localStorage keys match ("authUser", "user" for profile data)
