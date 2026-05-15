import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';

interface EventCardProps {
  id?: string;
  image: string;
  title: string;
  date: string;
  location: string;
  price: string;
  delay?: number;
}

export function EventCard({ id = '1', image, title, date, location, price, delay = 0 }: EventCardProps) {
  return (
    <Link to={`/evento/${id}`}>
      <motion.div
        className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#7B2CFF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,44,255,0.3)] cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8 }}
      >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Calendar className="w-4 h-4 text-[#00C2FF]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-[#FF2D95]" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Desde</p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#FFD166] to-[#FF9F1C] bg-clip-text text-transparent">
              {price}
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-[#7B2CFF] to-[#9D4EDD] text-white text-sm rounded-lg hover:shadow-[0_0_20px_rgba(123,44,255,0.5)] transition-all duration-300">
            Comprar
          </button>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#FF2D95]" />
      </div>
    </motion.div>
    </Link>
  );
}
