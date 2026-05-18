import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';

export function FeaturedEvents() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');
        return respuesta.json();
      })
      .then(datos => {
        console.log("Datos de eventos recibidos:", datos);
        // Validamos que sí sea un arreglo de datos
        if (Array.isArray(datos)) {
          setEventos(datos);
        } else {
          setEventos([]);
        }
        setCargando(false);
      })
      .catch(err => {
        console.error("Error conectando a la base de datos:", err);
        setError('No pudimos conectar con el servidor backend.');
        setCargando(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0D0D0D] to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Eventos <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-gray-400 text-lg">Los mejores eventos están esperando por ti</p>
        </div>

        {/* 1. Estado de carga */}
        {cargando && (
          <div className="text-center text-[#00C2FF] py-10 font-semibold">
            Cargando eventos...
          </div>
        )}

        {/* 2. Estado de error (Si el backend está apagado o bloquea) */}
        {error && !cargando && (
          <div className="text-center text-red-500 py-10 font-semibold border border-red-500/30 rounded-xl bg-red-500/10">
            {error} <br/> ¿Está encendido Spring Boot en el puerto 8080?
          </div>
        )}

        {/* 3. Estado vacío (Si conectó, pero no hay eventos en MySQL) */}
        {!cargando && !error && eventos.length === 0 && (
          <div className="text-center text-gray-400 py-10 border border-gray-800 rounded-xl border-dashed">
            <p className="text-xl font-bold text-white mb-2">Aún no hay eventos creados.</p>
            <p className="text-sm">Ve a Postman o a tu base de datos y crea un evento para que aparezca aquí.</p>
          </div>
        )}

        {/* 4. Estado de éxito (¡A dibujar tarjetas!) */}
        {!cargando && !error && eventos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventos.map((evento: any, index: number) => {
              const fechaFormateada = evento.fechaHora 
                ? new Date(evento.fechaHora).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }) 
                : 'Próximamente';
              
              return (
                <EventCard
                  key={evento.idEvento || index} 
                  id={evento.idEvento} 
                  image={evento.enlace || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600'}
                  date={fechaFormateada}
                  title={evento.nombre || 'Evento sin nombre'}
                  location={evento.lugar || 'Lugar por confirmar'}
                  price={`$${(evento.precio || 0).toLocaleString('es-CO')}`}
                  delay={index * 0.1}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}