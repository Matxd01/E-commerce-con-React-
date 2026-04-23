// Componente reutilizable Footer
// Mantiene la estética del proyecto con variables CSS del tema dark/light
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Marca */}
        <div className="footer__brand">
          <div className="footer__brand-top">
            <div className="brand__mark" aria-hidden="true"></div>
            <span className="footer__name">API STORE</span>
          </div>
          <p className="footer__desc">
            Catálogo interactivo de ropa desarrollado con <b>React + Vite</b>,
            consumiendo una API pública en tiempo real.
          </p>
          <div className="footer__chips">
            <span className="chip">React 18</span>
            <span className="chip">Vite 5</span>
            <span className="chip">JavaScript ES6+</span>
            <span className="chip">API pública</span>
          </div>
        </div>

        {/* Links de categorías */}
        <div className="footer__col">
          <h4 className="footer__col-title">Categorías</h4>
          <ul className="footer__list">
            <li>Camisas</li>
            <li>Zapatos</li>
            <li>Bolsos</li>
            <li>Todo el catálogo</li>
          </ul>
        </div>

        {/* Info del proyecto */}
        <div className="footer__col">
          <h4 className="footer__col-title">Proyecto</h4>
          <ul className="footer__list">
            <li>
              <a
                href="https://github.com/Matxd01/Tienda-mateo-API"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href="https://dummyjson.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                API: DummyJSON ↗
              </a>
            </li>
            <li>Diseño responsive</li>
            <li>Tema Dark / Light</li>
          </ul>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="muted">© {year} API Store — Proyecto académico</span>
          <span className="muted">Desarrollado con React + Vite ·</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
