# 🛍️ API Store — Tienda de Ropa

Aplicación web tipo **e-commerce** desarrollada con **React + Vite** que consulta productos en tiempo real desde una API pública y los presenta en una interfaz moderna, responsive e interactiva.

🔗 **Deploy en Vercel:** [URL del deploy — agregar después]  
📁 **Repositorio:** [https://github.com/Matxd01/Tienda-mateo-API](https://github.com/Matxd01/Tienda-mateo-API)

---

## 🚀 Tecnologías utilizadas

- **React 18** — Librería principal para construir la interfaz con componentes
- **Vite 5** — Herramienta de desarrollo y build ultrarrápida
- **JavaScript ES6+** — Funciones flecha, destructuring, async/await, spread, map/filter
- **CSS Variables** — Sistema de tema dark/light dinámico sin librerías externas
- **DummyJSON API** — API pública gratuita que provee los datos de productos

---

## 📦 Instalación y uso local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Matxd01/Tienda-mateo-API.git
cd Tienda-mateo-API

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

---

## 🏗️ Estructura del proyecto

```
src/
├── components/
│   ├── ProductCard.jsx   # Tarjeta de producto — componente reutilizable (template)
│   └── Footer.jsx        # Pie de página — componente reutilizable
├── App.jsx               # Componente principal con toda la lógica de estado
├── main.jsx              # Punto de entrada de la aplicación React
└── style.css             # Estilos globales con variables CSS (tema dark/light)
```

---

## ✅ Funcionalidades implementadas

### Vista de productos
- Más de 15 productos cargados desde dummyjson.com
- Cada producto muestra: imagen, nombre, precio, descripción y categoría

### Componentes reutilizables
- ProductCard — template independiente para cada producto
- Footer — componente de pie de página
- Navbar — barra superior con carrito y tema

### Lógica y funciones (ES6+)
- useState — estado del carrito, filtros, tema
- useEffect — llamada a la API al montar
- useMemo — filtrado eficiente de productos
- Funciones para filtrar, ordenar y buscar en tiempo real

### Carrito de compras
- Agregar productos con talla seleccionada
- Badge contador en navbar
- Controles de cantidad y eliminar
- Cálculo de subtotal, envío y total

### UI y navegación
- Filtros por categoría y búsqueda en tiempo real
- Tema Dark / Light
- Diseño 100% responsive

---

## 🌐 API utilizada

**DummyJSON** (https://dummyjson.com) — API REST pública y gratuita

---

## 📊 Rúbrica cubierta

| Criterio | Puntos |
|---|---|
| Estructura React + Vite | 15 pts |
| Componentes reutilizables | 20 pts |
| Lógica y funciones ES6+ | 20 pts |
| Funcionalidad e-commerce | 20 pts |
| Diseño responsive | 10 pts |
| Deploy Vercel | 5 pts |
| Repositorio GitHub | 5 pts |
| Creatividad | 5 pts |
