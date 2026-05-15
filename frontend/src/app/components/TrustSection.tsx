import { Shield, Smartphone, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Shield,
    title: 'Pago seguro',
    description: 'Transacciones 100% protegidas',
    color: 'from-[#7B2CFF] to-[#9D4EDD]'
  },
  {
    icon: Smartphone,
    title: 'Entradas digitales',
    description: 'Acceso instantáneo desde tu móvil',
    color: 'from-[#00C2FF] to-[#0099CC]'
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Estamos aquí para ayudarte',
    color: 'from-[#FF2D95] to-[#D91F7E]'
  }
];

export function TrustSection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
