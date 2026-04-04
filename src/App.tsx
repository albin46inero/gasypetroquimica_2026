import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="container nav">
          <div className="logo">ADMINISTRACION DE EMPRESAS<span>UNIV</span></div>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#sobre">Sobre la Carrera</a></li>
            <li><a href="#plan">Plan de Estudios</a></li>
            <li><a href="#perfil">Perfil Profesional</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <button className="btn btn-primary">Postularme</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>Entiende el presente, <br /><span className="text-accent">transforma</span> el futuro.</h1>
            <p>La Licenciatura en Sociología te brinda las herramientas críticas para analizar y liderar procesos de cambio social en un mundo globalizado.</p>
            <div className="hero-btns">
              <a href="#plan" className="btn btn-primary">Ver Plan de Estudios</a>
              <a href="#sobre" className="btn btn-outline">Saber Más</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-shape-1"></div>
            <div className="hero-shape-2"></div>
            <div className="hero-card">
              <div className="card-inner">
                <span>+150</span>
                <p>Investigaciones Activas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="about bg-light">
        <div className="container">
          <div className="grid grid-2">
            <div className="about-text">
              <h2 className="section-title text-left">¿Qué es la Sociología?</h2>
              <p>Es la disciplina que estudia el comportamiento de las sociedades, los grupos y los individuos en su contexto social. Como sociólogo, desarrollarás una "imaginación sociológica" que te permitirá ver lo general en lo particular y lo extraño en lo familiar.</p>
              <div className="stats grid grid-3">
                <div className="stat">
                  <h3>4 Años</h3>
                  <p>Duración</p>
                </div>
                <div className="stat">
                  <h3>32</h3>
                  <p>Asignaturas</p>
                </div>
                <div className="stat">
                  <h3>85%</h3>
                  <p>Empleabilidad</p>
                </div>
              </div>
            </div>
            <div className="about-image-placeholder">
              <div className="placeholder-pattern"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="plan" className="curriculum">
        <div className="container">
          <h2 className="section-title">Ejes Formativos</h2>
          <div className="grid grid-3">
            <div className="card">
              <h3>Teoría Social</h3>
              <p>Desde los clásicos hasta las corrientes contemporáneas, para entender las bases del pensamiento social.</p>
            </div>
            <div className="card">
              <h3>Metodología</h3>
              <p>Herramientas cuantitativas y cualitativas para la investigación y el análisis de datos complejos.</p>
            </div>
            <div className="card">
              <h3>Políticas Públicas</h3>
              <p>Diseño, gestión y evaluación de proyectos de intervención social en el sector público y privado.</p>
            </div>
            <div className="card">
              <h3>Sociología Urbana</h3>
              <p>Análisis de las dinámicas de las grandes ciudades y sus desafíos habitacionales y de transporte.</p>
            </div>
            <div className="card">
              <h3>Género y Diversidad</h3>
              <p>Estudios sobre las desigualdades estructurales y la construcción de identidades modernas.</p>
            </div>
            <div className="card">
              <h3>Medio Ambiente</h3>
              <p>La relación entre sociedad y naturaleza frente a la crisis climática global.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="perfil" className="profile bg-dark">
        <div className="container">
          <h2 className="section-title text-white">¿Dónde podrás trabajar?</h2>
          <div className="grid grid-4">
            <div className="profile-item">
              <div className="icon">🏛️</div>
              <h4>Sector Público</h4>
              <p>Organismos gubernamentales y ministerios.</p>
            </div>
            <div className="profile-item">
              <div className="icon">🌍</div>
              <h4>Organismos Int.</h4>
              <p>ONU, UNESCO y ONG globales.</p>
            </div>
            <div className="profile-item">
              <div className="icon">📊</div>
              <h4>Consultoría</h4>
              <p>Análisis de mercado y tendencias sociales.</p>
            </div>
            <div className="profile-item">
              <div className="icon">🎓</div>
              <h4>Investigación</h4>
              <p>Centros de estudios y universidades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact">
        <div className="container">
          <div className="contact-card">
            <div className="contact-info">
              <h2>¿Listo para empezar?</h2>
              <p>Déjanos tus datos y un asesor te contactará para brindarte más información sobre el proceso de admisión.</p>
              <div className="contact-details">
                <p>📍 Av. de las Ciencias 123</p>
                <p>📞 +54 11 4567 8900</p>
                <p>📧 info@sociologia-univ.edu</p>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Nombre completo" />
              <input type="email" placeholder="Correo electrónico" />
              <select>
                <option value="">Modalidad de interés</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
              <textarea placeholder="Tu mensaje o consulta"></textarea>
              <button className="btn btn-primary">Enviar Consulta</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">SOCIOLOGÍA<span>UNIV</span></div>
              <p>Comprometidos con la excelencia académica y la justicia social desde 1995.</p>
            </div>
            <div className="footer-links">
              <h4>Navegación</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#plan">Plan</a></li>
                <li><a href="#perfil">Perfil</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h4>Síguenos</h4>
              <div className="social-icons">
                <span>In</span> <span>Tw</span> <span>Ig</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Universidad Nacional de Sociología. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
