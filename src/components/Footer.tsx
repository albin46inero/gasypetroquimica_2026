import { InstitucionPrincipal } from '../lib/api';
import { motion } from 'framer-motion';

interface FooterProps {
  data: InstitucionPrincipal | null;
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  const colores = data.colorinstitucion?.[0] || {};
  const primaryColor = colores.color_primario || '#349433';
  const secondaryColor = colores.color_secundario || '#00B9D1';
  const currentYear = new Date().getFullYear();

  // Helper para URLs de imágenes
  const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '';
    return path.startsWith('http') ? path : `https://archivosminio.upea.bo/archivospaginasnode/imagenes/${path}`;
  };

  // Navegación del footer
  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre', label: 'La Institución' },
    { href: '#plan', label: 'Plan de Estudios' },
    { href: '#perfil', label: 'Perfil Profesional' },
    { href: '#noticias', label: 'Noticias' },
    { href: '#videos', label: 'Videos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  // Servicios rápidos
  const servicios = [
    { href: '#inscripciones', label: 'Inscripciones' },
    { href: '#campus', label: 'Campus Virtual' },
    { href: '#biblioteca', label: 'Biblioteca' },
    { href: '#bolsa-trabajo', label: 'Bolsa de Trabajo' },
  ];

  return (
    <>
      {/* Estilos CSS globales para animaciones */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .footer-link:hover { transform: translateX(5px) !important; color: ${secondaryColor} !important; }
        .social-btn:hover { transform: translateY(-4px) !important; filter: brightness(1.1); }
        .footer-cta-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important; }
        .logo-institucional:hover { transform: translateY(-3px) !important; opacity: 1 !important; filter: brightness(1.1) !important; }
        @media (max-width: 992px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-top-content { flex-direction: column !important; text-align: center !important; }
          .footer-bottom-content { flex-direction: column !important; text-align: center !important; gap: 1rem !important; }
          .logos-container { justify-content: center !important; }
        }
      `}</style>

      <footer style={{
        background: '#0f172a',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: 1.6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* ✅ Gradientes de fondo decorativos */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `
            radial-gradient(ellipse at 20% 30%, ${primaryColor}90 0%, transparent 70%),
            radial-gradient(ellipse at 80% 70%, ${secondaryColor}90 0%, transparent 70%)
          `,
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        {/* Barra superior CTA con degradado institucional */}
        <div style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          padding: '2rem 0',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}>
          {/* Overlay decorativo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 90%, transparent 70%),
              radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 90%, transparent 70%)
            `,
            pointerEvents: 'none'
          }}></div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1
          }}>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '0 0 0.5rem',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                ¿Listo para ser parte de {data.institucion_nombre}?
              </h3>
              <p style={{
                margin: 0,
                opacity: 0.95,
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.95)'
              }}>
                Únete a nosotros y forma parte del futuro de la ingeniería
              </p>
            </div>
            <a 
              href="#contacto" 
              className="footer-cta-btn"
              style={{
                padding: '1rem 2.5rem',
                background: '#fff',
                color: primaryColor,
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '50px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              Contáctanos Ahora →
            </a>
          </div>
        </div>

        {/* Contenido principal del footer */}
        <div style={{
          background: `linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`,
          padding: '4rem 0 2rem',
          borderTop: `1px solid ${primaryColor}30`,
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div className="footer-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '3rem'
            }}>
              
              {/* Columna 1: Información de la institución */}
              <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {data.institucion_logo && (
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      borderRadius: '12px',
                      padding: '4px',
                      boxShadow: `0 4px 15px ${primaryColor}40`
                    }}>
                      <img 
                        src={getImageUrl(data.institucion_logo)} 
                        alt={data.institucion_nombre}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          background: '#fff',
                          borderRadius: '8px',
                          padding: '4px'
                        }}
                      />
                    </div>
                  )}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#fff',
                    lineHeight: 1.3
                  }}>
                    {data.institucion_nombre}
                  </h3>
                </div>
                
                <p style={{
                  margin: '0 0 1rem',
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}>
                  {data.institucion_iniciales} - Universidad Pública de El Alto
                </p>
                
                {data.institucion_direccion && (
                  <p style={{
                    margin: '0 0 1.5rem',
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}>
                    <span>📍</span>
                    <span>{data.institucion_direccion}</span>
                  </p>
                )}
                
                {/* Contactos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {data.institucion_celular1 && data.institucion_celular1 !== 2147483647 && (
                    <a 
                      href={`tel:${data.institucion_celular1}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'color 0.3s ease',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = secondaryColor;
                        e.currentTarget.style.background = `${primaryColor}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#cbd5e1';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📱</span>
                      <span>{data.institucion_celular1}</span>
                    </a>
                  )}
                  {data.institucion_correo1 && (
                    <a 
                      href={`mailto:${data.institucion_correo1}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'color 0.3s ease',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = secondaryColor;
                        e.currentTarget.style.background = `${secondaryColor}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#cbd5e1';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>✉️</span>
                      <span>{data.institucion_correo1}</span>
                    </a>
                  )}
                </div>

                {/* Redes Sociales con degradado */}
                <div>
                  <h4 style={{
                    margin: '0 0 1rem',
                    fontSize: '1rem',
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                      borderRadius: '2px'
                    }}></span>
                    Síguenos
                  </h4>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {data.institucion_facebook && (
                      <a 
                        href={data.institucion_facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, #1877F2, #0d5bd4)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px rgba(24,119,242,0.4)`
                        }}
                        title="Facebook"
                      >
                        f
                      </a>
                    )}
                    {data.institucion_youtube && (
                      <a 
                        href={data.institucion_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, #FF0000, #cc0000)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px rgba(255,0,0,0.4)`
                        }}
                        title="YouTube"
                      >
                        ▶
                      </a>
                    )}
                    {data.institucion_twitter && (
                      <a 
                        href={data.institucion_twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, #1DA1F2, #0d8bd9)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px rgba(29,161,242,0.4)`
                        }}
                        title="Twitter"
                      >
                        𝕏
                      </a>
                    )}
                    {data.institucion_celular1 && data.institucion_celular1 !== 2147483647 && (
                      <a 
                        href={`https://wa.me/${data.institucion_celular1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, #25D366, #1ebc57)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '1.2rem',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px rgba(37,211,102,0.4)`
                        }}
                        title="WhatsApp"
                      >
                        💬
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Columna 2: Navegación */}
              <div style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
                <h4 style={{
                  margin: '0 0 1.5rem',
                  fontSize: '1.1rem',
                  color: '#fff',
                  fontWeight: 700,
                  position: 'relative',
                  paddingBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    width: '20px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                    borderRadius: '2px'
                  }}></span>
                  Navegación
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="footer-link"
                        style={{
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          padding: '0.25rem 0',
                          position: 'relative',
                          paddingLeft: '1rem'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: `${secondaryColor}60`,
                          opacity: 0,
                          transition: 'all 0.3s ease'
                        }}></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna 3: Servicios */}
              <div style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
                <h4 style={{
                  margin: '0 0 1.5rem',
                  fontSize: '1.1rem',
                  color: '#fff',
                  fontWeight: 700,
                  position: 'relative',
                  paddingBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    width: '20px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${secondaryColor}, ${primaryColor})`,
                    borderRadius: '2px'
                  }}></span>
                  Servicios
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {servicios.map((servicio, index) => (
                    <li key={index}>
                      <a 
                        href={servicio.href} 
                        className="footer-link"
                        style={{
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          padding: '0.25rem 0',
                          position: 'relative',
                          paddingLeft: '1rem'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: `${primaryColor}60`,
                          opacity: 0,
                          transition: 'all 0.3s ease'
                        }}></span>
                        {servicio.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✅ Columna 4: Mapa con borde degradado - ANCHO COMPLETO RESPONSIVE */}
              <div style={{ 
                animation: 'fadeInUp 0.5s ease-out 0.3s both',
                gridColumn: '1 / -1',  // ✅ Ocupa todas las columnas del grid
                width: '100%'
              }}>
                <h4 style={{
                  margin: '0 0 1.5rem',
                  fontSize: '1.1rem',
                  color: '#fff',
                  fontWeight: 700,
                  position: 'relative',
                  paddingBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    width: '20px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                    borderRadius: '2px'
                  }}></span>
                  Ubicación
                </h4>
                
                {data.institucion_api_google_map ? (
                  <div style={{
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    boxShadow: `0 4px 30px ${primaryColor}40`,
                    border: `3px solid transparent`,
                    background: `linear-gradient(#1e293b, #1e293b) padding-box, linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) border-box`,
                    position: 'relative'
                  }}>
                    {/* ✅ Contenedor responsive con aspect-ratio */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '40%',  // ✅ Ratio ~2.5:1 (ancho:alto)
                      height: 0,
                      overflow: 'hidden'
                    }}>
                      <iframe
                        src={data.institucion_api_google_map}
                        title="Ubicación de la carrera"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0,
                          display: 'block'
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ) : (
                  <p style={{
                    margin: 0,
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <span>📍</span>
                    <span>{data.institucion_direccion || 'Av. Sucre Z. Villa Esperanza, Campus Upea Bloque B Piso 3'}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SECCIÓN DE LOGOS UTIC Y UPEA (Centro del footer) */}
        <div style={{
          background: `linear-gradient(180deg, #0f172a 0%, #1e293b 100%)`,
          padding: '3rem 0',
          borderTop: `1px solid ${primaryColor}20`,
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {/* Logo UTIC */}
            <a 
              href="https://utic.upea.bo/"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-institucional"
              style={{
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}
              title="Visitar UTIC"
            >
              <img 
                src="/utic 2.jpg"
                alt="UTIC - Universidad Pública de El Alto"
                style={{
                  height: '70px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </a>

            {/* Separador */}
            <span style={{
              width: '2px',
              height: '50px',
              background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
              borderRadius: '2px',
              display: 'inline-block'
            }}></span>

            {/* Logo UPEA */}
            <a 
              href="https://www.upea.edu.bo/"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-institucional"
              style={{
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}
              title="Visitar UPEA"
            >
              <img 
                src="/logo-upea.png"
                alt="UPEA - Universidad Pública de El Alto"
                style={{
                  height: '75px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </a>
          </div>
        </div>

        {/* ✅ COPYRIGHT CON ANIMACIÓN framer-motion */}
        <motion.div 
          style={{
            background: `linear-gradient(180deg, #020617 0%, #0f172a 100%)`,
            padding: '1.5rem 0',
            borderTop: `1px solid ${primaryColor}20`,
            textAlign: 'center'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{
            margin: 0,
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.9rem'
          }}>
            © Universidad Pública de El Alto | {currentYear} - UTIC{' '}
            <span style={{ fontWeight: 600 }}></span> || Web Developers{' '}
            <a 
              href="https://www.linkedin.com/in/albieri-laura-308686397/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                fontWeight: 600,
                color: '#93c5fd',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fde047'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#93c5fd'}
            >
              Albiery
            </a>
          </p>
        </motion.div>
      </footer>
    </>
  );
}