# Integration Guide

This guide details how the Frontend (`apps/web`) and Backend (`packages/backend`) collaborate.

## Network Communication

### Base Configuration
The frontend communicates with the backend via HTTP.
- **Development**: The frontend (Vite) proxies requests to `http://localhost:3000` (or the backend port) to avoid CORS issues.
- **Production**: The API base URL is typically configured via environment variables (e.g., `VITE_API_URL`).

### Data Fetching Strategy
The frontend uses standard `fetch` or data loading libraries (like React Query or TanStack Router loaders) to consume APIs.

**Example Request:**

```ts
// Example of fetching products
const response = await fetch('/api/products');
if (!response.ok) {
  throw new Error('Failed to fetch products');
}
const data = await response.json();
```

## Authentication Flow

Security is handled via **HTTP-Only Cookies**, which prevents XSS attacks targeting local storage.

1. **User Action**: User submits the Login form.
2. **Request**: Frontend sends `POST /auth/login` with JSON body `{ email, password }`.
3. **Backend Verification**:
   - Backend hashes the input password and checks against the DB.
   - If valid, generates a JWT signed with `JWT_SECRET`.
4. **Response**: Backend sends a `200 OK` with a `Set-Cookie` header containing the token.
5. **Subsequent Requests**: The browser automatically attaches the cookie to every request to the backend domain.
6. **Authorization**: Backend middleware extracts the token from the cookie and validates the user session.

## Error Handling Contract

The backend returns errors in a consistent format:

```json
{
  "error": "Description of what went wrong"
}
```

The frontend should check `response.ok` or the status code (e.g., `400`, `401`, `500`) and display the `error` message to the user (e.g., using a **Sonner** toast).
