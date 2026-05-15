import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Sparkles, Theater, Trophy, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

type Category = 'Todos' | 'Conciertos' | 'Festivales' | 'Teatro' | 'Deportes';

interface Event {
  id: string;
  name: string;
  category: Category;
  date: string;
  location: string;
  price: number;
  image: string;
}

const categories: Category[] = ['Todos', 'Conciertos', 'Festivales', 'Teatro', 'Deportes'];

const categoryIcons: Record<Category, any> = {
  'Todos': Sparkles,
  'Conciertos': Music,
  'Festivales': Sparkles,
  'Teatro': Theater,
  'Deportes': Trophy,
};

const events: Event[] = [
  {
    id: '1',
    name: 'The Weeknd - After Hours Tour',
    category: 'Conciertos',
    date: '15 Jun 2026',
    location: 'Movistar Arena, Bogotá',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
  },
  {
    id: '2',
    name: 'Karol G - Mañana Será Bonito',
    category: 'Conciertos',
    date: '22 Jul 2026',
    location: 'Estadio El Campín, Bogotá',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
  },
  {
    id: '3',
    name: 'Stereo Picnic 2026',
    category: 'Festivales',
    date: '25-27 Mar 2026',
    location: 'Parque Simón Bolívar, Bogotá',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
  },
  {
    id: '4',
    name: 'Lollapalooza Colombia',
    category: 'Festivales',
    date: '10-12 Sep 2026',
    location: 'Bogotá',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600',
  },
  {
    id: '5',
    name: 'El Rey León - Musical',
    category: 'Teatro',
    date: '05 May 2026',
    location: 'Teatro Mayor, Bogotá',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600',
  },
  {
    id: '6',
    name: 'Hamilton - Broadway',
    category: 'Teatro',
    date: '18 Jun 2026',
    location: 'Teatro Colón, Bogotá',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1512732351148-6c1886570412?w=600',
  },
  {
    id: '7',
    name: 'Colombia vs Argentina - Eliminatorias',
    category: 'Deportes',
    date: '30 Ago 2026',
    location: 'Estadio Metropolitano, Barranquilla',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
  },
  {
    id: '8',
    name: 'NBA Global Games - Lakers',
    category: 'Deportes',
    date: '15 Oct 2026',
    location: 'Movistar Arena, Bogotá',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
  },
  {
    id: '9',
    name: 'Coldplay - Music of the Spheres',
    category: 'Conciertos',
    date: '10 Ago 2026',
    location: 'Estadio Atanasio Girardot, Medellín',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600',
  },
  {
    id: '10',
    name: 'Bad Bunny - World Tour',
    category: 'Conciertos',
    date: '20 Sep 2026',
    location: 'Estadio Pascual Guerrero, Cali',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600',
  },
  {
    id: '11',
    name: 'Rock al Parque 2026',
    category: 'Festivales',
    date: '15-17 Jul 2026',
    location: 'Parque Simón Bolívar, Bogotá',
    price: 0,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
  },
  {
    id: '12',
    name: 'La Casa de Bernarda Alba',
    category: 'Teatro',
    date: '12 May 2026',
    location: 'Teatro Libre, Bogotá',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600',
  },
];

export function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredEvents = activeCategory === 'Todos'
    ? events
    : events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-[#7B2CFF] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-40 -right-32 w-[500px] h-[500px] bg-[#00C2FF] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C2FF] transition-colors mb-6 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4EFF] to-[#00C2FF] bg-clip-text text-transparent">
              Explorar Categorías
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Descubre eventos increíbles organizados por tipo
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-6 py-3 rounded-full font-semibold text-base
                    flex items-center gap-2 transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-[0_0_30px_rgba(123,44,255,0.5)]'
                      : 'text-gray-300 bg-[#1a1a1a] border border-gray-800 hover:border-[#7B2CFF]/50'
                    }
                  `}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                  } : {}}
                >
                  <Icon className="w-5 h-5" />
                  {category}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Events Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </p>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <Link to={`/evento/${event.id}`} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#111111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#7B2CFF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,44,255,0.2)]">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/50 text-white border border-white/20">
                      {event.category}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3">
                      {event.price === 0 ? (
                        <div className="px-3 py-1 rounded-lg backdrop-blur-md bg-[#00C2FF]/20 border border-[#00C2FF]/50">
                          <span className="text-sm font-bold text-[#00C2FF]">GRATIS</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-lg backdrop-blur-md bg-black/60 border border-white/20">
                          <span className="text-sm font-bold text-white">
                            ${event.price.toLocaleString('es-CO')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00C2FF] transition-colors">
                      {event.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-[#7B2CFF]" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4 text-[#00C2FF]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white font-semibold border border-gray-800 hover:border-[#7B2CFF] hover:bg-[#7B2CFF]/10 hover:text-[#7B2CFF] transition-all duration-300">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No hay eventos en esta categoría</h3>
            <p className="text-gray-500 mb-6">Prueba seleccionando otra categoría</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
