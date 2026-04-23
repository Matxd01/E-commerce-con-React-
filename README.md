# API Store — Fashion E-commerce

A modern, interactive e-commerce catalog built with **React + Vite** that fetches real-time product data from a public REST API. Features a fully functional shopping cart, dynamic filters, and a dark/light theme system.

🔗 **Live Demo:** [https://e-commerce-con-react-.vercel.app](https://e-commerce-con-react-.vercel.app)

---

## Tech Stack

- **React 18** — Component-based UI with hooks
- **Vite 5** — Lightning-fast development and build tool
- **JavaScript ES6+** — Arrow functions, destructuring, async/await, spread operator
- **CSS Variables** — Dynamic dark/light theming without external libraries
- **DummyJSON API** — Free public REST API for product data

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Matxd01/E-commerce-con-React-.git
cd E-commerce-con-React-

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Root component — state & logic
    ├── style.css             # Global styles & CSS variables
    └── components/
        ├── ProductCard.jsx   # Reusable product card template
        └── Footer.jsx        # Reusable footer component
```

---

## Features

- **Product catalog** — 15+ products loaded from a public API with image, name, price, description and category
- **Reusable components** — `ProductCard`, `Footer` and `Navbar` as independent templates
- **Shopping cart** — Add items with size selection, adjust quantities, remove items, shipping cost calculation
- **Real-time filters** — Search by keyword, filter by category, stock-only toggle, and sorting options
- **Dynamic theming** — Dark / Light mode and switchable accent colors via CSS Variables
- **Fully responsive** — Adaptive grid layout for mobile, tablet and desktop

---

## API Reference

Data is fetched from **[DummyJSON](https://dummyjson.com)** — a free, open REST API.

| Endpoint | Description |
|---|---|
| `GET /products/category/mens-shirts` | Men's shirts |
| `GET /products/category/mens-shoes` | Men's shoes |
| `GET /products/category/womens-bags` | Women's bags |

---

## License

This project was built for academic purposes. Feel free to use it as a reference.
