# Development Documentation

Welcome to the internal engineering documentation for our **E-Commerce Monorepo**.

This project is a high-performance web application built with modern TypeScript tools.

## Quick Start

### Prerequisites
- **Node.js**: (Latest LTS recommended)
- **Bun**: Required for backend runtime and package management.
- **Docker**: (Optional) For running a local PostgreSQL instance.

### Installation

```bash
# Install dependencies for all workspaces
bun install
```

### Running Locally

To start the full stack (Frontend + Backend) simultaneously:

```bash
# In the root directory
bun run dev
```

This will typically launch:
- **Frontend**: `localhost:5173`
- **Backend**: `localhost:3000`

## Documentation Sections

- **[Frontend Architecture](/frontend)**: Learn about the React + Vite application, TanStack Router setup, and component system.
- **[Backend Architecture](/backend)**: Explore the Express API, Drizzle ORM schemas, and database hierarchy.
- **[Integration Guide](/integration)**: How authentication, API calls, and error handling work between the two systems.

## Project Structure

```
├── apps
│   ├── web/           # React Application
│   └── docs/          # This Documentation Site
├── packages
│   └── backend/       # API Server
└── turbo.json         # Build pipeline configuration
```
