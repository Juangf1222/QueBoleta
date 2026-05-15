import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#FF2D95]">
      {/* Gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#FF2D95]" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#7B2CFF] bg-clip-text text-transparent mb-4">
              QueBoleta
            </h3>
            <p className="text-gray-400 text-sm">
              Tu plataforma de confianza para la compra de entradas a eventos en Colombia.
            </p>
          </div>

          {/* Sobre QueBoleta */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sobre QueBoleta</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Trabaja con nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  Política de reembolso
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 mb-4">
              <li>
                <a href="mailto:info@queboleta.com" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  info@queboleta.com
                </a>
              </li>
              <li>
                <a href="tel:+573001234567" className="text-gray-400 hover:text-[#00C2FF] transition-colors text-sm">
                  +57 300 123 4567
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#7B2CFF] hover:to-[#9D4EDD] rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,44,255,0.5)]"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#FF2D95] hover:to-[#D91F7E] rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,45,149,0.5)]"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#00C2FF] hover:to-[#0099CC] rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,194,255,0.5)]"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#FFD166] hover:to-[#FF9F1C] rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,209,102,0.5)]"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 QueBoleta. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
