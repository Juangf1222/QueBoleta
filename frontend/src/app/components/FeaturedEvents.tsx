import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';

export function FeaturedEvents() {
  // 1. Creamos una variable de estado para guardar los eventos que lleguen de Java
  const [eventos, setEventos] = useState([]);

  // 2. Usamos useEffect para que "llame al mesero" justo cuando la página cargue
  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(respuesta => respuesta.json())
      .then(datos => setEventos(datos))
      .catch(error => console.error("Error conectando a la base de datos:", error));
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 3. Reemplazamos la lista estática por la variable 'eventos' que viene de Java */}
          {eventos.map((evento: any, index: number) => (
            <EventCard
              // Usamos el ID real de la base de datos en lugar del index
              key={evento.id} 
              id={evento.id ? evento.id.toString() : index.toString()} // Previene errores si el ID llega vacío
              
              // ¡Aquí está la magia! Conectamos la foto y la fecha reales
              image={evento.imagenUrl}
              date={evento.fecha}
              
              title={evento.nombre}
              location={evento.ciudad}
              price={`$${evento.precio}`}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}