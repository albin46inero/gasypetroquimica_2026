import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MisionVisionPage() {
  const { institucion, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Colores dinámicos del servicio
  const primary = institucion?.colorinstitucion?.[0]?.color_primario || '#349433';
  const secondary = institucion?.colorinstitucion?.[0]?.color_secundario || '#00B9D1';

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
          .mv-content { padding: 1.5rem !important; }
          .mv-title { font-size: 1.8rem !important; }
          .mv-text { font-size: 1rem !important; }
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
              Conoce nuestra misión, visión y objetivos institucionales
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
{/* ==================== MISIÓN, VISIÓN Y OBJETIVOS (COLORES BRILLANTES) ==================== */}
<section id="mv-content" style={{
  padding: '0',
  background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* Gradientes de fondo - MÁS SUTILES */}
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
    
    {/* Header */}
    <div style={{
      textAlign: 'center',
      padding: '6rem 0 4rem',
      animation: 'fadeInUp 0.6s ease-out'
    }}>
      <h2 style={{
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        color: '#fff',
        marginBottom: '1rem',
        fontWeight: 800
      }}>
        Misión, Visión y Objetivos
      </h2>
      <div style={{
        width: '100px',
        height: '4px',
        background: `linear-gradient(90deg, ${primary}, ${secondary})`,
        margin: '0 auto 1.5rem',
        borderRadius: '2px'
      }}></div>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>
        Conoce los pilares que guían nuestra formación académica
      </p>
    </div>

    {/* MISIÓN */}
    {institucion?.institucion_mision && (
      <div style={{
        padding: '4rem 0',
        borderBottom: `1px solid ${primary}40`,
        animation: 'fadeInUp 0.6s ease-out 0.1s both'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Badge - COLORES BRILLANTES CON ALTA OPACIDAD */}
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
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: `2px solid ${primary}80`,
            boxShadow: `0 4px 20px ${primary}60, 0 0 40px ${primary}30`
          }}>
             Nuestra Misión
          </div>
          
          <div 
            className="mv-text"
            style={{
              color: '#e2e8f0',
              lineHeight: '2',
              fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
              textAlign: 'justify'
            }}
            dangerouslySetInnerHTML={{ __html: institucion.institucion_mision }}
          />
        </div>
      </div>
    )}

    {/* VISIÓN */}
    {institucion?.institucion_vision && (
      <div style={{
        padding: '4rem 0',
        borderBottom: `1px solid ${secondary}40`,
        animation: 'fadeInUp 0.6s ease-out 0.2s both'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Badge - COLORES BRILLANTES CON ALTA OPACIDAD */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.75rem',
            background: `linear-gradient(135deg, ${secondary}, ${secondary}cc)`,
            color: '#fff',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: 700,
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: `2px solid ${secondary}80`,
            boxShadow: `0 4px 20px ${secondary}60, 0 0 40px ${secondary}30`
          }}>
             Nuestra Visión
          </div>
          
          <div 
            className="mv-text"
            style={{
              color: '#e2e8f0',
              lineHeight: '2',
              fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
              textAlign: 'justify'
            }}
            dangerouslySetInnerHTML={{ __html: institucion.institucion_vision }}
          />
        </div>
      </div>
    )}

    {/* OBJETIVOS */}
    {institucion?.institucion_objetivos && (
      <div style={{
        padding: '4rem 0',
        animation: 'fadeInUp 0.6s ease-out 0.3s both'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Badge - COLORES BRILLANTES CON ALTA OPACIDAD */}
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
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: `2px solid ${primary}80`,
            boxShadow: `0 4px 20px ${primary}60, 0 0 40px ${primary}30`
          }}>
             Objetivos de la Carrera
          </div>
          
          <div 
            className="mv-text"
            style={{
              color: '#e2e8f0',
              lineHeight: '2',
              fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
              textAlign: 'justify'
            }}
            dangerouslySetInnerHTML={{ __html: institucion.institucion_objetivos }}
          />
        </div>
      </div>
    )}

  </div>

  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 768px) {
      .mv-text { font-size: 1rem !important; line-height: 1.8 !important; }
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