import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <div className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629276300230-34853d96aa2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBuZW9uJTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzcyMzk1NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0D0D0D]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Vive la experiencia{' '}
          <span className="bg-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#FF2D95] bg-clip-text text-transparent">
            en vivo
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Compra tus entradas fácil, rápido y seguro.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#7B2CFF] to-[#9D4EDD] text-white rounded-xl font-semibold text-lg hover:shadow-[0_0_30px_rgba(123,44,255,0.6)] transform hover:scale-105 transition-all duration-300">
            Explorar eventos
          </button>
          <button className="w-full sm:w-auto px-8 py-4 border-2 border-[#00C2FF] text-[#00C2FF] rounded-xl font-semibold text-lg hover:bg-[#00C2FF]/10 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300">
            Ver eventos destacados
          </button>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}