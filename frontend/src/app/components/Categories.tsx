import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Trophy, Theater, Sparkles, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

const iconMap: Record<string, any> = {
  'Music': Music,
  'Trophy': Trophy,
  'Theater': Theater,
  'Sparkles': Sparkles
};

const visualStyles = [
  { gradient: 'from-[#7B2CFF] to-[#9D4EDD]', glow: '0_0_30px_rgba(123,44,255,0.5)' },
  { gradient: 'from-[#00C2FF] to-[#0099CC]', glow: '0_0_30px_rgba(0,194,255,0.5)' },
  { gradient: 'from-[#FF2D95] to-[#D91F7E]', glow: '0_0_30px_rgba(255,45,149,0.5)' },
  { gradient: 'from-[#FFD166] to-[#FF9F1C]', glow: '0_0_30px_rgba(255,209,102,0.5)' }
];

export function Categories() {
  const [categoriasBD, setCategoriasBD] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/categorias')
      .then(res => res.json())
      .then(data => {
        setCategoriasBD(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar categorías:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <section className="py-16 px-4 bg-black min-h-[300px] flex items-center justify-center"></section>;
  }

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explora por <span className="bg-gradient-to-r from-[#FF2D95] to-[#FFD166] bg-clip-text text-transparent">Categoría</span>
          </h2>
          <p className="text-gray-400 text-lg">Encuentra exactamente lo que buscas</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categoriasBD.map((category, index) => {
            const Icon = iconMap[category.icono] || HelpCircle; 
            const style = visualStyles[index % visualStyles.length]; 

            return (
              <Link to={`/categorias?id=${category.idCategoria}`} key={category.idCategoria}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-[${style.glow}]`}>
                      <Icon className="w-10 h-10 sm:w-14 sm:h-14 text-white" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-center text-white font-semibold text-base sm:text-lg">
                      {category.nombre}
                    </h3>

                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}