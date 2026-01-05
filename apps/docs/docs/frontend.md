# Frontend Documentation

The frontend application (`apps/web`) is a modern React application built for performance and developer experience.

## Tech Stack Deep Dive

- **React 19**: Leveraging the latest React features.
- **Vite 7**: Extremely fast build tool and dev server.
- **Tailwind CSS 4**: Utility-first CSS framework for styling.
- **TanStack Router**: Type-safe, file-based routing with built-in data loading.
- **Zustand**: Minimalistic global state management.
- **React Hook Form + Zod**: Robust form handling with schema validation.

## Application Structure

### Routing (`src/routes`)

We use **TanStack Router**'s file-based routing system.

- **`__root.tsx`**: The layout wrapper for the entire application (navbar, footer context).
- **`index.tsx`**: The homepage.
- **`shop/`**: Contains the main product catalog logic.
- **`product/$productId.tsx`**: (Hypothetical path based on typical structure) Dynamic product detail page.
- **`cart.tsx`**: Shopping cart view.
- **`payment.tsx`**: Checkout and payment processing.
- **`invoice.$invoiceId.tsx`**: Dynamic route for viewing specific invoices.
- **`auth/`**:
  - `login.tsx`: User sign-in.
  - `register.tsx`: New user registration.
  - `forgot-password.tsx`: Password recovery.
- **`profile/`**: User dashboard and settings.

### Components (`src/components`)

Components are categorized into:

1. **UI Primitives** (`src/components/ui`): Low-level, reusable components (likely buttons, inputs, dialogs).
2. **Feature Components**:
   - `ProductCard`: Displays product summary.
   - `ProductImageCarousel`: Gallery for product images.
   - `ShopFilters`: Sidebar for filtering products by category, price, etc.
   - `CartDrawer`: generic slide-out drawer for the cart.
   - `comparison-*.tsx`: Components for the product comparison feature.

### State Management (`src/stores`)

We use **Zustand** for global client state that doesn't belong in the URL or server cache.

- **Use cases**: Cart state, UI toggles (modals, drawers), user session preferences.

### Custom Hooks (`src/hooks`)

- **`useProductSearch`**: Encapsulates logic for searching and filtering products.
- **`useEscapeKey`**: Utility for handling keyboard interactions (closing modals).

## Utility Functions (`src/lib`)

- **`cn`**: A utility specifically for merging Tailwind classes conditionally (combines `clsx` and `tailwind-merge`).
- **`formatPrice`**: Standardizes currency display (GBP).

## Development Guidelines

### Adding a New Route

1. Create a file in `src/routes`.
2. Export a component using `createFileRoute`.
3. TanStack Router will automatically generate the types.

### Styling

Use Tailwind utility classes for 99% of styling. For complex conditional styles, use the `cn()` helper.

```tsx
<div className={cn("p-4 bg-white", isActive && "bg-blue-500 text-white")}>
  Content
</div>
```
