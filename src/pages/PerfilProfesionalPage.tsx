import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PerfilProfesionalPage() {
  const { institucion, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Colores dinámicos del servicio
  const primary = institucion?.colorinstitucion?.[0]?.color_primario || '#349433';
  const secondary = institucion?.colorinstitucion?.[0]?.color_secundario || '#00B9D1';
  // Estado y datos del carrusel
const [carouselIndex, setCarouselIndex] = useState(0);

// ⚠️ Ajusta las extensiones (.jpg/.png/.webp) según tus archivos reales en public/
const campoTrabajoImages = [
  { title: "Plantas de procesamiento de gas natural", img: "/plantas de procesamiento.jpg" },
  { title: "Refinerías de petróleo", img: "./refinierias de petroleo.jpg" },
  { title: "Industrias petroquímicas", img: "./industrias petroquimicas.jpg" },
  { title: "Empresas de hidrocarburos", img: "/empresa de hidrocarburos.jpg" },
  { title: "Organismos de regulación y control", img: "/organismos de regulacion.jpg" }
];

// Auto-avance cada 4 segundos
useEffect(() => {
  const timer = setInterval(() => {
    setCarouselIndex((prev) => (prev === campoTrabajoImages.length - 1 ? 0 : prev + 1));
  }, 4000);
  return () => clearInterval(timer);
}, []);

  // Auto-avance del carrusel de portadas
  useEffect(() => {
    if (!contenido?.portada || contenido.portada.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === (contenido.portada!.length - 1) ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [contenido?.portada]);

  if (loading) {
    return (
      <div style={styles.loadingBox}>
        <div style={styles.spinner}></div>
        <p style={{ color: '#666', marginTop: 16 }}>Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingBox}>
        <h2 style={{ color: '#dc2626', marginBottom: 8 }}>Error</h2>
        <p style={{ color: '#555' }}>{error}</p>
        <button style={styles.btn} onClick={() => (window.location.href = '/')}>
          Volver al Inicio
        </button>
      </div>
    );
  }

  // ✅ Helper para URLs de imágenes
  const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${path}`;
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .perfil-text { font-size: 1rem !important; line-height: 1.8 !important; }
        }
      `}</style>

      <Header data={institucion} />

      <main>
        {/* ==================== HERO SECTION CON CARRUSEL ==================== */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Carrusel de Portadas */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -2
          }}>
            {contenido?.portada && contenido.portada.length > 0 ? (
              contenido.portada.map((portada, index) => (
                <div
                  key={portada.portada_id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    zIndex: index === currentSlide ? 1 : 0
                  }}
                >
                  <img 
                    src={getImageUrl(portada.portada_imagen)}
                    alt={portada.portada_titulo || `Portada ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${primary}40 0%, ${secondary}40 100%)`
              }}></div>
            )}
          </div>

          {/* Overlay Oscuro */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: -1
          }}></div>

          {/* Contenido Central */}
          <div style={{
            textAlign: 'center',
            color: '#fff',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            animation: 'fadeInUp 1s ease-out',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Logo */}
            <div style={{
              width: '150px',
              height: '150px',
              margin: '0 auto 2rem',
              background: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              border: `5px solid ${primary}`,
              overflow: 'hidden'
            }}>
              {institucion?.institucion_logo ? (
                <img 
                  src={getImageUrl(institucion.institucion_logo)}
                  alt="Logo"
                  style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: '3rem', fontWeight: 800, color: primary }}>IGP</span>
              )}
            </div>

            {/* Título */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#FFD700',
              margin: '0 0 1rem',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              letterSpacing: '2px',
              lineHeight: 1.2,
              textTransform: 'uppercase'
            }}>
              {institucion?.institucion_nombre || 'Ingeniería de Gas y Petroquímica'}
            </h1>

            {/* Subtítulo */}
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: '#fff',
              margin: '0 0 2rem',
              fontWeight: 400,
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Perfil Profesional y Campo de Trabajo
            </p>

            {/* Botones */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="#perfil-content" 
                style={{
                  padding: '1rem 2.5rem',
                  background: primary,
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
              >
                Ver Perfil
              </a>
              <a 
                href="#contacto" 
                style={{
                  padding: '1rem 2.5rem',
                  background: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  border: `3px solid ${secondary}`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = secondary;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contactar
              </a>
            </div>

            {/* Indicadores del Carrusel */}
            {contenido?.portada && contenido.portada.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                marginTop: '3rem'
              }}>
                {contenido.portada.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: index === currentSlide ? '40px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: index === currentSlide ? primary : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Ir a portada ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================== PERFIL PROFESIONAL (DISEÑO MODERNO) ==================== */}
        <section id="perfil-content" style={{
          padding: '0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Gradientes de fondo */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%),
              radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)
            `,
            pointerEvents: 'none'
          }}></div>

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            
            {/* Header de la sección */}
            <div style={{
              textAlign: 'center',
              padding: '6rem 0 4rem',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: '#fff',
                marginBottom: '1rem',
                fontWeight: 800,
                letterSpacing: '-0.02em'
              }}>
                Perfil Profesional
              </h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                margin: '0 auto 1.5rem',
                borderRadius: '2px'
              }}></div>
              <p style={{
                fontSize: '1.2rem',
                color: '#94a3b8',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Conoce el perfil de nuestros profesionales y sus oportunidades laborales
              </p>
            </div>

            {/* PERFIL PROFESIONAL - Consumo de institucion_sobre_ins */}
            {institucion?.institucion_sobre_ins && (
              <div style={{
                padding: '4rem 0',
                animation: 'fadeInUp 0.6s ease-out 0.1s both'
              }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.75rem',
                    background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
                    color: '#fff',
                    borderRadius: '50px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    marginBottom: '2.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: `2px solid ${primary}80`,
                    boxShadow: `0 4px 20px ${primary}60, 0 0 40px ${primary}30`
                  }}>
                     Perfil del Profesional
                  </div>
                  
                  {/* Texto de Perfil Profesional - Consumo directo del servicio */}
                  <div 
                    className="perfil-text"
                    style={{
                      color: '#e2e8f0',
                      lineHeight: '2',
                      fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
                      textAlign: 'justify'
                    }}
                    dangerouslySetInnerHTML={{ __html: institucion.institucion_sobre_ins }}
                  />
                </div>
              </div>
            )}
{/* CAMPO DE TRABAJO - CARRUSEL FULL SCREEN */}
<div style={{
  position: 'relative',
  width: '100vw',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  animation: 'fadeInUp 0.6s ease-out 0.2s both'
}}>
  
  {/* Badge Flotante Superior */}
  <div style={{
    position: 'absolute',
    top: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 2rem',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    color: secondary,
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    border: `2px solid ${secondary}60`,
    boxShadow: `0 4px 20px ${secondary}40`
  }}>
    💼 Campo de Trabajo
  </div>

  {/* Contenedor Full Screen */}
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    
    {/* Track deslizante */}
    <div style={{
      display: 'flex',
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: `translateX(-${carouselIndex * 100}%)`
    }}>
      {campoTrabajoImages.map((item, idx) => (
        <div key={idx} style={{ 
          minWidth: '100vw', 
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Imagen completa en toda la pantalla */}
          <img 
            src={item.img} 
            alt={item.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',  /* Cambia a 'contain' si quieres ver la imagen completa sin recortes */
              display: 'block'
            }} 
          />
          
          {/* Overlay degradado suave */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, 
              rgba(10,10,10,0.3) 0%, 
              rgba(10,10,10,0.1) 40%, 
              rgba(10,10,10,0.7) 100%
            )`
          }}></div>

          {/* Contenido Centrado */}
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '90%',
            maxWidth: '900px',
            zIndex: 10
          }}>
            {/* Icono Check */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${idx % 2 === 0 ? primary : secondary}, ${idx % 2 === 0 ? primary : secondary}cc)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: '0 auto 2rem',
              boxShadow: `0 8px 30px ${idx % 2 === 0 ? primary : secondary}50`,
              border: '3px solid rgba(255,255,255,0.3)'
            }}>
              ✓
            </div>

            <h3 style={{ 
              color: '#fff', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              margin: '0 0 1rem', 
              lineHeight: 1.2,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>
              {item.title}
            </h3>
            
            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 400,
              margin: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              Área de Desarrollo Profesional
            </p>

            {/* Indicador de slide */}
            <div style={{
              marginTop: '2rem',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '2px'
            }}>
              {String(idx + 1).padStart(2, '0')} / {String(campoTrabajoImages.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Flechas de Navegación */}
    <button
      onClick={() => setCarouselIndex(prev => prev === 0 ? campoTrabajoImages.length - 1 : prev - 1)}
      style={{
        position: 'absolute', 
        top: '50%', 
        left: '2rem', 
        transform: 'translateY(-50%)',
        width: '60px', 
        height: '60px', 
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        color: '#fff', 
        border: `2px solid ${primary}60`, 
        cursor: 'pointer',
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
        transition: 'all 0.3s ease', 
        zIndex: 20
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = primary;
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      ❮
    </button>

    <button
      onClick={() => setCarouselIndex(prev => prev === campoTrabajoImages.length - 1 ? 0 : prev + 1)}
      style={{
        position: 'absolute', 
        top: '50%', 
        right: '2rem', 
        transform: 'translateY(-50%)',
        width: '60px', 
        height: '60px', 
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        color: '#fff', 
        border: `2px solid ${secondary}60`, 
        cursor: 'pointer',
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
        transition: 'all 0.3s ease', 
        zIndex: 20
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = secondary;
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      ❯
    </button>

    {/* Indicadores (Dots) en la parte inferior */}
    <div style={{
      position: 'absolute',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', 
      gap: '0.75rem', 
      zIndex: 20
    }}>
      {campoTrabajoImages.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCarouselIndex(idx)}
          style={{
            width: carouselIndex === idx ? '40px' : '10px',
            height: '10px',
            borderRadius: '5px',
            background: carouselIndex === idx 
              ? `linear-gradient(90deg, ${primary}, ${secondary})` 
              : 'rgba(255,255,255,0.4)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: carouselIndex === idx 
              ? `0 0 15px ${primary}60` 
              : 'none'
          }}
        />
      ))}
    </div>

  </div>
</div>
          </div>

          {/* Animaciones y responsive */}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @media (max-width: 768px) {
              #perfil-content { padding: 0 !important; }
              .perfil-text { font-size: 1rem !important; line-height: 1.8 !important; }
            }
          `}</style>
        </section>
      </main>

      <Footer data={institucion} />
    </div>
  );
}

// ESTILOS
const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  loadingBox: { 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    background: '#f8f9fa' 
  },
  spinner: { 
    width: '50px', 
    height: '50px', 
    border: '4px solid #f3f4f6', 
    borderTop: '4px solid #349433', 
    borderRadius: '50%', 
    animation: 'spin 1s linear infinite' 
  },
  btn: { 
    padding: '0.75rem 2rem', 
    background: '#349433', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: '600', 
    marginTop: '1rem',
    fontSize: '1rem' 
  }
};