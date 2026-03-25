# CampyTech Frontend

CampyTech Frontend is a React + Vite application for:

- a public education/newsroom homepage
- an admin dashboard for managing blog content

The codebase is organized around a feature-first structure with shared modules for cross-cutting concerns. The goal is to keep the project easy to extend, easy to debug, and consistent with SOLID-friendly boundaries.

## Tech Stack

- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4
- Axios
- Lucide React

## What Exists Today

### Public Application

- Homepage newsroom layout
- Live blog feed loading from the backend
- Breaking news ticker
- Search and category filters
- Featured story and trending sidebar
- Newsletter and social sections
- First-visit onboarding/tutorial overlay

### Admin Application

- Admin login flow
- Blog dashboard
- Blog create/edit form
- Category and tag loading
- Publish / draft / archive status handling

## Architecture Summary

This project uses a `feature-first` structure.

- `src/app`
  Contains app-level composition such as routing.

- `src/features`
  Contains business features. Each feature owns its own pages, hooks, services, data, utils, sections, and UI.

- `src/shared`
  Contains reusable building blocks used across features.

- `src/assets`
  Static files such as images.

This keeps domain logic close to the feature that owns it, while shared code stays generic and reusable.

## Folder Structure

```text
src/
  app/
    router/
      index.jsx

  features/
    home/
      data/
      hooks/
      pages/
      sections/
      services/
      ui/
      utils/
    admin/
      components/
      constants.js
      hooks/
      pages/
      services/
      utils/

  shared/
    config/
    hooks/
    icons/
    layout/
    utils/

  assets/
  App.jsx
  main.jsx
  index.css
```

## Read This First

If you are new to the project, read the files below in this order:

1. `package.json`
   Understand the scripts and runtime assumptions.

2. `src/main.jsx`
   Entry point for the React app.

3. `src/app/router/index.jsx`
   Shows the route map and the top-level app composition.

4. `src/App.jsx`
   Public app shell. This wraps the homepage with the shared header/footer.

5. `src/shared/utils/client.js`
   Central API client configuration.

6. `src/features/home/pages/HomePage.jsx`
   The main composition file for the public homepage.

7. `src/features/home/hooks/useHomeFeedData.js`
   Backend loading flow for public blog data.

8. `src/features/home/hooks/useBlogFilters.js`
   Filtering and view-model logic for the homepage feed.

9. `src/features/admin/pages/AdminPage.jsx`
   The top-level admin feature entry.

10. `src/features/admin/hooks/useAdminPanel.js`
    Session, dashboard, and blog form behavior for admin flows.

## Route Map

Current routes:

- `/`
  Public homepage

- `/admin`
  Admin panel

Routing is defined in:

- `src/app/router/index.jsx`

## Design Pattern Used

The project is intentionally structured around separation of concerns:

### 1. Page Composition

Pages assemble sections and pass data down.

Examples:

- `src/features/home/pages/HomePage.jsx`
- `src/features/admin/pages/AdminPage.jsx`

Pages should not become large "do everything" files.

### 2. Hooks for Stateful Behavior

Hooks own state and interactions for a feature.

Examples:

- `useHomeFeedData`
- `useBlogFilters`
- `useHomeTutorial`
- `useAdminPanel`

This keeps stateful behavior out of presentational components.

### 3. Services for API Access

API calls are isolated in service files, instead of being scattered through UI components.

Examples:

- `src/features/home/services/homeApi.js`
- `src/features/admin/services/adminApi.js`

This makes endpoint changes easier to manage.

### 4. Utils for Data Transformation

Backend payloads are normalized before the UI consumes them.

Examples:

- `src/features/home/utils/postNormalizer.js`
- `src/features/admin/utils/adminHelpers.js`

This is important because the backend shape may change, but the UI should remain stable.

### 5. Shared Modules for Cross-Feature Reuse

Truly generic modules live in `shared`.

Examples:

- `src/shared/utils/client.js`
- `src/shared/layout/SiteHeader.jsx`
- `src/shared/layout/SiteFooter.jsx`
- `src/shared/hooks/useDocumentTitle.jsx`

If a file is not truly generic, it should stay inside the feature that owns it.

## SOLID Direction In This Project

The project is being maintained with SOLID-friendly boundaries in mind:

- Single Responsibility
  A page composes, a hook manages state, a service talks to the backend, a utility transforms data.

- Open/Closed
  New pages or behaviors should be added by extending feature folders, not by rewriting unrelated modules.

- Liskov Substitution
  UI sections should accept stable, predictable props and remain easy to swap.

- Interface Segregation
  Components should receive only the props they actually use.

- Dependency Inversion
  UI depends on normalized data and feature services, not raw backend assumptions everywhere.

This is the standard future contributors should preserve.

## Data Flow

### Homepage Data Flow

The homepage follows this flow:

1. `HomePage.jsx`
2. `useHomeFeedData.js`
3. `homeApi.js`
4. `postNormalizer.js`
5. `useBlogFilters.js`
6. presentational sections and UI components

Important notes:

- the homepage attempts to fetch public blog data from the backend
- if the backend shape differs, normalization happens before rendering
- if the live feed fails, fallback staging data can still render the page

### Admin Data Flow

The admin area follows this flow:

1. `AdminPage.jsx`
2. `useAdminPanel.js`
3. `adminApi.js`
4. `adminHelpers.js`
5. admin components

Important notes:

- auth token is stored in `localStorage`
- admin data fetching is centralized through the admin hook
- blog payload transformation happens before save

## Environment Variables

Environment configuration is based on Vite env vars.

Current vars:

- `VITE_BACKEND_URL`
  Base URL for the backend API

- `VITE_PUBLIC_BLOG_ENDPOINT`
  Optional explicit public blog endpoint for homepage data

Example:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_PUBLIC_BLOG_ENDPOINT=/api/blog/published
```

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment Notes

### Recommended for Render

The cleanest deployment for this app is a Render `Static Site`.

- Build Command: `npm run build`
- Publish Directory: `dist`

### If Using Render Web Service

The repository also includes:

- Start Command: `npm start`

This runs:

```bash
vite preview --host 0.0.0.0 --port $PORT
```

## Naming Conventions

Use these conventions when adding new code:

- `pages/`
  Route-level or screen-level composition

- `sections/`
  Major screen blocks used by a page

- `ui/`
  Small presentational components tied to one feature

- `hooks/`
  Stateful logic

- `services/`
  HTTP / API calls

- `utils/`
  transformations, helpers, and formatting logic

- `data/`
  local seed data, configuration, or view metadata

## How To Add a New Feature

When adding a new feature, follow this shape:

```text
src/features/your-feature/
  pages/
  components/ or ui/
  hooks/
  services/
  utils/
  data/
  index.jsx
```

Suggested implementation order:

1. create the feature folder
2. create the page entry
3. add the route
4. add the hook if the feature has state
5. add the service if it talks to the backend
6. add presentational UI components
7. keep shared code in `shared/` only if another feature will genuinely reuse it

## How To Add a New Page Title

This project already includes:

- `src/shared/hooks/useDocumentTitle.jsx`

Use it inside a page:

```jsx
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle("About | CampyTech Gist");

  return <div>About page</div>;
}
```

Page titles should be set at page level, not deep inside reusable components.

## Tutorial / Onboarding Behavior

The homepage tutorial is anonymous and local to the browser.

- it uses `localStorage`
- it shows for first-time visitors
- it can be restarted from the floating help button

This is intentional. It does not require authentication.

## Known Architectural Rules

Future work should preserve these rules:

- avoid large all-in-one page files
- keep API calls out of presentational UI
- normalize backend responses before rendering
- prefer composition over duplication
- prefer feature ownership over dumping everything into `shared`
- document new environment variables and routes in this README

## Recommended Next Reads By Area

If you want to work on the homepage:

- `src/features/home/pages/HomePage.jsx`
- `src/features/home/hooks/useHomeFeedData.js`
- `src/features/home/hooks/useBlogFilters.js`
- `src/features/home/services/homeApi.js`
- `src/features/home/utils/postNormalizer.js`

If you want to work on the admin dashboard:

- `src/features/admin/pages/AdminPage.jsx`
- `src/features/admin/hooks/useAdminPanel.js`
- `src/features/admin/services/adminApi.js`
- `src/features/admin/utils/adminHelpers.js`

If you want to work on shared app shell or navigation:

- `src/App.jsx`
- `src/shared/layout/SiteHeader.jsx`
- `src/shared/layout/SiteFooter.jsx`
- `src/shared/config/siteNavigation.js`

## Final Note

When making future changes, the end goal is not only "make it work". The expected standard in this codebase is:

- clear patterns
- predictable structure
- low coupling
- reusable modules
- straightforward onboarding for the next developer

If a change solves the problem but damages the architecture, it is not the preferred solution.
