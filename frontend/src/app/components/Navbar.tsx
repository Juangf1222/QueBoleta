import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const carritoGuardado = localStorage.getItem('carritoQueBoleta');
    if (carritoGuardado) {
      const carrito = JSON.parse(carritoGuardado);
      // Puedes contar la cantidad total de boletas, o la cantidad de eventos distintos. 
      // Por convención en e-commerce, se cuenta la cantidad de items distintos.
      setCartCount(carrito.length); 
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    // 1. Revisar si hay token de sesión
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    // 2. Revisar cuántas cosas hay en el carrito al cargar la página
    updateCartCount();

    // 3. 🎤 EL MICRÓFONO: Escuchar cambios en otras pestañas o ventanas
    window.addEventListener('storage', updateCartCount);

    // 4. 🎤 EL SEGUNDO MICRÓFONO: Como React Router no recarga la página, 
    // creamos un evento personalizado para que las páginas se hablen entre sí.
    window.addEventListener('cartUpdated', updateCartCount);

    // Apagar los micrófonos cuando el componente se destruya (por buenas prácticas)
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

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
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/perfil" className="flex items-center gap-2 px-3 py-2 border border-[#7B2CFF]/50 text-white rounded-xl hover:bg-[#7B2CFF]/10 hover:border-[#7B2CFF] hover:shadow-[0_0_15px_rgba(123,44,255,0.3)] transition-all duration-300">
                  <User className="w-5 h-5 text-[#7B2CFF]" />
                  <span className="hidden sm:block text-sm font-semibold">Mi Perfil</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-[#FF2D95] hover:bg-[#FF2D95]/10 rounded-xl transition-all duration-300"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hidden sm:block px-4 py-2 border border-[#00C2FF] text-[#00C2FF] rounded-xl hover:bg-[#00C2FF]/10 hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] transition-all duration-300 text-sm font-semibold">
                  Iniciar sesión
                </Link>
                
                <Link 
                  to="/login" 
                  state={{ isRegister: true }} 
                  className="px-4 py-2 bg-gradient-to-r from-[#7B2CFF] to-[#9D4EDD] text-white rounded-xl hover:shadow-[0_0_20px_rgba(123,44,255,0.5)] transition-all duration-300 text-sm font-semibold"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* El carrito */}
            <Link to="/cart" className="relative p-2 text-white hover:text-[#00C2FF] transition-colors ml-2">
              <ShoppingCart className="w-6 h-6" />
              {/* 🔥 AQUÍ ESTÁ EL CAMBIO: Ya no dice "3", ahora muestra la variable real. Y si está en 0, la bolita desaparece para que se vea más limpio. */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2D95] rounded-full text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
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