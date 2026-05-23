import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.5)] border border-white/20"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.5)] border border-white/20"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}

export function ComingSoon() {
  // 🔥 1. Estado para almacenar los eventos que vienen de la BD
  const [comingSoonEvents, setComingSoonEvents] = useState<any[]>([]);

  // 🔥 2. Llamada a tu nuevo endpoint
  useEffect(() => {
    fetch('http://localhost:8080/api/eventos/proximos')
      .then(res => res.json())
      .then(data => setComingSoonEvents(data))
      .catch(err => console.error("Error cargando eventos próximos:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: comingSoonEvents.length > 3, // Evita errores si hay pocos eventos
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: comingSoonEvents.length > 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: comingSoonEvents.length > 1
        }
      }
    ]
  };

  // 🔥 3. Si no hay eventos próximos creados en MySQL, ocultamos la sección para mantener la vista limpia
  if (comingSoonEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-[#0D0D0D] relative overflow-hidden">
      {/* Subtle particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#7B2CFF]/10 border border-[#7B2CFF]/30 rounded-full mb-4">
            <span className="text-[#7B2CFF] font-semibold">PRÓXIMAMENTE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lo que viene <span className="bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] bg-clip-text text-transparent">será épico</span>
          </h2>
          <p className="text-gray-400 text-lg">Mantente atento a estos increíbles eventos</p>
        </div>

        <div className="coming-soon-slider">
          <Slider {...settings}>
            {/* 🔥 4. Mapeo dinámico usando las variables de tu backend */}
            {comingSoonEvents.map((event) => {
              // Formateamos la fecha para que se vea como "Mayo 2026"
              const fechaFormateada = new Date(event.fechaHora).toLocaleDateString('es-CO', {
                month: 'long',
                year: 'numeric'
              }).replace(/^\w/, (c) => c.toUpperCase()); // Capitaliza el mes

              return (
                <div key={event.idEvento} className="px-3">
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#00C2FF]/50 transition-all duration-300 group">
                    {/* Próximamente Badge */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF2D95] rounded-full text-xs font-semibold text-white shadow-lg shadow-[#FF2D95]/20">
                      Próximamente
                    </div>

                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={event.enlace || 'https://images.unsplash.com/photo-1629276300230-34853d96aa2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBuZW9uJTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzcyMzk1NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080'} 
                        alt={event.nombre}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-1">
                        {event.nombre}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Calendar className="w-4 h-4 text-[#00C2FF]" />
                          <span>{fechaFormateada}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <MapPin className="w-4 h-4 text-[#FF2D95]" />
                          <span className="line-clamp-1">{event.lugar}</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg border border-white/20 transition-all duration-300">
                        Notificarme
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <style>{`
        .coming-soon-slider .slick-dots {
          bottom: -40px;
        }
        .coming-soon-slider .slick-dots li button:before {
          color: #7B2CFF;
          font-size: 10px;
        }
        .coming-soon-slider .slick-dots li.slick-active button:before {
          color: #00C2FF;
        }
        .coming-soon-slider .slick-list {
          padding: 0 !important;
        }
        .coming-soon-slider .slick-track {
          display: flex;
          gap: 0;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}