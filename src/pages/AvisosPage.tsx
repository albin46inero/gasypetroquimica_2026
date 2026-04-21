import { useState, useEffect } from 'react';
import { useCarreraData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AvisosPage() {
  const { institucion, recursos, contenido, loading, error } = useCarreraData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filtroActivo, setFiltroActivo] = useState('TODOS');
  const [imagenModal, setImagenModal] = useState<string | null>(null);

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

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setImagenModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

  // ✅ CORREGIDO: Filtrar desde recursos.upea_publicaciones
  const todosLosAvisos = recursos?.upea_publicaciones
    ?.filter(pub => {
      const titulo = pub.publicaciones_titulo?.toUpperCase() || '';
      const tipo = pub.publicaciones_tipo?.toUpperCase() || '';
      
      return titulo.includes('AVISO') || 
             titulo.includes('COMUNICADO') || 
             tipo.includes('AVISO') || 
             tipo.includes('COMUNICADO') ||
             tipo.includes('GACETA') ||
             titulo.includes('GACETA');
    })
    .map(pub => ({
      id: pub.publicaciones_id,
      titulo: pub.publicaciones_titulo,
      descripcion: pub.publicaciones_descripcion,
      fecha: pub.publicaciones_fecha,
      imagen: pub.publicaciones_imagen,
      tipo: pub.publicaciones_tipo || 'AVISO',
      autor: pub.publicaciones_autor,
      enlace: pub.publicaciones_documento || '#',
      estado: 1
    }))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) || [];

  const avisosFiltrados = filtroActivo === 'TODOS' 
    ? todosLosAvisos 
    : todosLosAvisos.filter(a => {
        const catUpper = filtroActivo.toUpperCase();
        const tipoUpper = a.tipo?.toUpperCase() || '';
        const tituloUpper = a.titulo?.toUpperCase() || '';
        return tipoUpper === catUpper || tituloUpper.includes(catUpper);
      });

  const categorias = ['TODOS', ...Array.from(new Set(todosLosAvisos.map(a => a.tipo || 'AVISO')))];

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 768px) { .aviso-card { padding: 1.5rem !important; } }
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
              Avisos, Comunicados y Gacetas Universitarias
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#avisos-content" style={{ padding: '1rem 2.5rem', background: primary, color: '#fff', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', display: 'inline-block' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; }}>
                Ver Avisos
              </a>
              <a href="#contacto" style={{ padding: '1rem 2.5rem', background: 'transparent', color: '#fff', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem', border: `3px solid ${secondary}`, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', display: 'inline-block' }} onMouseEnter={(e) => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Contactar
              </a>
            </div>
            {contenido?.portada && contenido.portada.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '3rem' }}>
                {contenido.portada.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} style={{ width: index === currentSlide ? '40px' : '12px', height: '12px', borderRadius: '6px', background: index === currentSlide ? primary : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} aria-label={`Ir a portada ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================== AVISOS Y COMUNICADOS ==================== */}
        <section id="avisos-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`, pointerEvents: 'none' }}></div>

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 0.6s ease-out' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}>
                Avisos y <span style={{ color: secondary }}>Comunicados</span>
              </h2>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFiltroActivo(cat)}
                    style={{
                      padding: '0.75rem 2rem',
                      background: filtroActivo === cat 
                        ? `linear-gradient(135deg, ${primary}, ${primary}cc)` 
                        : 'rgba(255,255,255,0.1)',
                      color: filtroActivo === cat ? '#fff' : '#94a3b8',
                      border: `2px solid ${filtroActivo === cat ? primary : 'rgba(255,255,255,0.2)'}`,
                      borderRadius: '50px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (filtroActivo !== cat) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filtroActivo !== cat) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#94a3b8';
                      }
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ width: '100px', height: '3px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto', borderRadius: '2px' }}></div>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '1.5rem' }}>
                {avisosFiltrados.length} {avisosFiltrados.length === 1 ? 'publicación' : 'publicaciones'} encontradas
              </p>
            </div>

            {avisosFiltrados.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2.5rem'
              }}>
                {avisosFiltrados.map((aviso, idx) => (
                  <div 
                    key={`${aviso.id}-${idx}`}
                    className="aviso-card"
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      border: `2px solid ${idx % 2 === 0 ? primary : secondary}20`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${idx % 2 === 0 ? primary : secondary}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                    }}
                  >
                    {/* Imagen con botón Abrir */}
                    <div style={{
                      position: 'relative',
                      height: '220px',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${primary}15, ${secondary}15)`,
                      cursor: aviso.imagen ? 'pointer' : 'default'
                    }}
                    onClick={() => aviso.imagen && setImagenModal(getImageUrl(aviso.imagen))}
                    >
                      {aviso.imagen ? (
                        <>
                          <img 
                            src={getImageUrl(aviso.imagen)} 
                            alt={aviso.titulo}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {/* Overlay con botón Abrir */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                          >
                            <button style={{
                              padding: '1rem 2.5rem',
                              background: '#FFD700',
                              color: '#000',
                              border: 'none',
                              borderRadius: '50px',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                              transform: 'scale(0.9)',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                            >
                              🔍 Abrir
                            </button>
                          </div>
                        </>
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
                          📄
                        </div>
                      )}
                      
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
                        {aviso.tipo}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div style={{ padding: '2rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        color: '#64748b',
                        fontWeight: 500
                      }}>
                        <span>📅</span>
                        <span>{formatearFecha(aviso.fecha)}</span>
                      </div>

                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: '1rem',
                        lineHeight: 1.4,
                        minHeight: '60px'
                      }}>
                        {aviso.titulo}
                      </h3>

                      <div 
                        style={{
                          color: '#64748b',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                        dangerouslySetInnerHTML={{ __html: aviso.descripcion }}
                      />

                      {aviso.autor && (
                        <div style={{
                          marginBottom: '1.5rem',
                          fontSize: '0.85rem',
                          color: '#94a3b8',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>✍️</span>
                          <span>{aviso.autor}</span>
                        </div>
                      )}

                    
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
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.3 }}>📭</div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.75rem' }}>
                  No hay {filtroActivo.toLowerCase()} disponibles
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                  Pronto publicaremos nueva información.
                </p>
              </div>
            )}
          </div>

          {/* ==================== MODAL DE IMAGEN ==================== */}
          {imagenModal && (
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
                cursor: 'pointer'
              }}
              onClick={() => setImagenModal(null)}
            >
              {/* Botón Cerrar */}
              <button 
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10000
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

              {/* Imagen ampliada */}
              <div 
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  animation: 'zoomIn 0.3s ease'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={imagenModal} 
                  alt="Vista ampliada"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                  }}
                />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer data={institucion} />
    </div>
  );
}