import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] via-[#00C2FF] to-[#7B2CFF] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer">
              QueBoleta
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artista, evento o ciudad"
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-[#00C2FF]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00C2FF] focus:shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block px-4 py-2 border border-[#00C2FF] text-[#00C2FF] rounded-xl hover:bg-[#00C2FF]/10 hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] transition-all duration-300">
              Iniciar sesión
            </Link>
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-[#7B2CFF] to-[#9D4EDD] text-white rounded-xl hover:shadow-[0_0_20px_rgba(123,44,255,0.5)] transition-all duration-300">
              Registrarse
            </Link>
            <Link to="/cart" className="relative p-2 text-white hover:text-[#00C2FF] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2D95] rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-[#00C2FF]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00C2FF] focus:shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-all duration-300"
          />
        </div>
      </div>
    </nav>
  );
}
