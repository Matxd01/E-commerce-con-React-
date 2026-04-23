import { useState, useEffect, useRef, useMemo } from 'react'
import ProductCard from './components/ProductCard.jsx'
import Footer from './components/Footer.jsx'

// ─────────────────────────────────────────────
// Función utilitaria — separación lógica/vista
// ─────────────────────────────────────────────
const formatMoney = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

// ─────────────────────────────────────────────
// Componente principal App
// Equivalente al App.vue — ahora en React con useState / useEffect / useMemo
// ─────────────────────────────────────────────
function App() {

  // ── Estado de UI ─────────────────────────────
  // useState reemplaza el bloque "data()" de Vue
  const [theme, setTheme]           = useState('dark')
  const [accentIndex, setAccentIndex] = useState(0)
  const accents                       = ['#ff5a1f', '#ff7a00', '#ff3d2e']

  // ── Estado de filtros ─────────────────────────
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('all')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy]       = useState('featured')

  // ── Estado del carrito ────────────────────────
  const [cartOpen, setCartOpen]   = useState(false)
  const [cart, setCart]           = useState([])

  // ── Estado de productos (desde API) ──────────
  const [products, setProducts]   = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  // Ref para scroll (equivalente a $refs en Vue)
  const productsSectionRef = useRef(null)

  // ── Acento de color actual ────────────────────
  const accent = accents[accentIndex % accents.length]

  // ── Efectos secundarios — equivalente a mounted() y watch en Vue ──
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  useEffect(() => {
    fetchProducts()
  }, []) // [] = solo al montar, equivalente a mounted()

  // ── Fetch de productos desde API pública ─────
  // Lógica separada de la vista — función reutilizable
  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const [res1, res2, res3] = await Promise.all([
        fetch('https://dummyjson.com/products/category/mens-shirts'),
        fetch('https://dummyjson.com/products/category/mens-shoes'),
        fetch('https://dummyjson.com/products/category/womens-bags'),
      ])

      if (!res1.ok || !res2.ok || !res3.ok) throw new Error('Error en la API')

      const [data1, data2, data3] = await Promise.all([
        res1.json(), res2.json(), res3.json()
      ])

      const combined = [...data1.products, ...data2.products, ...data3.products]

      // Mapear los datos de la API al formato interno
      const mapped = combined.map((item, index) => ({
        id:          item.id,
        name:        item.title,
        category:    item.category,
        price:       Math.round(item.price * 4000),
        featured:    index + 1,
        stock:       item.stock,
        tags:        item.tags ?? [],
        badge:       item.stock === 0 ? 'SOLD' : index < 3 ? 'NEW' : '',
        image:       item.thumbnail,
        description: item.description ?? '',
      }))

      setProducts(mapped)
    } catch (err) {
      setError('Hubo un problema cargando la API pública.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ── Productos filtrados — useMemo reemplaza "computed" de Vue ──
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()

    const list = products.filter((p) => {
      const matchCategory = category === 'all' || p.category === category
      const matchStock    = !onlyInStock || p.stock > 0
      const matchSearch   =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)

      return matchCategory && matchStock && matchSearch
    })

    // Ordenamiento dinámico
    switch (sortBy) {
      case 'priceAsc':  list.sort((a, b) => a.price - b.price);   break
      case 'priceDesc': list.sort((a, b) => b.price - a.price);   break
      case 'nameAsc':   list.sort((a, b) => a.name.localeCompare(b.name)); break
      default:          list.sort((a, b) => a.featured - b.featured)
    }

    return list
  }, [products, search, category, onlyInStock, sortBy])

  // ── Computed del carrito ──────────────────────
  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0)
  const cartTotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0)
  const shippingCost = cartTotal >= 250000 || cartTotal === 0 ? 0 : 12000

  // ── Funciones del carrito ─────────────────────
  const addToCart = (product) => {
    if (product.stock <= 0) return
    setCart(prev => {
      const found = prev.find(it => it.id === product.id && it.size === product.size)
      if (found) {
        // Ya existe: incrementar cantidad si hay stock
        return prev.map(it =>
          it.id === product.id && it.size === product.size
            ? { ...it, qty: Math.min(it.qty + 1, product.stock) }
            : it
        )
      }
      // Nuevo item
      return [...prev, { ...product, qty: 1, size: product.size || 'M' }]
    })
  }

  const incQty = (productId) => {
    const productData = products.find(p => p.id === productId)
    setCart(prev =>
      prev.map(it =>
        it.id === productId && productData && it.qty < productData.stock
          ? { ...it, qty: it.qty + 1 }
          : it
      )
    )
  }

  const decQty = (productId) => {
    setCart(prev =>
      prev
        .map(it => it.id === productId ? { ...it, qty: it.qty - 1 } : it)
        .filter(it => it.qty > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(it => it.id !== productId))
  }

  const clearCart = () => setCart([])

  const checkout = () => {
    alert(`Compra simulada ✅\nTotal: ${formatMoney(cartTotal + shippingCost)}`)
    clearCart()
    setCartOpen(false)
  }

  // ── Funciones de UI ───────────────────────────
  const toggleFav = (productId) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(productId) ? next.delete(productId) : next.add(productId)
      return next
    })
  }

  const resetFilters = () => {
    setSearch('')
    setCategory('all')
    setOnlyInStock(false)
    setSortBy('featured')
  }

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ─────────────────────────────────────────────
  // JSX — equivalente al <template> de Vue
  // ─────────────────────────────────────────────
  return (
    <div id="app">

      {/* ── NAVBAR ─────────────────────────── */}
      <header className="topbar">
        <div className="container topbar__inner">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true"></div>
            <div>
              <div className="brand__name">API STORE</div>
              <div className="brand__tag">Catálogo de productos con React y API pública</div>
            </div>
          </div>

          <div className="topbar__actions">
            {/* Botón de cambio de tema */}
            <button className="btn btn--ghost" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☾ Dark' : '☼ Light'}
            </button>

            {/* Botón del carrito con contador de productos */}
            <button className="btn btn--accent" onClick={() => setCartOpen(true)}>
              Cart
              <span className="pill">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1>Catálogo interactivo consumiendo una API pública.</h1>
            <p>
              Aplicación desarrollada en <b>React.js</b> que consulta productos en tiempo real
              desde una <b>API pública</b> y los muestra en una interfaz moderna y responsive.
            </p>
            <div className="hero__cta">
              <button className="btn btn--accent" onClick={scrollToProducts}>Ver productos</button>
              <button className="btn btn--ghost" onClick={() => setAccentIndex(i => i + 1)}>Cambiar acento</button>
            </div>
            <div className="chips">
              <span className="chip">API pública</span>
              <span className="chip">Diseño responsive</span>
              <span className="chip">Carrito interactivo</span>
            </div>
          </div>

          {/* Panel de estadísticas en tiempo real — se actualiza con useState */}
          <div className="hero__panel">
            <div className="stat">
              <div className="stat__label">Selección</div>
              <div className="stat__value">{filteredProducts.length} productos</div>
            </div>
            <div className="stat">
              <div className="stat__label">En carrito</div>
              <div className="stat__value">{cartCount} items</div>
            </div>
            <div className="stat">
              <div className="stat__label">Total</div>
              <div className="stat__value">{formatMoney(cartTotal)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTROS / CONTROLES ─────────────── */}
      <section className="controls" ref={productsSectionRef}>
        <div className="container controls__inner">
          {/* Buscador — onChange reemplaza v-model de Vue */}
          <div className="search">
            <input
              className="input"
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            {/* Filtros por categoría */}
            {['all', 'mens-shirts', 'mens-shoes', 'womens-bags'].map((cat) => (
              <button
                key={cat}
                className={`seg${category === cat ? ' seg--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {{ all: 'Todo', 'mens-shirts': 'Camisas', 'mens-shoes': 'Zapatos', 'womens-bags': 'Bolsos' }[cat]}
              </button>
            ))}

            {/* Checkbox solo con stock */}
            <label className="check">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <span>Solo stock</span>
            </label>

            {/* Selector de orden */}
            <select
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Destacados</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="nameAsc">Nombre A–Z</option>
            </select>
          </div>
        </div>

        <div className="container results-bar">
          <p className="muted">Mostrando {filteredProducts.length} producto(s)</p>
        </div>
      </section>

      {/* ── GRID DE PRODUCTOS ──────────────── */}
      <main className="products">
        <div className="container">
          {/* Estado de carga */}
          {loading && (
            <div className="empty">
              <h3>Cargando productos...</h3>
              <p>Espera un momento mientras consultamos la API pública.</p>
            </div>
          )}

          {/* Estado de error */}
          {error && (
            <div className="empty">
              <h3>Error al cargar productos</h3>
              <p>{error}</p>
              <button className="btn btn--ghost" onClick={fetchProducts}>Reintentar</button>
            </div>
          )}

          {/* Grid de productos — renderizado dinámico con .map() */}
          {!loading && !error && (
            <div className="grid">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={favorites.has(p.id)}
                  onAdd={addToCart}
                  onToggleFav={toggleFav}
                />
              ))}
            </div>
          )}

          {/* Estado vacío */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="empty">
              <h3>No hay productos con ese filtro.</h3>
              <p>Prueba cambiando categoría o buscando otra palabra.</p>
              <button className="btn btn--ghost" onClick={resetFilters}>Reset filtros</button>
            </div>
          )}
        </div>
      </main>

      {/* ── CARRITO (Drawer lateral) ────────── */}
      {cartOpen && (
        <div className="drawer-backdrop" onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}>
          <aside className="drawer">

            {/* Header del carrito */}
            <div className="drawer__top">
              <h2>Tu carrito</h2>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Cerrar">✕</button>
            </div>

            {/* Lista de productos en el carrito */}
            <div className="drawer__content">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <p>Tu carrito está vacío.</p>
                  <button className="btn btn--accent" onClick={() => setCartOpen(false)}>
                    Explorar productos
                  </button>
                </div>
              ) : (
                <div className="cart-list">
                  {/* Renderizado dinámico de los items del carrito */}
                  {cart.map((item) => (
                    <div className="cart-item" key={`${item.id}-${item.size}`}>
                      <div className="cart-item__thumb">
                        {item.image ? (
                          <img className="cart-item__img" src={item.image} alt={item.name} loading="lazy" />
                        ) : (
                          <span aria-hidden="true">{item.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="cart-item__info">
                        <div className="cart-item__name">
                          {item.name}
                          {item.size && <span className="mini">• Talla {item.size}</span>}
                        </div>
                        <div className="cart-item__meta">
                          <span className="price">{formatMoney(item.price)}</span>
                          <span className="dot">•</span>
                          <span className="muted">x{item.qty}</span>
                        </div>
                        {/* Controles de cantidad */}
                        <div className="qty">
                          <button className="qty__btn" onClick={() => decQty(item.id)}>−</button>
                          <span className="qty__num">{item.qty}</span>
                          <button className="qty__btn" onClick={() => incQty(item.id)}>+</button>
                          <button className="link danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer del carrito con totales y acciones */}
            <div className="drawer__bottom">
              <div className="summary">
                <div className="row">
                  <span className="muted">Subtotal</span>
                  <b>{formatMoney(cartTotal)}</b>
                </div>
                <div className="row">
                  <span className="muted">Envío</span>
                  <b>{formatMoney(shippingCost)}</b>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <b>{formatMoney(cartTotal + shippingCost)}</b>
                </div>
              </div>

              <button className="btn btn--accent btn--full" disabled={cart.length === 0} onClick={checkout}>
                Comprar ahora
              </button>
              <button className="btn btn--ghost btn--full" disabled={cart.length === 0} onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>

          </aside>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
