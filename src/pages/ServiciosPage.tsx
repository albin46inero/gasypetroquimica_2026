import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiciosPage() {
  const { institucion, recursos, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [servicioModal, setServicioModal] = useState<any>(null);

  // ✅ Colores dinámicos del servicio (SIN HARDCODEAR)
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

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicioModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #f3f4f6', borderTop: `4px solid ${primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: '#666', marginTop: 16 }}>Cargando servicios...</p>
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

  // ✅ Obtener servicios activos desde recursos.serviciosCarrera
  const servicios = recursos?.serviciosCarrera
    ?.filter(serv => serv.serv_active === "1")
    .sort((a, b) => a.serv_id - b.serv_id) || [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        /* ✅ Rotación 360° para tarjetas */
        @keyframes rotate360 { 
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .servicio-card-3d {
          animation: rotate360 8s linear infinite;
          transform-style: preserve-3d;
        }
        .servicio-card-3d:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) { .servicio-card { padding: 1.5rem !important; } }
      `}</style>

      <Header data={institucion} />

      <main>
        {/* ==================== HERO SECTION CON CARRUSEL ==================== */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}>
            {contenido?.portada && contenido.portada.length > 0 ? (
              contenido.portada.map((portada, index) => (
                <div key={portada.portada_id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out', zIndex: index === currentSlide ? 1 : 0 }}>
                  <img src={getImageUrl(portada.portada_imagen)} alt={portada.portada_titulo || `Portada ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))
            ) : (
              <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${primary}40 0%, ${secondary}40 100%)` }}></div>
            )}
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: -1 }}></div>

          <div style={{ textAlign: 'center', color: '#fff', padding: '2rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeInUp 1s ease-out', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '150px', height: '150px', margin: '0 auto 2rem', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: `5px solid ${primary}`, overflow: 'hidden' }}>
              {institucion?.institucion_logo ? (
                <img src={getImageUrl(institucion.institucion_logo)} alt="Logo" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: '3rem', fontWeight: 800, color: primary }}>IGP</span>
              )}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#FFD700', margin: '0 0 1rem', textShadow: '3px 3px 6px rgba(0,0,0,0.7)', letterSpacing: '2px', lineHeight: 1.2, textTransform: 'uppercase' }}>
              {institucion?.institucion_nombre || 'Ingeniería de Gas y Petroquímica'}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#fff', margin: '0 0 2rem', fontWeight: 400, textShadow: '2px 2px 4px rgba(0,0,0,0.6)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
              Servicios que ofrecemos a la comunidad universitaria
            </p>
        
            {contenido?.portada && contenido.portada.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '3rem' }}>
                {contenido.portada.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} style={{ width: index === currentSlide ? '40px' : '12px', height: '12px', borderRadius: '6px', background: index === currentSlide ? primary : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} aria-label={`Ir a portada ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <section id="servicios-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Gradientes de fondo con colores dinámicos */}
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`, pointerEvents: 'none' }}></div>

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 0.6s ease-out' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}>
                Nuestros <span style={{ color: secondary }}>Servicios</span>
              </h2>
              <div style={{ width: '100px', height: '3px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                {servicios.length} {servicios.length === 1 ? 'servicio' : 'servicios'} disponibles
              </p>
            </div>

            {servicios.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2.5rem'
              }}>
                {servicios.map((servicio, idx) => (
                  <div 
                    key={servicio.serv_id}
                    className="servicio-card servicio-card-3d"
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      border: `2px solid ${idx % 2 === 0 ? primary : secondary}20`,
                      cursor: 'pointer'
                    }}
                    onClick={() => setServicioModal(servicio)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${idx % 2 === 0 ? primary : secondary}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                    }}
                  >
                    {/* Imagen del servicio */}
                    <div style={{
                      position: 'relative',
                      height: '220px',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${primary}15, ${secondary}15)`
                    }}>
                      {servicio.serv_imagen ? (
                        <img 
                          src={getImageUrl(servicio.serv_imagen)} 
                          alt={servicio.serv_nombre}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '4rem',
                          color: idx % 2 === 0 ? primary : secondary,
                          background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`
                        }}>
                          🔧
                        </div>
                      )}
                      
                      {/* Badge dinámico con color alternado */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.4rem 1rem',
                        background: idx % 2 === 0 ? primary : secondary,
                        color: '#fff',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        Servicio
                      </div>
                    </div>

                    {/* Contenido */}
                    <div style={{ padding: '2rem' }}>
                      {/* Título del servicio */}
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: '1rem',
                        lineHeight: 1.3
                      }}>
                        {servicio.serv_nombre}
                      </h3>

                      {/* Descripción */}
                      <div 
                        style={{
                          color: '#64748b',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          marginBottom: '1.5rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: servicio.serv_descripcion }}
                      />

                      {/* Teléfono de contacto si existe */}
                      {servicio.serv_nro_celular && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem',
                          background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`,
                          borderRadius: '8px',
                          marginBottom: '1.5rem'
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>📞</span>
                          <div>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, fontWeight: 600 }}>Contacto</p>
                            <p style={{ fontSize: '1rem', color: primary, margin: 0, fontWeight: 700 }}>{servicio.serv_nro_celular}</p>
                          </div>
                        </div>
                      )}

                      {/* Botón Ver Más */}
                      <button 
                        style={{
                          width: '100%',
                          padding: '0.875rem 1.5rem',
                          background: `linear-gradient(135deg, ${idx % 2 === 0 ? primary : secondary}, ${idx % 2 === 0 ? primary : secondary}cc)`,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px ${idx % 2 === 0 ? primary : secondary}40`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 6px 16px ${idx % 2 === 0 ? primary : secondary}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 4px 12px ${idx % 2 === 0 ? primary : secondary}40`;
                        }}
                      >
                        Ver Más Detalles →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: `2px dashed ${primary}30`
              }}>
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.3 }}>🔧</div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.75rem' }}>
                  No hay servicios disponibles
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                  Pronto publicaremos nuevos servicios.
                </p>
              </div>
            )}
          </div>

          {/* ==================== MODAL DE SERVICIO ==================== */}
          {servicioModal && (
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeInUp 0.3s ease',
                cursor: 'pointer',
                padding: '2rem',
                overflow: 'auto'
              }}
              onClick={() => setServicioModal(null)}
            >
              {/* Contenido del modal */}
              <div 
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  maxWidth: '700px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  animation: 'zoomIn 0.3s ease',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div style={{
                  position: 'sticky',
                  top: 0,
                  background: `linear-gradient(135deg, ${primary}, ${primary}dd)`,
                  color: '#fff',
                  padding: '2rem',
                  borderRadius: '16px 16px 0 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  zIndex: 1
                }}>
                  <div>
                    <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.8rem', fontWeight: 700 }}>
                      {servicioModal.serv_nombre}
                    </h2>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
                      Servicio Institucional
                    </p>
                  </div>
                  <button 
                    onClick={() => setServicioModal(null)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: '#fff',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                      e.currentTarget.style.transform = 'rotate(90deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Imagen */}
                {servicioModal.serv_imagen && (
                  <div style={{
                    width: '100%',
                    height: '300px',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={getImageUrl(servicioModal.serv_imagen)} 
                      alt={servicioModal.serv_nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Contenido */}
                <div style={{ padding: '2rem' }}>
                  {/* Descripción completa */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '1rem', fontWeight: 700 }}>
                      Descripción del Servicio
                    </h3>
                    <div 
                      style={{
                        color: '#475569',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        textAlign: 'justify'
                      }}
                      dangerouslySetInnerHTML={{ __html: servicioModal.serv_descripcion }}
                    />
                  </div>

                  {/* Información de contacto */}
                  {servicioModal.serv_nro_celular && (
                    <div style={{
                      padding: '1.5rem',
                      background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`,
                      borderRadius: '12px',
                      border: `2px solid ${primary}30`,
                      marginBottom: '2rem'
                    }}>
                      <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
                        📞 Información y Consultas
                      </p>
                      <p style={{ fontSize: '1.3rem', color: primary, fontWeight: 700, margin: 0 }}>
                        {servicioModal.serv_nro_celular}
                      </p>
                    </div>
                  )}

                  {/* Botón de contacto por WhatsApp */}
                  {servicioModal.serv_nro_celular && (
                    <a 
                      href={`https://wa.me/591${servicioModal.serv_nro_celular.toString().replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '1.125rem 2rem',
                        background: '#25D366',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(37,211,102,0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,211,102,0.3)';
                      }}
                    >
                      💬 Contactar por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer data={institucion} />
    </div>
  );
}