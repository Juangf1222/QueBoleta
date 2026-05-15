import { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Plus,
  Minus,
  Heart,
  Share2,
  Star
} from 'lucide-react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
}

interface EventDetail {
  id: string;
  name: string;
  artist: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  bannerImage: string;
  description: string;
  category: string;
  ticketTypes: TicketType[];
  rating: number;
  totalReviews: number;
}

const eventData: Record<string, EventDetail> = {
  '1': {
    id: '1',
    name: 'After Hours Tour',
    artist: 'The Weeknd',
    date: '15 Junio 2026',
    time: '20:00',
    location: 'Bogotá, Colombia',
    venue: 'Movistar Arena',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400',
    description: 'The Weeknd regresa a Colombia con su espectacular After Hours Tour. Una experiencia visual y musical única que combina sus mayores éxitos con un show de luces y producción de clase mundial. No te pierdas la oportunidad de ver en vivo a uno de los artistas más importantes de la música actual.',
    category: 'Conciertos',
    ticketTypes: [
      {
        id: 'vip',
        name: 'VIP - Platea Alta',
        price: 350000,
        available: 45,
        description: 'Zona preferencial con vista privilegiada al escenario'
      },
      {
        id: 'preferencial',
        name: 'Preferencial',
        price: 280000,
        available: 120,
        description: 'Excelente ubicación con buena vista al escenario'
      },
      {
        id: 'general',
        name: 'General',
        price: 180000,
        available: 300,
        description: 'Acceso general al evento'
      }
    ],
    rating: 4.8,
    totalReviews: 2456
  },
  '2': {
    id: '2',
    name: 'Mañana Será Bonito Tour',
    artist: 'Karol G',
    date: '22 Julio 2026',
    time: '19:30',
    location: 'Bogotá, Colombia',
    venue: 'Estadio El Campín',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400',
    description: 'La Bichota llega a Colombia con su tour "Mañana Será Bonito". Una noche llena de ritmo, energía y los mejores éxitos del reggaeton y música urbana. Karol G promete un espectáculo inolvidable con invitados especiales.',
    category: 'Conciertos',
    ticketTypes: [
      {
        id: 'vip',
        name: 'VIP Premium',
        price: 450000,
        available: 80,
        description: 'Zona VIP con acceso a lounge exclusivo'
      },
      {
        id: 'preferencial',
        name: 'Preferencial',
        price: 280000,
        available: 200,
        description: 'Excelente ubicación cerca del escenario'
      },
      {
        id: 'general',
        name: 'General',
        price: 150000,
        available: 500,
        description: 'Acceso general al estadio'
      }
    ],
    rating: 4.9,
    totalReviews: 3821
  }
};

export function EventDetailPage() {
  const { id } = useParams();
  const event = eventData[id || '1'] || eventData['1'];

  const [selectedTicketType, setSelectedTicketType] = useState<TicketType>(event.ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(selectedTicketType.available, quantity + delta));
    setQuantity(newQuantity);
  };

  const totalPrice = selectedTicketType.price * quantity;

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={event.bannerImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#7B2CFF] transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#FF2D95] transition-all"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF2D95] text-[#FF2D95]' : ''}`} />
          </button>
          <button className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#00C2FF] transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#7B2CFF]/20 border border-[#7B2CFF]/50 backdrop-blur-md text-[#7B2CFF] text-sm font-semibold mb-3">
                {event.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {event.artist}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                {event.name}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#7B2CFF]/10">
                    <Calendar className="w-5 h-5 text-[#7B2CFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fecha</p>
                    <p className="text-white font-semibold">{event.date}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00C2FF]/10">
                    <Clock className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hora</p>
                    <p className="text-white font-semibold">{event.time}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800 sm:col-span-2"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#FF2D95]/10">
                    <MapPin className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ubicación</p>
                    <p className="text-white font-semibold">{event.venue}</p>
                    <p className="text-gray-400 text-sm">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-[#111111] rounded-2xl p-6 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Sobre el evento</h2>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FFD166] text-[#FFD166]" />
                  <span className="text-white font-semibold">{event.rating}</span>
                  <span className="text-gray-400 text-sm">({event.totalReviews.toLocaleString()} reseñas)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Ticket Selection */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#111111] rounded-2xl p-6 border border-[#7B2CFF]/30 sticky top-6"
              style={{
                boxShadow: '0 0 40px rgba(123, 44, 255, 0.15)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Selecciona tus boletas</h2>

              {/* Ticket Type Selection */}
              <div className="space-y-3 mb-6">
                {event.ticketTypes.map((ticketType) => (
                  <button
                    key={ticketType.id}
                    onClick={() => {
                      setSelectedTicketType(ticketType);
                      setQuantity(1);
                    }}
                    className={`
                      w-full p-4 rounded-xl border-2 text-left transition-all duration-300
                      ${selectedTicketType.id === ticketType.id
                        ? 'border-[#7B2CFF] bg-[#7B2CFF]/10'
                        : 'border-gray-800 hover:border-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{ticketType.name}</h3>
                        <p className="text-gray-400 text-sm">{ticketType.description}</p>
                      </div>
                      <div className="ml-3">
                        <Ticket className={`w-5 h-5 ${selectedTicketType.id === ticketType.id ? 'text-[#7B2CFF]' : 'text-gray-600'}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                        ${ticketType.price.toLocaleString('es-CO')}
                      </span>
                      <span className="text-sm text-gray-400">
                        <Users className="w-4 h-4 inline mr-1" />
                        {ticketType.available} disponibles
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Cantidad</label>
                <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-[#7B2CFF]/20 rounded-lg text-gray-300 hover:text-[#7B2CFF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= selectedTicketType.available}
                    className="p-3 hover:bg-[#00C2FF]/20 rounded-lg text-gray-300 hover:text-[#00C2FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6 p-4 bg-[#0a0a0a] rounded-xl">
                <div className="flex justify-between text-gray-300">
                  <span>Precio unitario</span>
                  <span className="font-semibold">${selectedTicketType.price.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Cantidad</span>
                  <span className="font-semibold">× {quantity}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                    ${totalPrice.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group mb-4"
                style={{
                  background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                  boxShadow: '0 10px 30px rgba(123, 44, 255, 0.4)',
                }}
              >
                <span className="relative z-10">Agregar al Carrito</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Security Info */}
              <div className="text-center text-xs text-gray-500 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <span className="text-[#00C2FF]">🔒</span> Compra 100% segura
                </p>
                <p>Tus datos están protegidos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
