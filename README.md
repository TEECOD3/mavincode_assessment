# Redux Toolkit and Saga

A proof of concept React dashboard application built with Clean Architecture and Domain-Driven Design (DDD) principles.

## 🏗️ Architecture

Clean Architecture with distinct layers:

```
VIEW → USECASE → SERVICE → REPOSITORY → ADAPTER (API)
```

| Layer          | Purpose                      |
| -------------- | ---------------------------- |
| **View**       | UI components, pages, hooks  |
| **UseCase**    | Business logic orchestration |
| **Service**    | Business rules, validation   |
| **Repository** | Data access abstraction      |
| **Adapter**    | External API communication   |

## 📁 Structure

```
src/
├── app/              # App config, layout, providers, router
├── features/         # Feature modules (authentication, dashboard)
├── components/       # Shared components (layout, ui)
├── lib/              # Utilities, stores, types
└── routes/           # Route definitions
```

## 🔧 Tech Stack

React 19 • TypeScript • Vite 7 • Redux Toolkit + Saga • Tailwind CSS • React Hook Form + Zod • React Router v7 • Recharts • Lucide React • ESLint + Husky

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
