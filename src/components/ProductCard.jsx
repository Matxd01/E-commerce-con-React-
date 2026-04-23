import { useState } from 'react'

// Componente reutilizable ProductCard (Template)
// Equivalente al ProductCard.vue — ahora en React con useState y props
// Props: product, isFavorite, onAdd, onToggleFav
function ProductCard({ product, isFavorite, onAdd, onToggleFav }) {

  // useState reemplaza el "data()" de Vue — maneja la talla seleccionada
  const [selectedSize, setSelectedSize] = useState('M')

  // Función que trunca la descripción (lógica separada de la vista)
  const shortDescription = () => {
    if (!product.description) return 'Producto obtenido desde API pública.'
    return product.description.length > 90
      ? product.description.slice(0, 90) + '...'
      : product.description
  }

  // Función para formatear precio en COP
  const formatMoney = (value) =>
    value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  // Manejo del evento "Agregar al carrito" — equivalente a handleAdd de Vue
  const handleAdd = () => {
    onAdd({ ...product, size: selectedSize })
  }

  return (
    <article className={`card${product.stock <= 0 ? ' card--out' : ''}${isFavorite ? ' is-fav' : ''}`}>

      {/* Top: badge + botón favorito */}
      <div className="card__top">
        <span className="badge">
          {product.badge ? product.badge : (product.stock > 0 ? 'API' : 'SOLD')}
        </span>
        {/* Botón de favorito — evento onClick equivalente a @click en Vue */}
        <button
          className="icon-btn"
          onClick={() => onToggleFav(product.id)}
          aria-label="Favorito"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      {/* Imagen del producto */}
      <div className="card__media">
        {product.image ? (
          <img
            className="card__img"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <div className="monogram">
            {product.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="card__body">
        <h3 className="card__title">{product.name}</h3>

        <div className="card__meta">
          <span className="price">{formatMoney(product.price)}</span>
          <span className="dot">•</span>
          <span className="muted">{product.category}</span>
        </div>

        <p className="muted" style={{ margin: '0 0 12px', lineHeight: 1.4 }}>
          {shortDescription()}
        </p>

        <div className="card__controls">
          {/* Selector de talla — onChange reemplaza v-model de Vue */}
          <div className="size">
            <label className="muted" htmlFor={`size-${product.id}`}>Talla</label>
            <select
              id={`size-${product.id}`}
              className="select select--mini"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          {/* Botón agregar al carrito */}
          <div className="actions">
            <button
              className="btn btn--accent btn--mini"
              disabled={product.stock <= 0}
              onClick={handleAdd}
            >
              {product.stock > 0 ? 'Agregar' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
