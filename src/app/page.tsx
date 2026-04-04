'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, CheckCircle, Users, Briefcase, Globe } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AE</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">Administración</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#programa" className="text-foreground hover:text-primary transition">
              Programa
            </Link>
            <Link href="#ventajas" className="text-foreground hover:text-primary transition">
              Ventajas
            </Link>
            <Link href="#carreras" className="text-foreground hover:text-primary transition">
              Carreras
            </Link>
            <Link href="#contacto" className="text-foreground hover:text-primary transition">
              Contacto
            </Link>
          </div>

          <button className="hidden md:inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
            Solicitar Información
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              <Link href="#programa" className="text-foreground hover:text-primary transition">
                Programa
              </Link>
              <Link href="#ventajas" className="text-foreground hover:text-primary transition">
                Ventajas
              </Link>
              <Link href="#carreras" className="text-foreground hover:text-primary transition">
                Carreras
              </Link>
              <Link href="#contacto" className="text-foreground hover:text-primary transition">
                Contacto
              </Link>
              <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
                Solicitar Información
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-business.jpg"
            alt="Profesionales en oficina"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Forma el futuro de la gestión empresarial
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl">
              Nuestro programa de Administración de Empresas te prepara para liderar en el mundo corporativo moderno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition flex items-center justify-center gap-2">
                Solicitar Información <ArrowRight size={20} />
              </button>
              <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition border border-white/40">
                Ver Plan de Estudio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section id="programa" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Un programa diseñado para el éxito
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestra licenciatura en Administración de Empresas combina teoría rigurosa con aplicación práctica del mundo real.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={32} />,
                title: 'Facultad Experta',
                description: 'Aprende de profesores con experiencia empresarial de décadas en industrias líderes.'
              },
              {
                icon: <Briefcase size={32} />,
                title: 'Prácticas Profesionales',
                description: 'Acceso a pasantías y prácticas en empresas del Fortune 500.'
              },
              {
                icon: <Globe size={32} />,
                title: 'Perspectiva Global',
                description: 'Estudios sobre negocios internacionales y oportunidades de intercambio.'
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-muted rounded-xl hover:shadow-lg transition">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/curriculum.jpg"
                alt="Aula moderna de administración"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Currículo Integral y Actualizado
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Gestión estratégica y análisis empresarial',
                  'Finanzas corporativas y contabilidad',
                  'Marketing y gestión comercial',
                  'Recursos humanos y desarrollo organizacional',
                  'Emprendimiento e innovación',
                  'Sistemas de información empresarial'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition">
                Descargar Plan de Estudio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="ventajas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">
            Por qué elegir nuestro programa
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Acreditación Internaciona', desc: 'Reconocido por organismos de acreditación empresarial a nivel mundial.' },
              { title: 'Red Alumni Fuerte', desc: 'Conecta con más de 15,000 profesionales en posiciones directivas.' },
              { title: 'Bolsa de Empleo', desc: 'Acceso a ofertas laborales exclusivas de empresas líderes.' },
              { title: 'Formación Continua', desc: 'Actualizaciones curriculares según tendencias del mercado.' },
              { title: 'Flexible Schedule', desc: 'Modalidades presencial, virtual e híbrida disponibles.' },
              { title: 'Becas Disponibles', desc: 'Programas de apoyo financiero para estudiantes destacados.' }
            ].map((item, i) => (
              <div key={i} className="p-6 border border-border rounded-xl hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="carreras" className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-6">
            Oportunidades Profesionales
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Nuestros graduados trabajan en roles de liderazgo en empresas multinacionales, startups innovadoras y organizaciones públicas.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="relative h-64">
                <Image
                  src="/careers.jpg"
                  alt="Profesionales colaborando"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ejecutivos y Directores
                </h3>
                <p className="text-muted-foreground mb-4">
                  Prepárate para roles de alto nivel en dirección general, finanzas y operaciones.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['CEO', 'CFO', 'COO', 'Gerente General'].map(job => (
                    <span key={job} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">Consultoría Empresarial</h4>
                <p className="text-muted-foreground text-sm">Optimización de procesos y estrategia corporativa</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">Emprendimiento</h4>
                <p className="text-muted-foreground text-sm">Crea tu propio negocio con fundamentos sólidos</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">Sector Público</h4>
                <p className="text-muted-foreground text-sm">Gestión pública y organismos internacionales</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">Finanzas e Inversión</h4>
                <p className="text-muted-foreground text-sm">Análisis financiero y gestión de carteras</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para transformar tu carrera?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Solicita información sobre nuestro programa y conoce los pasos para comenzar tu viaje hacia el éxito empresarial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-6 py-3 rounded-lg text-foreground flex-1 max-w-xs"
            />
            <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition">
              Solicitar Información
            </button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            Nos pondremos en contacto contigo en las próximas 24 horas.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Universidad</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100 transition">Acerca de</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Contacto</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Ubicaciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programa</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100 transition">Plan de Estudio</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Facultad</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Inscripción</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100 transition">Blog</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Eventos</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Documentos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Twitter</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2024 Universidad Profesional. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
