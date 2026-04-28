import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HistoriaPage() {
  const { institucion, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Colores dinámicos del servicio - Consumo correcto
  const primary = institucion?.colorinstitucion?.[0]?.color_primario || '#349433';
  const secondary = institucion?.colorinstitucion?.[0]?.color_secundario || '#00B9D1';

  // Auto-avance del carrusel
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

  // ✅ Helper para URLs de imágenes - Maneja URLs completas y relativas
  const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '';
    // Si ya es URL completa, retornarla tal cual
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Si es ruta relativa, construir URL completa
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
          .historia-content { padding: 1.5rem !important; }
          .historia-title { font-size: 1.8rem !important; }
          .historia-text { font-size: 1rem !important; }
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
          
          {/* Carrusel de Portadas - Consumo del servicio */}
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
            {/* Logo - Consumo del servicio */}
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

            {/* Título - Consumo del servicio */}
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
              Conoce nuestra historia, trayectoria y formación académica
            </p>

          
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

        {/* ==================== SECCIÓN DE HISTORIA CON DEGRADADOS ==================== */}
        <section id="historia-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* ✅ Gradientes de fondo decorativos con colores institucionales */}
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
            pointerEvents: 'none',
            zIndex: 0
          }}></div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Header de la sección */}
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: '#fff',
                marginBottom: '1rem',
                fontWeight: 800
              }}>
                Historia de la Carrera
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                margin: '0 auto 1.5rem',
                borderRadius: '2px'
              }}></div>
              <p style={{
                fontSize: '1.15rem',
                color: '#94a3b8',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Conoce nuestra trayectoria, logros y compromiso con la excelencia académica
              </p>
            </div>

            {/* ✅ Contenido de Historia - CON DEGRADADOS INSTITUCIONALES */}
            {institucion?.institucion_historia ? (
              <div className="historia-content" style={{
                background: `linear-gradient(135deg, ${primary}20, ${secondary}20)`,
                borderRadius: '20px',
                padding: '4rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                border: `2px solid ${primary}30`,
                animation: 'fadeInUp 0.6s ease-out 0.2s both',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}>
                {/* Elementos decorativos de fondo */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${primary}20 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${secondary}20 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}></div>

                {/* Icono/Badge con degradado */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 4px 15px ${primary}40`
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📚</span>
                  <span>Nuestra Historia</span>
                </div>

                {/* ✅ Texto de Historia - Consumo directo del servicio */}
                <div 
                  className="historia-text"
                  style={{
                    color: '#f1f5f9',
                    lineHeight: '2',
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    textAlign: 'justify',
                    position: 'relative',
                    zIndex: 1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}
                  dangerouslySetInnerHTML={{ __html: institucion.institucion_historia }}
                />

                {/* Línea decorativa inferior con degradado */}
                <div style={{
                  width: '100px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                  margin: '3rem auto 0',
                  borderRadius: '2px'
                }}></div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                border: `2px dashed ${primary}30`
              }}>
                <span style={{ fontSize: '5rem', opacity: 0.3, display: 'block', marginBottom: '1rem' }}>📚</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.75rem' }}>
                  No hay información de historia disponible
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                  Pronto publicaremos la historia de nuestra institución.
                </p>
              </div>
            )}
          </div>
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