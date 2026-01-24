# Redux Toolkit and Saga

A proof of concept React dashboard application built with Redux Toolkit + Redux-Saga for state management.

## 🏗️ Architecture

Simplified architecture with clear separation of concerns:

```
COMPONENT → SAGA → SERVICE → API
     ↓
  SLICE (State)
```

| Layer         | Purpose                                |
| ------------- | -------------------------------------- |
| **Component** | UI components, pages, hooks            |
| **Saga**      | Async flow orchestration, side effects |
| **Slice**     | State management, sync reducers        |
| **Service**   | Business logic, validation             |
| **API**       | HTTP calls, external communication     |

### Why This Architecture?

- **Saga handles async** - API calls, localStorage, complex flows
- **Slice handles state** - Synchronous state updates
- **Service handles logic** - Validation, business rules
- **No over-abstraction** - Direct flow, easy to trace

## 📁 Structure

```
src/
├── app/              # App config, layout, providers, router
├── features/         # Feature modules (authentication, dashboard)
│   └── [feature]/
│       ├── components/   # Feature UI components
│       ├── pages/        # Feature pages
│       ├── hooks/        # Feature hooks
│       ├── stores/       # Redux slice + saga
│       ├── services/     # Business logic
│       ├── api/          # API endpoints
│       └── types/        # TypeScript types
├── components/       # Shared components (layout, ui)
├── lib/              # Utilities, stores, types, schemas
│   └── stores/       # Root reducer + saga
└── routes/           # Route definitions
```

### Feature Module Pattern

Each feature follows a consistent structure:

- **stores/** - Redux slice (state) + saga (async)
- **services/** - Business logic + validation
- **api/** - Raw HTTP calls
- **components/** - UI components
- **hooks/** - Custom hooks for the feature

## 🔧 Tech Stack

**Core:**

- React 19 + TypeScript
- Vite 7

**State Management:**

- Redux Toolkit (state + reducers)
- Redux-Saga (async operations)

**UI & Styling:**

- Tailwind CSS
- shadcn/ui components
- Lucide React (icons)
- Recharts (data visualization)

**Forms & Validation:**

- React Hook Form
- Zod schemas

**Routing:**

- React Router v7

**Code Quality:**

- ESLint
- Husky (git hooks)

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repository-url>
cd <project-directory>
pnpm install
pnpm dev
```

### Scripts

```bash
pnpm dev        # Development server
pnpm build      # Production build
pnpm lint       # Run ESLint
pnpm lint:fix   # Fix ESLint issues
```

## 🔐 Authentication

**Demo Credentials:**

```
Email: admin@example.com
Password: password123
```

## 📊 Features

- Authentication with session management
- Metric cards with trend indicators
- Interactive charts (Line, Donut, Pie)
- Activity feed
- Data table with CRUD operations
- Responsive design

## 🐶 Git Hooks

- **pre-commit**: Runs linting before commit
- **pre-push**: Runs linting before push

## 📚 Documentation

- [Redux Saga Explanation](./docs/redux-saga-explanation.md) - Detailed guide on how Redux Toolkit + Saga work together
- [Redux State Management](./docs/redux-state-management.md) - State management patterns and best practices

## 🎯 Key Concepts

### Redux-Saga Flow

```typescript
// 1. Component dispatches saga action
dispatch(loginRequest({ email, password }));

// 2. Saga catches and processes
function* loginSaga(action) {
  yield put(loginStart()); // Update loading state
  const result = yield call([authService, "login"], action.payload);
  yield put(loginSuccess(result)); // Update with data
}

// 3. Slice updates state
loginSuccess: (state, action) => {
  state.user = action.payload.user;
  state.isAuthenticated = true;
};

// 4. Component re-renders
```

### Why Saga over Thunk?

- ✅ Better for complex async flows
- ✅ Easier to test (pure functions)
- ✅ Cancellable operations
- ✅ Background tasks support
- ✅ Race condition handling
