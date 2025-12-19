# Backend Documentation

The backend (`packages/backend`) is a high-performance REST API built with Node.js/Bun, Express, and Drizzle ORM.

## Architecture

The backend follows a standard layered architecture:

- **Routes**: Define endpoints and handle HTTP requests/responses.
- **Controllers/Handlers**: (Often inline or separated) contain the business logic.
- **Database Layer**: Drizzle ORM schemas and query builders.

## Environment Variables

The application is configured via environment variables, validated by **Zod** in `src/env.ts`.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode (`development`, `production`, `test`) | `development` |
| `PORT` | Port to listen on | - |
| `DATABASE_URL` | Connection string for PostgreSQL | - |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | - |

## Database Schema (`src/db/schema.ts`)

We use **Drizzle ORM** with **PostgreSQL**.

### Key Tables

#### Users (`users`)
- Stores authentication and profile info.
- **Fields**: `email`, `password` (hashed), `role` (customer/admin), `address` fields.

#### Products (`products`)
- Core product catalog.
- **Fields**: `title`, `price` (integer, likely cents/pence), `stock`, `category`.
- **Relations**:
    - **One-to-Many**: `product_descriptions` (for rich text/sections).
    - **One-to-Many**: `product_colors` (available variants).
    - **One-to-Many**: `product_images` (gallery).
    - **One-to-Many**: `product_specifications` (key-value specs).

#### Orders (`orders`)
- **Fields**: `orderNumber` (unique), `total`, `status` (processing, etc.).
- **Relations**: Has many `order_items`.

#### Contact Messages (`contact_messages`)
- Stores incoming queries from the contact form.

## API Structure

All routes are prefixed (typically mounted in `src/index.ts`).

### Authentication (`/auth`)
- **POST** `/register`: Create a new user account.
- **POST** `/login`: Authenticate and receive a cookie.
- **POST** `/logout`: Clear the session.

### Products (`/products`)
- **GET** `/`: List all products (supports filtering).
- **GET** `/:id`: Get single product details.
- **POST** `/`: (Admin) Create product.

### Global Middleware

- **`cookieParser`**: Parses cookies for auth.
- **`express.json()`**: Parses JSON bodies.
- **Error Handling**: Centralized error handler catches exceptions and returns uniform JSON responses (e.g., `{ error: "message" }`).

## Development

### Running the Server

```bash
cd packages/backend
bun run dev
```

### Database Migrations

We use **Drizzle Kit** to manage schema changes.

1. Modify `src/db/schema.ts`.
2. Push changes to the DB:
   ```bash
   bun run drizzle-kit push
   ```
