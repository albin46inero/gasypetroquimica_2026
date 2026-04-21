import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AutoridadesPage() {
  const { institucion, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Colores dinámicos del servicio
  const primary = institucion?.colorinstitucion?.[0]?.color_primario || '#349433';
  const secondary = institucion?.colorinstitucion?.[0]?.color_secundario || '#00B9D1';

  // Auto-avance del carrusel
  useEffect(() => {
    if (!contenido?.portada || contenido.portada.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev === (contenido.portada!.length - 1) ? 0 : prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [contenido?.portada]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #f3f4f6', borderTop: `4px solid ${primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: '#666', marginTop: 16 }}>Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <h2 style={{ color: '#dc2626', marginBottom: 8 }}>Error</h2>
        <p style={{ color: '#555' }}>{error}</p>
        <button style={{ padding: '0.75rem 2rem', background: primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }} onClick={() => (window.location.href = '/')}>
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .auth-card { padding: 1.5rem !important; } }
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
              Conoce nuestras autoridades
            </p>

            {/* Botones */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="#mv-content" 
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
                Ver Contenido
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

        {/* ==================== AUTORIDADES (DISEÑO LIMPIO) ==================== */}
        <section id="autoridades-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Gradientes de fondo */}
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`, pointerEvents: 'none' }}></div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 0.6s ease-out' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Nuestras <span style={{ color: secondary }}>Autoridades</span>
              </h2>
              <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '1rem auto 0', borderRadius: '2px' }}></div>
            </div>

            {/* Grid de Autoridades */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {contenido?.autoridad?.map((auth, idx) => (
                <div 
                  key={auth.id_autoridad} 
                  className="auth-card"
                  style={{ 
                    textAlign: 'center', 
                    padding: '2rem 1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    border: `1px solid ${idx % 2 === 0 ? primary : secondary}20`,
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = `0 10px 30px ${idx % 2 === 0 ? primary : secondary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Foto */}
                  <div style={{ 
                    width: '160px', 
                    height: '160px', 
                    margin: '0 auto 1.5rem', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: `3px solid ${idx % 2 === 0 ? primary : secondary}`, 
                    boxShadow: `0 8px 25px rgba(0,0,0,0.3)`,
                    background: '#fff'
                  }}>
                    <img 
                      src={getImageUrl(auth.foto_autoridad)} 
                      alt={auth.nombre_autoridad} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="%2394a3b8" viewBox="0 0 24 24"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Nombre */}
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: '1.15rem', 
                    fontWeight: 700, 
                    margin: '0 0 0.5rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    lineHeight: 1.3
                  }}>
                    {auth.nombre_autoridad}
                  </h3>

                  {/* Cargo */}
                  <p style={{ 
                    color: idx % 2 === 0 ? primary : secondary, 
                    fontSize: '0.95rem', 
                    fontWeight: 600, 
                    margin: '0 0 1.25rem', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {auth.cargo_autoridad}
                  </p>

                  {/* Línea Divisoria */}
                  <div style={{ 
                    width: '40px', 
                    height: '2px', 
                    background: idx % 2 === 0 ? primary : secondary, 
                    margin: '0 auto 1.25rem', 
                    opacity: 0.6,
                    borderRadius: '2px'
                  }}></div>

                  {/* Contacto */}
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {auth.celular_autoridad && auth.celular_autoridad !== '234' && auth.celular_autoridad !== 'qwe' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <span>📞</span>
                        <span>{auth.celular_autoridad}</span>
                      </div>
                    )}
                    {auth.facebook_autoridad && auth.facebook_autoridad !== 'qweqwe' && auth.facebook_autoridad !== 'qwe' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span>🌐</span>
                        <a href={auth.facebook_autoridad.startsWith('http') ? auth.facebook_autoridad : `https://facebook.com/${auth.facebook_autoridad}`} target="_blank" rel="noopener noreferrer" style={{ color: secondary, textDecoration: 'none', fontWeight: 500 }}>
                          Facebook
                        </a>
                      </div>
                    )}
                    {(!auth.celular_autoridad || auth.celular_autoridad === '234') && (!auth.facebook_autoridad || auth.facebook_autoridad === 'qweqwe') && (
                      <p style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>Información de contacto no disponible</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Fallback si no hay autoridades */}
            {!contenido?.autoridad?.length && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
                <p style={{ fontSize: '1.1rem' }}>Actualmente no hay autoridades registradas.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer data={institucion} />
    </div>
  );
}