🛒 বাজার দর | BazarDor
BazarDor (বাজার দর) is a responsive Bengali web application that helps users explore daily market prices in Bangladesh. Browse products by category, compare prices across markets, and check which products have become more or less expensive.
🌐 Live Demo
Live Website: https://bazar-dor-kohl.vercel.app/
GitHub Repository: https://github.com/bhola16/bazar-dor
✨ Key Features
Today's Market Prices — Browse everyday products and view their current prices in Bangladeshi taka.
Category-Based Browsing — Explore products through category navigation.
Price Change Tracking — See products whose prices have increased or decreased, with percentage changes.
Market-by-Market Comparison — View minimum, maximum, and average prices for available markets and divisions on product detail pages.
Product Details — Open individual product pages to review today's price, yesterday's price, and other available price information.
Authentication — Create an account or sign in using email and password, Google, or GitHub.
Profile Management — View account details and update the profile name.
Responsive Bengali Interface — Use the site across desktop and mobile screen sizes.
🧰 Technologies Used
Next.js 16 — App Router and server-rendered React application
React 19 — User interface
TypeScript — Type-safe application code
Tailwind CSS 4 — Styling and responsive layouts
DaisyUI — UI styling components
Better Auth — Authentication and session management
MongoDB / Mongoose — Database integration
React Toastify — Toast notifications
Lucide React & React Icons — Icons
REST API — Product, category, and market-price data
🚀 Getting Started
Prerequisites
Node.js
npm
Access to the required API and authentication environment variables
Installation
Clone the repository:

```bash
   git clone https://github.com/bhola16/bazar-dor.git
```

Move into the project directory:

```bash
   cd bazar-dor
```

Install dependencies:

```bash
   npm install
```

Create a `.env.local` file in the project root and configure the environment variables required by the authentication setup:

```env
   MONGODB_URL=your_mongodb_connection_string
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the example values with your own credentials. Configure the OAuth provider callback URLs to match your local or deployed application URL. Never commit real secrets to GitHub.
Start the development server:

```bash
   npm run dev
```

Open http://localhost:3000 in your browser.
📜 Available Scripts
Command Description
`npm run dev` Start the development server
`npm run build` Build the application for production
`npm run start` Start the production server
`npm run lint` Run ESLint
👨‍💻 Author
Bhola Bala
GitHub: https://github.com/bhola16
Repository: https://github.com/bhola16/bazar-dor

---

Making daily market-price information easier to access in Bangladesh. 🇧🇩
