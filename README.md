# Mavincode Assessment

A React dashboard application built with Clean Architecture and Domain-Driven Design (DDD) principles. This project demonstrates a scalable, maintainable approach to building enterprise-grade React applications.

## 🏗️ Architecture Overview

This project implements Clean Architecture with distinct layers, each with a clear responsibility:

```
┌─────────────────────────────────────────────────────────────┐
│                        VIEW LAYER                           │
│              (React Components, Pages, Hooks)               │
├─────────────────────────────────────────────────────────────┤
│                      USECASE LAYER                          │
│           (Business Logic Orchestration, Sagas)             │
├─────────────────────────────────────────────────────────────┤
│                      SERVICE LAYER                          │
│              (Business Rules, Validation)                   │
├─────────────────────────────────────────────────────────────┤
│                    REPOSITORY LAYER                         │
│                (Data Access Abstraction)                    │
├─────────────────────────────────────────────────────────────┤
│                      ADAPTER LAYER                          │
│                  (API, External Services)                   │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Purpose | Example |
|-------|---------|---------|
| **View** | UI rendering, user interactions | `DashboardCard.tsx`, `LoginPage.tsx` |
| **UseCase** | Orchestrates business flows, coordinates services | `dashboard.usecase.ts`, `auth.usecase.ts` |
| **Service** | Business rules, validation, data transformation | `dashboard.service.ts`, `auth.service.ts` |
| **Repository** | Data access abstraction, caching strategy | `dashboard.repository.ts`, `auth.repository.ts` |
| **Adapter (API)** | External API communication | `dashboard.api.ts`, `auth.api.ts` |

## 📁 Project Structure

```
src/
├── app/                          # Application configuration
│   ├── layout/                   # Root layout components
│   ├── providers/                # Global providers (Redux)
│   └── router/                   # Router configuration & guards
│
├── features/                     # Feature modules
│   ├── authentication/           # Auth feature
│   │   ├── api/                  # API adapter layer
│   │   ├── components/           # Feature components
│   │   ├── hooks/                # Custom hooks
│   │   ├── pages/                # Page components
│   │   ├── services/             # Repository, Service, UseCase
│   │   ├── stores/               # Redux slice & sagas
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Feature utilities
│   │
│   └── dashboard/                # Dashboard feature
│       ├── api/                  # API adapter layer
│       ├── components/           # Charts, Cards, Tables
│       ├── hooks/                # useDashboard, useCharts
│       ├── services/             # Repository, Service, UseCase
│       ├── stores/               # Redux slice & sagas
│       └── types/                # TypeScript types
│
├── components/                   # Shared components
│   ├── layout/                   # Layout components
│   ├── shared/                   # Common components
│   └── ui/                       # Base UI components
│
├── lib/                          # Shared utilities
│   ├── constants/                # App constants
│   ├── schemas/                  # Zod validation schemas
│   ├── stores/                   # Redux store configuration
│   └── types/                    # Global types
│
└── routes/                       # Route definitions
```

## 🔧 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **State Management:** Redux Toolkit + Redux Saga
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Routing:** React Router DOM v7
- **Charts:** Recharts
- **Icons:** Lucide React
- **Code Quality:** ESLint + Husky

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TEECOD3/mavincode_assessment.git

# Navigate to project directory
cd mavincode_assessment

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
pnpm lint:fix   # Fix ESLint issues
```


## 🔐 Authentication

The app includes a complete authentication flow:

- Login page with form validation (Zod + React Hook Form)
- Protected routes with auth guards
- Redux-managed auth state with saga side effects
- Logout modal with confirmation

**Demo Credentials:**
```
Email: admin@example.com
Password: password123
```

## 📊 Dashboard Features

- Authentication (Login/Logout with session management)
- Metric cards with trend indicators
- Interactive charts (Line, Donut, Pie)
- Activity feed
- Data table with CRUD operations
- Responsive design (mobile-first)


## 🎨 UI Components

Built with a custom component library following shadcn/ui patterns:

- Button, Input, Card
- Modal, Sheet, Popover
- Data Table with pagination
- Form components with validation



