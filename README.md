# QuickCart — User Panel (Storefront)

Customer-facing e-commerce web app for browsing products, cart, wishlist, checkout, orders, and account management.

> Requires the [QuickCart Backend Server](https://github.com/RajChavda04/QuickCart-Backend) to be running.

---

## Tech Stack

| Technology | Version / Notes |
|------------|-----------------|
| **React** | 19.x |
| **Create React App** | `react-scripts` 5.0.1 |
| **React Router DOM** | 7.x — routing & protected routes |
| **Axios** | API communication |
| **Tailwind CSS** | Utility styling (hero, layouts) |
| **Swiper** | Product & category sliders |
| **SweetAlert2** | Notifications & alerts |
| **Razorpay** | Online payment at checkout |
| **html2canvas + jsPDF** | Download order invoice as PDF |
| **Session Storage** | User login session |
| **Local Storage** | Cart items check for checkout route |

---

## Features

### Home & Shopping
- **Home** (`/`) — Hero banner, categories (Swiper), featured products, store stats
- **Shop** (`/Shope`) — Browse all categories
- **Shop by Category** (`/Shopgrid`) — Products filtered by category
- **Product Details** (`/Productdetails`) — Single product view, add to cart/wishlist
- **Search** (`/Search`) — Search products by name from navbar

### Cart & Wishlist
- **Cart** (`/Cart`) — View items, update quantity, remove products, proceed to checkout
- **Wishlist** (`/Wish`) — Save products, move to cart, remove items

### Checkout & Orders
- **Checkout** (`/Checkout2`) — Shipping details, payment (Razorpay / COD)
- **Place Order** — Saves order, clears cart, sends confirmation email
- **My Orders** (`/Order`) — Order history with status
- **Invoice** (`/Invoice`) — View & download PDF invoice

### User Account
- **Register** (`/Register`) — New customer signup
- **Login** (`/Login`) — Email & password (blocked users see admin message)
- **Forgot Password** (`/Forgot`) — Password emailed via backend
- **Profile** (`/Userprofile`) — View account details
- **Update Profile** (`/Update`) — Edit name, email, phone, address
- **Change Password** (`/Changepass`) — Update password

### Other
- **Contact** (`/Contact`) — Contact page & feedback form
- **Navbar** — Search, cart, wishlist, orders, profile links
- **Category dropdown** — Quick navigation from header

---

## How It Works

1. User browses products → data loaded from Server APIs (`/api/categorylist`, `/api/productlist`, etc.).
2. **Add to cart** → `POST /api/cartadd` (requires login for protected actions).
3. **Checkout** → User fills address → Razorpay (online) or COD → `POST /api/pay` creates order.
4. Server reduces stock, clears cart, sends **Nodemailer** emails.
5. User views orders & downloads **PDF invoice** via html2canvas + jsPDF.
6. **ProtectedRoute** guards profile, checkout (with cart check), invoice, and password pages.

```
┌─────────────┐     HTTP (Axios)      ┌─────────────┐     MySQL      ┌──────────┐
│ User Panel  │ ───────────────────► │   Server    │ ◄────────────► │ Database │
│  (React)    │ ◄─────────────────── │  (Express)  │                └──────────┘
└─────────────┘                       └─────────────┘
       │
       └── Razorpay (payment gateway)
```

---

## Project Structure

```
user/
├── public/
│   └── assets/          # CSS, JS, images, theme assets
├── src/
│   ├── App.js           # Routes & layout
│   ├── Components/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── Pages/
│   │   ├── Home.js
│   │   ├── Shope.js
│   │   ├── Shopgrid.js
│   │   ├── Productdetails.js
│   │   ├── Search.js
│   │   ├── Cart.js
│   │   ├── Wish.js
│   │   ├── Checkout2.js
│   │   ├── Order.js
│   │   ├── Invoice.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ...
│   ├── config/
│   │   └── apiConfig.js
│   ├── utils/
│   │   └── PublicRoute.js
│   └── SearchContext.js
├── tailwind.config.js
├── package.json
├── .env
└── docs/
    └── screenshots/       # Add your screenshots here
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- **QuickCart Server** running ([Server repo](https://github.com/RajChavda04/QuickCart-Backend))
- **Razorpay account** (for online payments — test keys work in development)

---

## Installation (From GitHub)

### 1. Clone the repository

```bash
git clone https://github.com/RajChavda04/QuickCart-User-Panel.git
cd QuickCart-User-Panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:1337

# Razorpay (get keys from https://dashboard.razorpay.com/)
REACT_APP_RAZORPAY_KEY=rzp_test_your_key_here
REACT_APP_RAZORPAY_EMAIL=your-email@example.com
REACT_APP_RAZORPAY_CONTACT=your-phone-number
```

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend server URL |
| `REACT_APP_RAZORPAY_KEY` | Razorpay Key ID (test or live) |
| `REACT_APP_RAZORPAY_EMAIL` | Email shown on Razorpay checkout |
| `REACT_APP_RAZORPAY_CONTACT` | Contact on Razorpay checkout |

### 4. Set up the database (one-time)

The user panel uses the same database as the backend.

1. Install [XAMPP](https://www.apachefriends.org/) and start **MySQL**
2. Open **phpMyAdmin** → http://localhost/phpmyadmin
3. Import: [`QuickCart-Backend/database/quickcart.sql`](https://github.com/RajChavda04/QuickCart-Backend/blob/main/database/quickcart.sql)

Full table schema and field list: [Backend README — Database Schema](https://github.com/RajChavda04/QuickCart-Backend#database-schema)

### 5. Start the backend server first

In the **Server** project:

```bash
npm run dev
```

### 6. Run the user panel

```bash
npm start
```

Opens at: **http://localhost:3000**

> If Admin panel also runs on 3000, start Admin on port **3001** instead (see Admin README).

### 7. Create an account & shop

1. Go to **Register** → create a customer account.
2. Browse products → add to cart → checkout.
3. View orders under **My Orders**.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server (port 3000) |
| `npm run build` | Production build to `build/` |
| `npm test` | Run tests |
| `npm run eject` | Eject from CRA (irreversible) |

---

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/Login` | Login | Public (redirect if logged in) |
| `/Register` | Register | Public |
| `/Forgot` | Forgot Password | Public |
| `/Product` | Products | Public |
| `/Shope` | Shop Categories | Public |
| `/Shopgrid` | Category Products | Public |
| `/Productdetails` | Product Detail | Public |
| `/Search` | Search Results | Public |
| `/Contact` | Contact & Feedback | Public |
| `/Cart` | Shopping Cart | Public* |
| `/Wish` | Wishlist | Public* |
| `/Checkout2` | Checkout | Login + cart required |
| `/Order` | My Orders | Public* |
| `/Invoice` | Invoice PDF | Protected |
| `/Userprofile` | Profile | Public* |
| `/Update` | Edit Profile | Protected |
| `/Changepass` | Change Password | Protected |

\*Cart/wishlist actions typically need login; some pages work without login but API calls require authentication.

---

## Full Local Setup (All 3 Projects)

| Order | Project | Command | URL |
|-------|---------|---------|-----|
| 1 | Server | `npm run dev` | http://localhost:1337 |
| 2 | Admin | `PORT=3001 npm start` | http://localhost:3001 |
| 3 | User | `npm start` | http://localhost:3000 |

---

## Screenshots

> Images hosted on Cloudinary. If preview is blank in Cursor/VS Code, see [Preview not showing?](#preview-not-showing) below.

### Home Page

![Home](https://res.cloudinary.com/dmuedtbcs/image/upload/v1780036805/home_uec052.png)

### Shop / Categories

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037359/shop_dvmb19.png" alt="Shop" width="900"/>
</p>

### Product Details

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037187/productdetail_igcof0.png" alt="Product Details" width="900"/>
</p>

### Shopping Cart

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037186/cart_nqcf5i.png" alt="Cart" width="900"/>
</p>

### Wishlist

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037414/wish_tpbw1r.png" alt="Wishlist" width="900"/>
</p>

### Checkout

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037186/checkout_f8mefl.png" alt="Checkout" width="900"/>
</p>

### My Orders

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037187/orderdetail_yywdy2.png" alt="Orders" width="900"/>
</p>

### Invoice

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037549/invoice_xainyw.png" alt="Invoice" width="900"/>
</p>

### Login & Register

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037186/login_b2hhyo.png" alt="Login" width="900"/>
</p>

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037187/register_xqywmq.png" alt="Register" width="900"/>
</p>

### User Profile

<p align="center">
  <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1780037187/register_xqywmq.png" alt="User Profile" width="900"/>
</p>

> Replace the Profile image URL above when you upload a dedicated profile screenshot to Cloudinary.

### Preview not showing?

Your Cloudinary links are valid. If images do not appear in **Cursor / VS Code** markdown preview:

1. Open **Settings** (`Ctrl + ,`) → search `markdown.preview.security`
2. Set **Markdown › Preview: Security Level** to `disabled`
3. Close and reopen the preview (`Ctrl + Shift + V`)

Or push to GitHub — images will show on the repo README page in the browser.


---

## Deployment

1. Set production values in `.env` (API URL + live Razorpay keys).
2. Build:

```bash
npm run build
```

3. Deploy `build/` to Vercel, Netlify, etc.
4. Add deployed URL to Server `.env` as `FRONTEND_USER_URL`.

---

## Related Repositories

- [QuickCart Backend Server](https://github.com/RajChavda04/QuickCart-Backend)
- [QuickCart Admin Panel](https://github.com/RajChavda04/QuickCart-Admin-Panel)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Products not loading | Start Server; check `REACT_APP_API_URL` |
| Login says account blocked | Admin blocked user — unblock in Admin → Customers |
| Razorpay not opening | Verify `REACT_APP_RAZORPAY_KEY` is a valid test/live key |
| Checkout redirects to cart | Add items to cart first; cart stored in DB + localStorage |
| Images broken | Server must be running; images served from Server `public/` |

---

## Author

**Raj Chavda**
