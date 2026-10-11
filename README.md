# 🛒 BazarDor (বাজার দর)

BazarDor is a modern, responsive market-price information web application built with **Next.js, React, TypeScript, and Tailwind CSS**.

The application helps users explore daily market prices in Bangladesh, browse products by category, compare prices across markets, track price increases and decreases, and view detailed product information. It also provides user authentication, account registration, and profile management.

## 🚀 Live Demo

🔗 **Live Website:** [Visit BazarDor](https://bazar-dor-kohl.vercel.app/)

## 📂 GitHub Repository

🔗 **GitHub:** [BazarDor Repository](https://github.com/bhola16/bazar-dor)

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

- Product name and category.
- Available price information.
- Price movement, where available.
- Links to detailed product pages.

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

The `MarketPriceCostTable.tsx` component presents available market-price information for individual products.

Users can review price values across markets when comparison data is available through the API.

### 7. 📄 Product Details

Individual product pages provide more detailed information, which may include:

- Product name and description.
- Current price information.
- Previous price information, where available.
- Market-price comparisons.
- Other product information returned by the API.

Product detail pages use a dynamic slug-based route:

`src/app/product/[slug]/page.tsx`

### 8. ↕️ Category Product Sorting

The `CategorySort.tsx` component provides sorting controls for category-based product listings, helping users organize products using the available sorting options.

### 9. 🔐 User Authentication

BazarDor uses **Better Auth** for authentication and session management.

Supported authentication methods include:

- Email and password.
- Google sign-in.
- GitHub sign-in.

Google and GitHub authentication require valid OAuth credentials and correctly configured callback URLs.

### 10. 📝 User Registration

New users can create an account through the sign-up page.

Page location:

`src/app/signup/page.tsx`

### 11. 👤 User Profile

BazarDor provides a profile page for account-related information and a `UserInfo.tsx` component for displaying user information.

Page location:

`src/app/profile/page.tsx`

Available profile functionality depends on the user's authentication state and the information supported by the application.

### 12. 🧭 Navigation

Reusable navigation components provide consistent navigation across the application.

- `Header.tsx` — Main header.
- `Navlinks.tsx` — Navigation links.
- `NavlinksClient.tsx` — Client-side navigation behavior.
- `Footer.tsx` — Footer section.

### 13. 🔔 Toast Notifications

The `ToastProvider.tsx` component integrates toast notifications to communicate relevant actions and application feedback.

### 14. ⏳ Loading States

Loading interfaces help communicate when content is being retrieved or prepared.

BazarDor includes loading UI for:

- The homepage.
- Category pages.
- Product detail pages.

These interfaces are implemented through the relevant `loading.tsx` files.

### 15. ❌ Custom 404 Page

The application includes a custom not-found page for unavailable routes or resources.

File location:

`src/app/not-found.tsx`

### 16. 📱 Responsive Design

Built with Tailwind CSS, BazarDor adapts to different screen sizes.

- **Mobile:** Compact navigation and mobile-friendly product browsing.
- **Tablet:** Flexible layouts and adaptive spacing.
- **Desktop:** Expanded product listings and market-price information.

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

## 🔗 API Configuration

BazarDor uses a REST API to retrieve product and category information.

**Base API URL:**

`https://openapi.programming-hero.com/api/bazardor`

The API provides product and category data used throughout the application. The availability and completeness of market-price information depend on the API response.

---

## 📂 Project Structure

The main project structure is organized as follows:

```text
bazar-dor/
├── public/
│   ├── bazar-hero.png
│   ├── github.jpeg
│   ├── google.jpeg
│   └── logo-icon.png
│
├── src/
│   ├── app/
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
│   │   ├── MarketPriceCostTable.tsx
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

---

## ⚙️ Installation and Setup

Follow these steps to run BazarDor on your local machine.

### Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git
- A MongoDB database or connection string.
- Google OAuth credentials if Google sign-in is required.
- GitHub OAuth credentials if GitHub sign-in is required.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/bhola16/bazar-dor.git
```

### 2. Navigate to the Project Directory

```bash
cd bazar-dor
```

### 3. Install Dependencies

Install the required packages:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the environment variables required by your application.

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

The authentication configuration uses the MongoDB database named `bazar-dor07`, according to the current project configuration.

**Important:** Keep your database connection string and OAuth secrets private. Never commit `.env` files or credentials to GitHub.

### 5. Configure OAuth Providers

If you want to enable Google or GitHub sign-in:

1. Create an OAuth application with the relevant provider.
2. Obtain the client ID and client secret.
3. Configure the callback URL according to your Better Auth setup.
4. Add the required credentials to your environment variables.
5. Ensure the application URL matches your local or deployed environment.

OAuth sign-in will not work until the provider credentials and callback URLs are configured correctly.

### 6. Start the Development Server

Run:

```bash
npm run dev
```

### 7. Open the Application

Visit the following address in your browser:

[http://localhost:3000](http://localhost:3000)

The application should now be available locally.

---

## 📦 Production Build

To create an optimized production build, run:

```bash
npm run build
```

After the build completes successfully, start the production server:

```bash
npm run start
```

The application will run using the production build.

---

## 🔄 Application Flow

The main application flow is outlined below:

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

- Email and password.
- Google OAuth.
- GitHub OAuth.

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

For production deployments, use the appropriate production database and OAuth credentials. Never expose secrets through client-side code or commit them to a public repository.

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

- Dynamic product listings.
- Category-based browsing.
- Product detail pages.
- Market-price comparisons.
- Price increase tracking.
- Price decrease tracking.
- Category product sorting.
- Email and password authentication.
- Google sign-in.
- GitHub sign-in.
- User profile interface.
- MongoDB-backed authentication.
- Loading states.
- Toast notifications.
- Responsive layouts.
- Custom 404 page.
- TypeScript-based development.
- Next.js App Router.

---

## 🚀 Deployment

BazarDor is deployed using Vercel.

**Live application:** [https://bazar-dor-kohl.vercel.app/](https://bazar-dor-kohl.vercel.app/)

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Configure the production OAuth callback URLs if Google or GitHub authentication is enabled.
5. Deploy the application.
6. Verify the homepage, product pages, category pages, and authentication flows.

Remember that environment variables configured on your local machine are not automatically available in Vercel. Configure the required production values separately.

---

## 🐛 Troubleshooting

### 1. MongoDB Connection Errors

- Check that `MONGODB_URL` is correct.
- Confirm that your database is accessible.
- Verify your MongoDB network access and database permissions.

### 2. Google or GitHub Sign-In Is Not Working

- Verify the client ID and client secret.
- Check that the OAuth callback URL matches your authentication configuration.
- Confirm that the application URL is correct.

### 3. Product Information Is Missing

- Check your internet connection.
- Inspect the API response and browser network requests.
- Confirm that the relevant product or category information is available through the API.

### 4. Environment Variable Changes Are Not Applied

Restart the development server after editing your `.env` file.

```bash
# Stop the running server with Ctrl+C, then restart it
npm run dev
```

---

## 🤝 Contributing

Suggestions and improvements are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Test the application.
5. Submit a pull request.

Before submitting changes, verify that the project builds successfully.

```bash
npm run lint
npm run build
```

---

## 👨‍💻 Author

**Bholanath Bala**

- **GitHub:** [@bhola16](https://github.com/bhola16)
- **Project Repository:** [BazarDor](https://github.com/bhola16/bazar-dor)
- **Live Demo:** [bazar-dor-kohl.vercel.app](https://bazar-dor-kohl.vercel.app/)

---

## 📄 License

This project was created for educational purposes as part of the Programming Hero Web Development course.

---

⭐ **If you find BazarDor useful, consider visiting the live demo or exploring the project repository.**
