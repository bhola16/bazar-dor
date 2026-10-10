# 🛒 BazarDor (বাজার দর)

**BazarDor** is a modern, responsive market-price information web application built with **Next.js, React, TypeScript, and Tailwind CSS**.

The application helps users explore daily market prices in Bangladesh, browse products by category, compare prices across markets, track price increases and decreases, and view detailed product information. It also provides user authentication, account registration, and profile management.

## 🚀 Live Demo

- **Vercel:** [Visit BazarDor](https://bazar-dor-kohl.vercel.app/)

## 📂 GitHub Repository

**GitHub:** [BazarDor](https://github.com/bhola16/bazar-dor)

---

## ✨ Features

### 1. 🏠 Homepage and Product Overview

The homepage provides an overview of the BazarDor application and its market-price information.

Users can explore product listings, discover different product categories, and navigate to detailed product information.

The homepage includes reusable UI components for the banner, product listings, navigation, and price movement sections.

### 2. 🛍️ Product Library

Users can browse products and explore their available market-price information.

Product listings provide information such as:

- Product name
- Product category
- Available price information
- Price movement, where available
- Links to detailed product pages

Product and category information is retrieved from the BazarDor REST API.

### 3. 📂 Browse Products by Category

BazarDor allows users to explore products through category-based navigation.

The category page provides a focused view of products belonging to a selected category.

Users can:

- Open a category
- Browse products within that category
- Sort category products
- Open individual product detail pages

Each category uses a dynamic route, allowing the application to display different categories through a shared page structure.

### 4. 📈 Price Increase Tracking

The application provides a section for products whose prices have increased.

Users can explore products with upward price movements and use the available product information to understand recent market changes.

The `PriceIncreased.tsx` component handles this section of the interface.

### 5. 📉 Price Decrease Tracking

BazarDor also highlights products whose prices have decreased.

This feature helps users identify products with downward price movements and explore their current market-price information.

The `PriceDecreased.tsx` component is responsible for displaying this section.

### 6. 📊 Market Price Comparison

The application provides market-price information for individual products.

The market-price comparison interface is implemented through the `MarketPriceTable.tsx` component.

Depending on the information returned by the API, users can review available market prices and compare price values across markets.

This helps users explore differences in product prices rather than relying on a single price value.

### 7. 📄 Product Details

Users can open an individual product to view more detailed information.

The product details page uses a dynamic slug-based route.

Product detail pages are designed to present information such as:

- Product name and details
- Current price information
- Previous price information, where available
- Market-price comparisons
- Relevant product information returned by the API

The product detail page is implemented in `src/app/product/[slug]/page.tsx`.

### 8. ↕️ Category Product Sorting

BazarDor includes sorting functionality for category-based product listings.

The `CategorySort.tsx` component provides the sorting interface.

This helps users organize product listings according to the sorting options supported by the application.

### 9. 🔐 User Authentication

BazarDor uses **Better Auth** for authentication and session management.

The application includes dedicated sign-in and sign-up pages.

Supported authentication methods include:

- Email and password
- Google sign-in
- GitHub sign-in

Google and GitHub authentication require valid OAuth credentials and properly configured callback URLs.

Authentication is configured through the client and server modules in `src/lib`.

### 10. 📝 User Registration

New users can create an account through the sign-up page.

The registration interface provides an entry point for users who want to access the application's account features.

The registration page is implemented in:

```text
src/app/signup/page.tsx
```

### 11. 👤 User Profile

BazarDor provides a profile page for account-related information.

The profile interface is implemented in:

```text
src/app/profile/page.tsx
```

The application includes a `UserInfo.tsx` component for displaying user information.

The available profile functionality depends on the authentication state and the information supported by the application.

### 12. 🧭 Navigation

BazarDor uses reusable navigation components to help users move between different parts of the application.

The navigation system includes:

- `Header.tsx` — Main header
- `Navlinks.tsx` — Navigation links
- `NavlinksClient.tsx` — Client-side navigation behavior
- `Footer.tsx` — Footer section

These components help maintain a consistent interface across the application's pages.

### 13. 🔔 Toast Notifications

BazarDor includes a toast notification provider to display feedback to users.

The `ToastProvider.tsx` component integrates the notification interface into the application.

Toast notifications provide a way to communicate relevant actions and application feedback without requiring users to navigate away from the current page.

### 14. ⏳ Loading States

The application includes loading UI for the homepage and dynamic pages.

Loading components help communicate that content is being prepared or retrieved.

BazarDor includes:

- Application-level loading UI
- Category page loading UI
- Product detail page loading UI

These loading interfaces are implemented through the relevant `loading.tsx` files.

### 15. ❌ Custom 404 Page

BazarDor includes a custom not-found page for routes or resources that cannot be found.

The page is implemented in:

```text
src/app/not-found.tsx
```

This provides a dedicated interface instead of relying solely on the default not-found experience.

### 16. 📱 Responsive Design

BazarDor is built with a responsive interface using Tailwind CSS.

The application is designed to support different screen sizes.

- 📱 **Mobile:** Product browsing and navigation on smaller screens
- 📲 **Tablet:** Adaptive layouts and spacing
- 💻 **Desktop:** Expanded layouts for product listings and market-price information

Reusable components help maintain a consistent user experience throughout the application.

### 17. 🎨 Modern User Interface

BazarDor combines reusable UI components with Tailwind CSS and DaisyUI.

The interface includes:

- Product cards
- Category-based product listings
- Market-price tables
- Navigation components
- Price movement sections
- Loading states
- Toast notifications
- Authentication pages
- Profile interface

The design focuses on making market-price information easier to browse and understand.

---

## 🛠️ Technologies Used

- **Next.js 16** — React framework and App Router
- **React 19** — User interface development
- **TypeScript** — Type-safe application code
- **Tailwind CSS 4** — Styling and responsive layouts
- **DaisyUI** — UI styling components
- **Better Auth** — Authentication and session management
- **MongoDB** — Authentication data storage
- **Mongoose** — MongoDB object modeling dependency
- **React Toastify** — Toast notifications
- **Lucide React** — Icons
- **React Icons** — Additional icons
- **REST API** — Product, category, and market-price data
- **Vercel** — Application deployment

---

## 🔗 API

BazarDor uses a REST API to retrieve product and category information.

### Base API URL

```text
https://api.api-store.workers.dev/api/bazardor
```
The application uses these endpoints to retrieve product and category data.

**Note:** The availability and completeness of product and market-price information depend on the API response.

---

## 📂 Project Structure

```text
bazar-dor/
│
├── public/
│   ├── bazar-hero.png
│   ├── github.jpeg
│   ├── google.jpeg
│   └── logo-icon.png
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   │
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   │
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── AllProducts.tsx
│   │   ├── Banner.tsx
│   │   ├── CategoryProducts.tsx
│   │   ├── CategorySort.tsx
│   │   ├── DateDisplay.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MarketPriceTable.tsx
│   │   ├── Marquee.tsx
│   │   ├── Navlinks.tsx
│   │   ├── NavlinksClient.tsx
│   │   ├── PriceDecreased.tsx
│   │   ├── PriceIncreased.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ToastProvider.tsx
│   │   └── UserInfo.tsx
│   │
│   ├── lib/
│   │   ├── auth-client.ts
│   │   └── auth.ts
│   │
│   ├── proxy.ts
│   │
│   └── type/
│       └── Type.ts
│
├── .gitignore
├── AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── test-mongodb.ts
├── tsconfig.json
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Before running BazarDor locally, make sure you have:

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB database or MongoDB connection string
- Google OAuth credentials if Google sign-in is required
- GitHub OAuth credentials if GitHub sign-in is required

### 1. Clone the repository

```bash
git clone https://github.com/bhola16/bazar-dor.git
```

### 2. Navigate to the project directory

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

Add the following configuration:

```env
# MongoDB connection
MONGODB_URL=your_mongodb_connection_string

# Better Auth application URL
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials.

The authentication configuration uses the MongoDB database named `bazar-dor07`.

**Important:** Keep your database connection string and OAuth secrets private. Never commit `.env.local` or credentials to GitHub.

### 5. Configure OAuth providers

If you want to enable Google or GitHub sign-in:

1. Create an OAuth application with the relevant provider.
2. Obtain the client ID and client secret.
3. Configure the provider's callback URL according to your Better Auth setup.
4. Add the credentials to `.env.local`.
5. Ensure the application URL matches your local or deployed environment.

### 6. Start the development server

```bash
npm run dev
```

### 7. Open the application

Visit:

```text
http://localhost:3000
```

The BazarDor application should now be available in your browser.

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

To run the linter:

```bash
npm run lint
```

---

## 📱 Responsive Design

BazarDor uses Tailwind CSS to create responsive layouts for product browsing, category navigation, and market-price information.

### Mobile

- Responsive product listings
- Compact navigation
- Mobile-friendly authentication pages
- Adaptable product detail layouts
- Readable market-price information

### Tablet

- Adaptive product layouts
- Responsive spacing
- Flexible navigation and content sections

### Desktop

- Expanded product listings
- Wider content layouts
- Detailed product information
- Market-price comparison tables

---

## 🔄 Application Flow

```text
User opens BazarDor
        ↓
Homepage displays product and market information
        ↓
Product and category data are retrieved from the API
        ↓
User browses product listings
        ↓
User selects a category
        ↓
Products in the selected category are displayed
        ↓
User opens a product detail page
        ↓
Available product and market-price information is displayed
        ↓
User explores price increases and decreases
        ↓
User can sign in or create an account
        ↓
Authenticated user can access the profile page
```

---

## 🔐 Authentication and Data Storage

BazarDor uses Better Auth to manage authentication.

### Authentication Methods

The application supports:

- Email and password
- Google OAuth
- GitHub OAuth

### Authentication Configuration

The authentication setup is divided into two modules:

```text
src/lib/auth.ts
src/lib/auth-client.ts
```

- `auth.ts` — Server-side authentication configuration.
- `auth-client.ts` — Client-side authentication integration.

The authentication API route is located at:

```text
src/app/api/auth/[...all]/route.ts
```

MongoDB is used for authentication data storage through the configured database connection.

For production deployments, use the appropriate production database and OAuth credentials. Do not expose secrets through client-side code.

---

## 🔎 Product and Category Data

BazarDor retrieves product and category information from its REST API.

### Product Data

The product listing interface uses the API to obtain the available products and their information.

### Category Data

The category interface organizes products according to the category information provided by the API.

### Market-Price Information

Product detail pages display available price information and market comparisons.

The accuracy and freshness of displayed prices depend on the information supplied by the API.

---

## 🔔 User Interface Feedback

BazarDor includes reusable components for loading states and toast notifications.

### Loading Feedback

Loading components are available for:

- The homepage
- Category pages
- Product detail pages

### Toast Notifications

The `ToastProvider.tsx` component provides the toast notification integration used by the application.

These interface elements help communicate application status and user feedback.

---

## 🎯 Project Highlights

BazarDor brings together several features to make market-price information easier to explore:

- Dynamic product listings
- Category-based browsing
- Product detail pages
- Market-price comparisons
- Price increase tracking
- Price decrease tracking
- Category product sorting
- Email and password authentication
- Google sign-in
- GitHub sign-in
- User profile interface
- MongoDB-backed authentication
- Loading states
- Toast notifications
- Responsive layouts
- Custom 404 page
- TypeScript-based development
- Next.js App Router

---

## 👨‍💻 Author

**Bholanath Bala**

- **GitHub:** [bhola16](https://github.com/bhola16)
- **Project Repository:** [BazarDor](https://github.com/bhola16/bazar-dor)
- **Live Demo:** [bazar-dor-kohl.vercel.app](https://bazar-dor-kohl.vercel.app/)

---

## 📄 License

This project was created for educational purposes as part of the Programming Hero Web Development course.
