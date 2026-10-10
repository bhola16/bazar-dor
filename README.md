# 🛒 BazarDor (বাজার দর)

**BazarDor** is a modern, responsive market-price information web application built with **Next.js, React, TypeScript, and Tailwind CSS**.

The application helps users explore daily market prices in Bangladesh, browse products by category, compare prices across markets, track price increases and decreases, and view detailed product information. It also provides user authentication, account registration, and profile management.

## 🚀 Live Demo

- **Vercel:** [Visit BazarDor](https://bazar-dor-kohl.vercel.app/)

## 📂 GitHub Repository

- **GitHub:** [BazarDor](https://github.com/bhola16/bazar-dor)

---

## ✨ Features

### 1. 🏠 Homepage and Product Overview

The homepage provides an overview of BazarDor and its market-price information.

- Explore product listings and categories.
- Navigate to individual product details.
- View price movement sections.
- Browse reusable banner, navigation, and product components.

### 2. 🛍️ Product Library

Browse products and explore their available market-price information.

Product listings can include:

- Product name and category
- Available price information
- Price movement, where available
- Links to detailed product pages

Product and category information is retrieved from the BazarDor REST API.

### 3. 📂 Browse Products by Category

Explore products through category-based navigation.

- Open a category.
- Browse products within the selected category.
- Sort category products.
- Open individual product detail pages.

Dynamic routes allow different categories to share a common page structure.

### 4. 📈 Price Increase Tracking

Explore products whose prices have increased to understand upward market-price movements.

The `PriceIncreased.tsx` component handles this section of the interface.

### 5. 📉 Price Decrease Tracking

Discover products whose prices have decreased and explore their available market-price information.

The `PriceDecreased.tsx` component displays this section.

### 6. 📊 Market Price Comparison

The `MarketPriceTable.tsx` component presents available market-price information for individual products.

Users can review price values across markets when comparison data is available through the API.

### 7. 📄 Product Details

Individual product pages provide more detailed information, which may include:

- Product name and description
- Current price information
- Previous price information, where available
- Market-price comparisons
- Other product information returned by the API

Product detail pages use a dynamic slug-based route:

`src/app/product/[slug]/page.tsx`

### 8. ↕️ Category Product Sorting

The `CategorySort.tsx` component provides sorting controls for category-based product listings, helping users organize products using the available sorting options.

### 9. 🔐 User Authentication

BazarDor uses **Better Auth** for authentication and session management.

Supported authentication methods include:

- Email and password
- Google sign-in
- GitHub sign-in

Google and GitHub authentication require valid OAuth credentials and correctly configured callback URLs.

### 10. 📝 User Registration

New users can create an account through the sign-up page.

`src/app/signup/page.tsx`

### 11. 👤 User Profile

BazarDor provides a profile page for account-related information and a `UserInfo.tsx` component for displaying user information.

`src/app/profile/page.tsx`

Available profile functionality depends on the user's authentication state and the information supported by the application.

### 12. 🧭 Navigation

Reusable navigation components provide consistent navigation across the application.

- `Header.tsx` — Main header
- `Navlinks.tsx` — Navigation links
- `NavlinksClient.tsx` — Client-side navigation behavior
- `Footer.tsx` — Footer section

### 13. 🔔 Toast Notifications

The `ToastProvider.tsx` component integrates toast notifications to communicate relevant actions and application feedback.

### 14. ⏳ Loading States

Loading interfaces help communicate when content is being retrieved or prepared.

BazarDor includes loading UI for:

- The homepage
- Category pages
- Product detail pages

These interfaces are implemented through the relevant `loading.tsx` files.

### 15. ❌ Custom 404 Page

The application includes a custom not-found page for unavailable routes or resources.

`src/app/not-found.tsx`

### 16. 📱 Responsive Design

Built with Tailwind CSS, BazarDor adapts to different screen sizes.

- **Mobile:** Compact navigation and mobile-friendly product browsing
- **Tablet:** Flexible layouts and adaptive spacing
- **Desktop:** Expanded product listings and market-price information

### 17. 🎨 Modern User Interface

The interface combines reusable components with Tailwind CSS and DaisyUI.

It includes product cards, category listings, market-price tables, navigation components, price movement sections, loading states, toast notifications, authentication pages, and a profile interface.

---

## 🛠️ Technologies Used

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| Next.js 16     | React framework and App Router           |
| React 19       | User interface development               |
| TypeScript     | Type-safe application code               |
| Tailwind CSS 4 | Styling and responsive layouts           |
| DaisyUI        | UI styling components                    |
| Better Auth    | Authentication and session management    |
| MongoDB        | Authentication data storage              |
| Mongoose       | MongoDB object modeling                  |
| React Toastify | Toast notifications                      |
| Lucide React   | Icons                                    |
| React Icons    | Additional icons                         |
| REST API       | Product, category, and market-price data |
| Vercel         | Application deployment                   |

---

## 🔗 API

BazarDor uses a REST API to retrieve product and category information.
## 🔗 API Configuration

**Base API URL:**

- **Primary API:** `https://api.abcz.workers.dev/api/bazardor`
- **Alternative API:** `https://api.api-store.workers.dev/api/bazardor`

> **Note:** This project currently uses the `api.abcz.workers.dev` endpoint. The alternative endpoint (`api.api-store.workers.dev`) may occasionally be unavailable.



The API provides product and category data used throughout the application. The availability and completeness of market-price information depend on the API response.

---

## 📂 Project Structure

```text
bazar-dor/
├── public/
│   ├── bazar-hero.png
│   ├── github.jpeg
│   ├── google.jpeg
│   └── logo-icon.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
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
│   ├── lib/
│   │   ├── auth-client.ts
│   │   └── auth.ts
│   ├── proxy.ts
│   └── type/
│       └── Type.ts
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

---

## ⚙️ Installation and Setup

### Prerequisites

Before running BazarDor locally, make sure you have:

- [Node.js](https://nodejs.org/)
- npm
- Git
- A MongoDB database or connection string
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

Create a `.env` file in the project root and configure the variables required by your application.

Example:

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

Replace the placeholder values with your actual credentials. Confirm the required environment variable names in your authentication configuration before running the application.

The authentication configuration uses the MongoDB database named `bazar-dor07`, according to the current project configuration described here.

**Important:** Keep your database connection string and OAuth secrets private. Never commit `.env` files or credentials to GitHub.

### 5. Configure OAuth providers

If you want to enable Google or GitHub sign-in:

1. Create an OAuth application with the relevant provider.
2. Obtain the client ID and client secret.
3. Configure the callback URL according to your Better Auth setup.
4. Add the required credentials to your environment variables.
5. Ensure the application URL matches your local or deployed environment.

### 6. Start the development server

```bash
npm run dev
```

### 7. Open the application

Visit http://localhost:3000 in your browser.

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

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

- Email and password
- Google OAuth
- GitHub OAuth

### Authentication Configuration

The authentication setup is divided into two modules:

```text
src/lib/auth.ts
src/lib/auth-client.ts
```

- `auth.ts` — Server-side authentication configuration
- `auth-client.ts` — Client-side authentication integration

The authentication API route is located at:

```text
src/app/api/auth/[...all]/route.ts
```

MongoDB is used for authentication data storage through the configured database connection.

For production deployments, use the appropriate production database and OAuth credentials. Never expose secrets through client-side code.

---

## 🔎 Product and Category Data

BazarDor retrieves product and category information from its REST API.

### Product Data

The product listing interface retrieves available products and their information from the API.

### Category Data

The category interface organizes products according to the category information provided by the API.

### Market-Price Information

Product detail pages display available price information and market comparisons. The accuracy and freshness of displayed prices depend on the information supplied by the API.

---

## 🔔 User Interface Feedback

BazarDor includes reusable components for loading states and toast notifications.

### Loading Feedback

Loading components are available for the homepage, category pages, and product detail pages.

### Toast Notifications

The `ToastProvider.tsx` component provides toast notification integration throughout the application.

These elements help communicate application status and user feedback.

---

## 🎯 Project Highlights

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

- **GitHub:** [@bhola16](https://github.com/bhola16)
- **Project Repository:** [BazarDor](https://github.com/bhola16/bazar-dor)
- **Live Demo:** [bazar-dor-kohl.vercel.app](https://bazar-dor-kohl.vercel.app/)

---

## 📄 License

This project was created for educational purposes as part of the Programming Hero Web Development course.
