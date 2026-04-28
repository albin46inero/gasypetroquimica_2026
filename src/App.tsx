import { useCarreraData } from './lib/api';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const { institucion, recursos, contenido, loading, error } = useCarreraData();
  
  // Estado para el carrusel de noticias/publicaciones
  const [newsSlide, setNewsSlide] = useState(0);

  // Colores dinámicos
  const colors: any = institucion?.colorinstitucion?.[0] || {};
  const primary = colors.color_primario || '#349433';
  const secondary = colors.color_secundario || '#00B9D1';
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!contenido?.portada || contenido.portada.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= contenido.portada!.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [contenido?.portada]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #f3f4f6', borderTop: `4px solid ${primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginLeft: '1rem', color: '#666' }}>Cargando...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error</h2>
          <p style={{ color: '#555' }}>{error}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '0.75rem 2rem', background: primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Helper para URLs de imágenes
  const getImageUrl = (filename: string | null | undefined): string => {
    if (!filename) return '';
    if (filename.startsWith('http')) return filename;
    return `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${filename}`;
  };

  return (
    <div style={{}}>
      <Header data={institucion} />
      
      {/* ==================== HERO SECTION (SIN CAMBIOS) ==================== */}
      <section id="inicio" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        overflow: 'hidden'
      }}>
        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          @keyframes fadeSlide { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        `}</style>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}>
          {contenido?.portada && contenido.portada.length > 0 ? (
            contenido.portada.map((portada, index) => (
              <div key={portada.portada_id} style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out',
                zIndex: index === currentSlide ? 1 : 0, animation: index === currentSlide ? 'fadeSlide 1s ease-out' : 'none'
              }}>
                <img src={portada.portada_imagen} alt={portada.portada_titulo || `Portada ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${primary}40 0%, ${secondary}40 100%)` }}></div>
          )}
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: -1 }}></div>

        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeInUp 1s ease-out', position: 'relative', zIndex: 1 }}>
          <div className="logo-pulse" style={{
            width: '200px', height: '200px', margin: '0 auto 2rem', background: '#fff', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            border: `5px solid ${primary}`, animation: 'pulse 2s ease-in-out infinite', overflow: 'hidden'
          }}>
            {institucion?.institucion_logo ? (
              <img src={institucion.institucion_logo?.startsWith('http') ? institucion.institucion_logo : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${institucion.institucion_logo}`}
                alt="Logo Institucional" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: '4rem', fontWeight: 800, color: primary }}>IGP</span>
            )}
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFD700', margin: '0 0 1rem', textShadow: '3px 3px 6px rgba(0,0,0,0.7)', letterSpacing: '2px', lineHeight: 1.2, textTransform: 'uppercase' }}>
            {institucion?.institucion_nombre || 'INGENIERÍA DE GAS Y PETROQUÍMICA'}
          </h1>


         {/* Botones */}
<div style={{
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: '2rem'
}}>
  {/* ✅ Botón "Conocer Más" → Redirige a #sobre-nosotros */}
  <a 
    href="#sobre-nosotros" 
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
      display: 'inline-block',
      scrollBehavior: 'smooth'  // ✅ Scroll suave
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
    Conocer Más
  </a>

  {/* ✅ Botón "Contactar" → Redirige a #contacto */}
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
      display: 'inline-block',
      scrollBehavior: 'smooth'  // ✅ Scroll suave
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

          {contenido?.portada && contenido.portada.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '3rem' }}>
              {contenido.portada.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} style={{
                  width: index === currentSlide ? '40px' : '12px', height: '12px', borderRadius: '6px',
                  background: index === currentSlide ? primary : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease', boxShadow: index === currentSlide ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                }}
                  onMouseEnter={(e) => { if (index !== currentSlide) { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.width = '20px'; } }}
                  onMouseLeave={(e) => { if (index !== currentSlide) { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.width = '12px'; } }}
                  aria-label={`Ir a portada ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 100 }}>
       <a 
  href={institucion?.institucion_facebook || '#'} 
  target="_blank" 
  rel="noopener noreferrer" 
  style={{
    width: '55px',
    height: '55px',
    background: '#1877F2',  // ✅ Color azul de Facebook
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(24,119,242,0.4)',  // ✅ Sombra azul
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(24,119,242,0.5)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(24,119,242,0.4)';
  }}
>
  {/* ✅ Icono de Facebook (letra "f") */}
  <span style={{ 
    fontSize: '1.8rem', 
    fontWeight: 700, 
    color: '#fff',
    fontFamily: 'Arial, sans-serif'
  }}>
    f
  </span>
</a>
          <a href={`https://wa.me/${institucion?.institucion_celular1 || ''}`} target="_blank" rel="noopener noreferrer" style={{
            width: '55px', height: '55px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '2rem' }}>💬</span>
          </a>
        </div>
      </section>

      {/* ==================== EXPLORA NUESTRA INSTITUCIÓN (CON DEGRADADOS) ==================== */}
     <section id="explora-nuestra-institucion" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Explora Nuestra Institución
            </h2>
            <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            {recursos?.linksExternoInterno?.filter(link => link.estado === 1).map((link, index) => {
              const imageUrl = link.imagen?.startsWith('http') ? link.imagen : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${link.imagen}`;
              const cardBg = index % 2 === 0 ? `linear-gradient(135deg, ${primary}20, ${secondary}20)` : `linear-gradient(135deg, ${secondary}20, ${primary}20)`;
              const cardOverlay = index % 2 === 0 ? `linear-gradient(135deg, ${primary}cc 0%, ${secondary}cc 100%)` : `linear-gradient(135deg, ${secondary}cc 0%, ${primary}cc 100%)`;

              return (
                <a key={link.id_link} href={link.url_link} target="_blank" rel="noopener noreferrer" style={{
                  borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', transition: 'all 0.4s ease',
                  cursor: 'pointer', position: 'relative', minHeight: '400px', background: cardBg, textDecoration: 'none', display: 'block'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)'; }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardOverlay, opacity: 0.85, zIndex: 0 }}>
                    {link.imagen && <img src={imageUrl} alt={link.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', textAlign: 'center', color: '#fff' }}>
                    <div style={{ width: '80px', height: '80px', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))', animation: `float 3s ease-in-out infinite ${index * 0.3}s` }}>
                      {link.imagen ? <img src={imageUrl} alt={link.nombre} style={{ width: '70%', height: '70%', objectFit: 'contain' }} /> : <span style={{ fontSize: '2.5rem' }}>🔗</span>}
                    </div>
                    {link.tipo && <span style={{ padding: '0.35rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{link.tipo}</span>}
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', lineHeight: 1.3 }}>{link.nombre}</h3>
                    <p style={{ fontSize: '0.95rem', opacity: 0.95, marginBottom: '2rem', lineHeight: 1.6, maxWidth: '250px' }}></p>
                    <span style={{ padding: '0.875rem 2rem', background: '#fff', color: index % 2 === 0 ? primary : secondary, textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      Acceder <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {!recursos?.linksExternoInterno?.length && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}><p>No hay enlaces disponibles en este momento.</p></div>}

          <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      </section>

      {/* ==================== AUTORIDADES (CON DEGRADADOS) ==================== */}
   <section id="avisos-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${secondary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${primary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Autoridades</h2>
            <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '1.1rem', color: '#f0f2f6', maxWidth: '600px', margin: '1.5rem auto 0' }}>Conoce a las autoridades que lideran nuestra institución</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            {contenido?.autoridad?.map((autoridad: any, index) => {
              const fotoUrl = autoridad?.foto_autoridad ? String(autoridad.foto_autoridad).startsWith('http') ? autoridad.foto_autoridad : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/autoridades/${autoridad.foto_autoridad}` : '';
              return (
                <div key={autoridad.id_autoridad} style={{
                  borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', transition: 'all 0.4s ease',
                  cursor: 'pointer', position: 'relative', background: '#fff', border: `2px solid ${index % 3 === 0 ? primary : index % 3 === 1 ? secondary : primary}30`
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.12)'; }}>
                  <div style={{ position: 'relative', height: '400px', overflow: 'hidden', background: `linear-gradient(135deg, ${primary}10, ${secondary}10)` }}>
                    {fotoUrl ? <img src={fotoUrl} alt={autoridad.nombre_autoridad} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${primary}20, ${secondary}20)` }}><span style={{ fontSize: '6rem', opacity: 0.3 }}>👤</span></div>}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                  </div>
                  <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', position: 'relative' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem', lineHeight: 1.3 }}>{autoridad.nombre_autoridad}</h3>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: primary, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{autoridad.cargo_autoridad}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                      {autoridad.facebook_autoridad && autoridad.facebook_autoridad !== 'qweqwe' && (
                        <a href={`https://facebook.com/${autoridad.facebook_autoridad}`} target="_blank" rel="noopener noreferrer" style={{
                          width: '40px', height: '40px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1.2rem'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}>f</a>
                      )}
                      {autoridad.celular_autoridad && autoridad.celular_autoridad !== '234' && (
                        <a href={`https://wa.me/${autoridad.celular_autoridad}`} target="_blank" rel="noopener noreferrer" style={{
                          width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1.3rem'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}>💬</a>
                      )}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: index % 3 === 0 ? primary : index % 3 === 1 ? secondary : primary }}></div>
                </div>
              );
            })}
          </div>

          {!contenido?.autoridad?.length && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}><p>No hay autoridades registradas en este momento.</p></div>}
          <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      </section>

      {/* ==================== SOBRE NOSOTROS (CON DEGRADADOS) ==================== */}
     <section id="sobre-nosotros" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        {/* Elementos decorativos de fondo (siluetas) */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', fontSize: '20rem', opacity: 0.03, color: primary, pointerEvents: 'none', zIndex: 0 }}>🏭</div>
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', fontSize: '15rem', opacity: 0.03, color: secondary, pointerEvents: 'none', zIndex: 0 }}>⚙️</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 4s ease-in-out infinite' }}>
              <div style={{ width: '350px', height: '350px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: `8px solid ${primary}`, background: '#fff', position: 'relative' }}>
                {institucion?.institucion_logo ? (
                  <img src={institucion.institucion_logo?.startsWith('http') ? institucion.institucion_logo : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${institucion.institucion_logo}`}
                    alt={institucion.institucion_nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${primary}10, ${secondary}10)`, fontSize: '6rem', color: primary }}></div>
                )}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Sobre Nosotros</h2>
              <div style={{ fontSize: '1.05rem', color: '#f0f2f6  ', lineHeight: '1.9', marginBottom: '2rem', textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: institucion?.institucion_historia || 'La Carrera de Ingeniería de Gas y Petroquímica de la Universidad Pública de El Alto (UPEA) ha sido un pilar en la formación de profesionales competentes para el desarrollo del país.' }} />
              <a href="#historia" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: primary, color: '#fff', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; }}>
                Leer más →
              </a>
            </div>
          </div>
        </div>

        <style>{`@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-15px) rotate(1deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(15px) rotate(-1deg); } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>

      {/* ==================== PUBLICACIONES Y NOTICIAS (CON DEGRADADOS) ==================== */}
       <section id="avisos-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${secondary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${primary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>Noticias y Publicaciones</h2>
            <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto 1rem', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '1.1rem', color: '#f0f2f6 ' }}>Mantente informado sobre las últimas novedades</p>
          </div>

          {recursos?.upea_publicaciones && recursos.upea_publicaciones.length > 0 ? (
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative' }}>
                <button onClick={() => setNewsSlide(prev => prev === 0 ? recursos.upea_publicaciones!.length - 1 : prev - 1)} style={{
                  position: 'absolute', left: '-3rem', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%',
                  background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: primary, transition: 'all 0.3s ease', zIndex: 10
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = primary; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = primary; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
                  ❮
                </button>

                <div style={{ width: '100%', maxWidth: '650px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', background: '#fff', animation: 'fadeIn 0.5s ease' }}>
                  <div style={{ padding: '2rem 2rem 1.5rem', background: `linear-gradient(135deg, ${primary}, ${primary}dd)`, color: '#fff' }}>
                    <span style={{ display: 'inline-block', padding: '0.3rem 1rem', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '50px', marginBottom: '1rem' }}>
                      {recursos.upea_publicaciones?.[newsSlide]?.publicaciones_tipo || 'CONVOCATORIA'}
                    </span>
                    <p style={{ fontSize: '1rem', color: '#FFD700', fontWeight: 700, margin: '0 0 0.5rem' }}>
                      {recursos.upea_publicaciones?.[newsSlide]?.publicaciones_fecha ? new Date(recursos.upea_publicaciones[newsSlide].publicaciones_fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                      {recursos.upea_publicaciones?.[newsSlide]?.publicaciones_titulo}
                    </h3>
                  </div>

                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {recursos.upea_publicaciones?.[newsSlide]?.publicaciones_imagen ? (
                      <>
                        <img src={recursos.upea_publicaciones[newsSlide].publicaciones_imagen.startsWith('http') ? recursos.upea_publicaciones[newsSlide].publicaciones_imagen : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${recursos.upea_publicaciones[newsSlide].publicaciones_imagen}`}
                          alt={recursos.upea_publicaciones[newsSlide].publicaciones_titulo} style={{ width: '100%', height: '450px', objectFit: 'contain', display: 'block', background: '#fff', padding: '1rem' }} />
                        <a href={recursos.upea_publicaciones[newsSlide].publicaciones_imagen.startsWith('http') ? recursos.upea_publicaciones[newsSlide].publicaciones_imagen : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${recursos.upea_publicaciones[newsSlide].publicaciones_imagen}`}
                          target="_blank" rel="noopener noreferrer" style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.875rem 2rem', background: '#FFD700', color: '#1a1a2e', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', zIndex: 10
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'; }}>
                          🔗 Abrir
                        </a>
                      </>
                    ) : (
                      <div style={{ width: '100%', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}><span style={{ fontSize: '5rem', opacity: 0.3 }}></span></div>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem 2rem 2rem', background: '#fff' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '50px', marginBottom: '1rem', fontSize: '0.85rem', color: primary, fontWeight: 600 }}><span>📄</span><span>IMAGEN</span></div>
                    <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                      {recursos.upea_publicaciones?.[newsSlide]?.publicaciones_descripcion ? recursos.upea_publicaciones[newsSlide].publicaciones_descripcion.replace(/<[^>]*>/g, '').substring(0, 200) : 'Convocatoria disponible para su consulta.'}
                    </p>
                    {(recursos.upea_publicaciones?.[newsSlide]?.publicaciones_documento || recursos.upea_publicaciones?.[newsSlide]?.publicaciones_imagen) && (
                      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                        <a href={recursos.upea_publicaciones[newsSlide].publicaciones_documento ? recursos.upea_publicaciones[newsSlide].publicaciones_documento : recursos.upea_publicaciones[newsSlide].publicaciones_imagen}
                          download target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: `${primary}15`, color: primary,
                            textDecoration: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = primary; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = `${primary}15`; e.currentTarget.style.color = primary; }}>
                          ⬇️ Descargar
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={() => setNewsSlide(prev => prev === recursos.upea_publicaciones!.length - 1 ? 0 : prev + 1)} style={{
                  position: 'absolute', right: '-3rem', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%',
                  background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: primary, transition: 'all 0.3s ease', zIndex: 10
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = primary; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = primary; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
                  ❯
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                {recursos.upea_publicaciones?.map((_, index) => (
                  <button key={index} onClick={() => setNewsSlide(index)} style={{
                    width: newsSlide === index ? '35px' : '12px', height: '12px', borderRadius: '6px',
                    background: newsSlide === index ? primary : '#cbd5e1', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
                  }} />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button style={{ padding: '1rem 2.5rem', background: '#FFD700', color: '#1a1a2e', border: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'; }}>
                  Descubre más comunicados →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '12px' }}>
              <span style={{ fontSize: '4rem', opacity: 0.3, display: 'block', marginBottom: '1rem' }}>📭</span>
              <h3 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '0.5rem' }}>No hay publicaciones disponibles</h3>
              <p style={{ color: '#64748b' }}>Pronto publicaremos nuevas noticias y actualizaciones.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== VIDEOS INSTITUCIONALES (CON DEGRADADOS) ==================== */}
     <section id="avisos-content" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Videos Institucionales</h2>
            <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '1.1rem', color: '#f0f2f6 ', maxWidth: '600px', margin: '0 auto' }}>Conoce más sobre nuestra institución a través de nuestros videos</p>
          </div>

          {contenido?.upea_videos && contenido.upea_videos.length > 0 ? (
            <>
              {contenido.upea_videos.length > 0 && (
                <div style={{ marginBottom: '4rem', background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', border: `2px solid ${primary}20` }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
                    <iframe src={contenido.upea_videos[0].video_enlace} title={contenido.upea_videos[0].video_titulo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div style={{ padding: '2rem', background: `linear-gradient(135deg, ${primary}, ${primary}dd)` }}>
                    <span style={{ display: 'inline-block', padding: '0.35rem 1rem', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '50px', marginBottom: '1rem' }}>{contenido.upea_videos[0].video_tipo || 'VIDEO'}</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem', lineHeight: 1.3 }}>{contenido.upea_videos[0].video_titulo}</h3>
                    <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: contenido.upea_videos[0].video_breve_descripcion || '' }} />
                  </div>
                </div>
              )}

              {contenido.upea_videos.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                  {contenido.upea_videos.slice(1).map((video, index) => (
                    <div key={video.video_id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', border: `2px solid ${index % 2 === 0 ? primary : secondary}20` }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
                        <iframe src={video.video_enlace} title={video.video_titulo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                      <div style={{ padding: '1.75rem' }}>
                        <span style={{ display: 'inline-block', padding: '0.35rem 1rem', background: `${index % 2 === 0 ? primary : secondary}15`, color: index % 2 === 0 ? primary : secondary, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '50px', marginBottom: '1rem' }}>{video.video_tipo || 'VIDEO'}</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem', lineHeight: 1.3 }}>{video.video_titulo}</h4>
                        <div style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: video.video_breve_descripcion || '' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.3 }}>📹</div>
              <h3 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '0.75rem', fontWeight: 700 }}>No hay videos disponibles</h3>
              <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>Pronto publicaremos videos sobre las actividades de nuestra institución.</p>
            </div>
          )}
        </div>

        <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>

      {/* ==================== CONTACTO (CON DEGRADADOS) ==================== */}
 <section id="contacto" style={{
          padding: '6rem 0',
          background: `linear-gradient(180deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
          background: `radial-gradient(ellipse at 20% 30%, ${primary}90 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, ${secondary}90 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0
        }}></div>

        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          .contact-input:focus { border-color: ${primary} !important; box-shadow: 0 0 0 4px ${primary}20 !important; outline: none; background: #fff !important; }
          .contact-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 25px rgba(0,0,0,0.25) !important; }
          .social-icon:hover { transform: translateY(-4px) !important; filter: brightness(1.1); }
          .map-container iframe { transition: filter 0.3s ease; }
          .map-container:hover iframe { filter: brightness(1.05); }
        `}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 0.6s ease-out' }}>
            <span style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: `${primary}15`, color: primary, borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>📬 Contáctanos</span>
            <h2 style={{ fontSize: '2.8rem', color: '#e8eaed', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>¿Listo para comenzar?</h2>
            <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${primary}, ${secondary})`, margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '1.15rem', color: '#f8fafc', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>Estamos aquí para resolver tus dudas. Escríbenos y te responderemos a la brevedad.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
            <div style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
              <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: `1px solid ${primary}20` }}>
                <div style={{ padding: '2.5rem 2rem', background: `linear-gradient(135deg, ${primary}, ${primary}dd)`, color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', position: 'relative', zIndex: 1 }}>Información de Contacto</h3>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: '1rem', position: 'relative', zIndex: 1 }}>{institucion?.institucion_nombre}</p>
                </div>

                <div style={{ padding: '2rem' }}>
                  {institucion?.institucion_direccion && (
                    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px dashed #e2e8f0', transition: 'all 0.3s ease', cursor: 'default' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${primary}08`; e.currentTarget.style.paddingLeft = '1.5rem'; e.currentTarget.style.borderRadius = '12px'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; }}>
                      <div style={{ width: '50px', height: '50px', background: `linear-gradient(135deg, ${primary}20, ${secondary}20)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.4rem', boxShadow: `0 4px 12px ${primary}15` }}>📍</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Dirección</strong>
                        <p style={{ margin: 0, color: '#1e293b', fontSize: '1rem', lineHeight: 1.5, fontWeight: 500 }}>{institucion.institucion_direccion}</p>
                      </div>
                    </div>
                  )}

                  {(institucion?.institucion_celular1 && institucion.institucion_celular1 !== 2147483647) && (
                    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px dashed #e2e8f0', transition: 'all 0.3s ease', cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${secondary}08`; e.currentTarget.style.paddingLeft = '1.5rem'; e.currentTarget.style.borderRadius = '12px'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; }}
                      onClick={() => window.location.href = `tel:${institucion.institucion_celular1}`}>
                      <div style={{ width: '50px', height: '50px', background: `linear-gradient(135deg, ${secondary}20, ${primary}20)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.4rem', boxShadow: `0 4px 12px ${secondary}15` }}>📱</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Teléfono</strong>
                        <p style={{ margin: 0, color: primary, fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 700, textDecoration: 'none' }}>{institucion.institucion_celular1}</p>
                      </div>
                    </div>
                  )}

                  {institucion?.institucion_correo1 && (
                    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem', transition: 'all 0.3s ease', cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${primary}08`; e.currentTarget.style.paddingLeft = '1.5rem'; e.currentTarget.style.borderRadius = '12px'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; }}
                      onClick={() => window.location.href = `mailto:${institucion.institucion_correo1}`}>
                      <div style={{ width: '50px', height: '50px', background: `linear-gradient(135deg, ${primary}20, ${secondary}20)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.4rem', boxShadow: `0 4px 12px ${primary}15` }}>✉️</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Correo Electrónico</strong>
                        <a href={`mailto:${institucion.institucion_correo1}`} style={{ margin: 0, color: secondary, fontSize: '1rem', lineHeight: 1.5, fontWeight: 600, textDecoration: 'none', transition: 'color 0.3s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = primary} onMouseLeave={(e) => e.currentTarget.style.color = secondary}>
                          {institucion.institucion_correo1}
                        </a>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1.25rem', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${secondary}08`; e.currentTarget.style.paddingLeft = '1.5rem'; e.currentTarget.style.borderRadius = '12px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; }}>
                    <div style={{ width: '50px', height: '50px', background: `linear-gradient(135deg, ${secondary}20, ${primary}20)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.4rem', boxShadow: `0 4px 12px ${secondary}15` }}>🕐</div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Horario de Atención</strong>
                      <p style={{ margin: 0, color: '#1e293b', fontSize: '1rem', lineHeight: 1.5, fontWeight: 500 }}>Lunes a Viernes: 8:00 - 12:00 y 14:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '2rem', background: '#f8fafc', borderTop: `1px solid ${primary}20` }}>
                  <h4 style={{ margin: '0 0 1.25rem', fontSize: '1rem', color: '#334155', fontWeight: 700, textAlign: 'center' }}>Síguenos en redes sociales</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {institucion?.institucion_facebook && (
                      <a href={institucion.institucion_facebook} target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                        width: '45px', height: '45px', borderRadius: '12px', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        
                        color: '#fff', textDecoration: 'none', fontSize: '1.3rem', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(24,119,242,0.3)'
                      }} title="Facebook">f</a>
                    )}
                    {institucion?.institucion_youtube && (
                      <a href={institucion.institucion_youtube} target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                        width: '45px', height: '45px', borderRadius: '12px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', textDecoration: 'none', fontSize: '1.3rem', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(255,0,0,0.3)'
                      }} title="YouTube">▶</a>
                    )}
                    {institucion?.institucion_twitter && (
                      <a href={institucion.institucion_twitter} target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                        width: '45px', height: '45px', borderRadius: '12px', background: '#1DA1F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', textDecoration: 'none', fontSize: '1.3rem', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(29,161,242,0.3)'
                      }} title="Twitter">𝕏</a>
                    )}
                    {institucion?.institucion_celular1 && institucion.institucion_celular1 !== 2147483647 && (
                      <a href={`https://wa.me/${institucion.institucion_celular1}`} target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                        width: '45px', height: '45px', borderRadius: '12px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', textDecoration: 'none', fontSize: '1.4rem', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(37,211,102,0.3)'
                      }} title="WhatsApp">💬</a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: `1px solid ${secondary}20` }}>
                <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '0 0 0.5rem', fontWeight: 700 }}>Envíanos un mensaje</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por tu mensaje! Nos contactaremos contigo pronto.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Nombre completo <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" name="nombre" placeholder="Ingresa tu nombre completo" required className="contact-input" style={{ width: '100%', padding: '1rem 1.25rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Correo electrónico <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="email" name="email" placeholder="tu@email.com" required className="contact-input" style={{ width: '100%', padding: '1rem 1.25rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Teléfono / Celular</label>
                    <input type="tel" name="telefono" placeholder="+591 XXXXXXXX" className="contact-input" style={{ width: '100%', padding: '1rem 1.25rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Asunto <span style={{ color: '#ef4444' }}>*</span></label>
                    <select name="asunto" required className="contact-input" style={{ width: '100%', padding: '1rem 1.25rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease', fontFamily: 'inherit', cursor: 'pointer' }}>
                      <option value="">Selecciona un asunto</option>
                      <option value="informacion">Información general</option>
                      <option value="inscripcion">Inscripciones y admisión</option>
                      <option value="cursos">Cursos y seminarios</option>
                      <option value="convenios">Convenios institucionales</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Mensaje <span style={{ color: '#ef4444' }}>*</span></label>
                    <textarea name="mensaje" rows={5} placeholder="Escribe tu mensaje o consulta..." required className="contact-input" style={{ width: '100%', padding: '1rem 1.25rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px' }} />
                  </div>
                  <button type="submit" className="contact-btn" style={{
                    width: '100%', padding: '1.125rem 2rem', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                    background: `linear-gradient(135deg, ${primary}, ${primary}dd)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    boxShadow: `0 6px 20px ${primary}40`, transition: 'all 0.3s ease', marginTop: '0.5rem'
                  }}>
                    Enviar Mensaje <span style={{ transition: 'transform 0.3s ease' }}>➜</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer data={institucion} />
    </div>
  );
}

export default App;