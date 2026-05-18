import { useState, useEffect } from 'react';
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
  Star,
  ShoppingCart // 🔥 Importamos el ícono del carrito
} from 'lucide-react';

export function EventDetailPage() {
  const { id } = useParams();
  
  const [evento, setEvento] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/eventos/${id}`)
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('Evento no encontrado');
        return respuesta.json();
      })
      .then(datos => {
        setEvento(datos);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <div className="min-h-screen bg-[#000000] flex items-center justify-center text-[#00C2FF] text-xl font-bold">Cargando detalles del evento...</div>;
  }

  if (error || !evento) {
    return <div className="min-h-screen bg-[#000000] flex items-center justify-center text-red-500 text-xl font-bold">Error: Evento no encontrado.</div>;
  }

  // Variables seguras (Chaleco antibalas por si falta algún dato en la BD)
  const fechaObj = new Date(evento.fechaHora || Date.now());
  const fechaFormateada = fechaObj.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const horaFormateada = fechaObj.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  
  const imagenBanner = evento.enlace || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400';
  const precioSeguro = evento.precio || 0;
  const aforoSeguro = evento.disponibilidad ?? evento.aforoDisponible ?? 0;
  const nombreSeguro = evento.nombre || "Evento sin nombre";
  const lugarSeguro = evento.lugar || "Lugar por definir";
  const ciudadSeguro = evento.ciudad ? ` - ${evento.ciudad}` : ""; // Solo pone el guion si la ciudad existe

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(aforoSeguro, quantity + delta));
    setQuantity(newQuantity);
  };

  const totalPrice = precioSeguro * quantity;

  // 🔥 NUEVA FUNCIÓN: Agrega al carrito en lugar de cobrar de una vez
  const handleAgregarAlCarrito = () => {
    const nuevoItem = {
      idEvento: id,
      nombre: nombreSeguro,
      imagen: imagenBanner,
      lugar: lugarSeguro,
      fecha: fechaFormateada,
      precio: precioSeguro,
      cantidad: quantity,
      total: totalPrice
    };

    const carritoGuardado = localStorage.getItem('carritoQueBoleta');
    let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const indiceExistente = carrito.findIndex((item: any) => item.idEvento === id);

    if (indiceExistente >= 0) {
      carrito[indiceExistente].cantidad += quantity;
      carrito[indiceExistente].total += totalPrice;
    } else {
      carrito.push(nuevoItem);
    }

    localStorage.setItem('carritoQueBoleta', JSON.stringify(carrito));
    alert(`🛒 ¡Se agregaron ${quantity} boletas de ${nombreSeguro} al carrito!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={imagenBanner}
          alt={nombreSeguro}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>

        <Link
          to="/"
          className="absolute top-6 left-6 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#7B2CFF] transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

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

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#7B2CFF]/20 border border-[#7B2CFF]/50 backdrop-blur-md text-[#7B2CFF] text-sm font-semibold mb-3">
                Admisión General
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {nombreSeguro}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                {lugarSeguro}{ciudadSeguro}
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
                    <p className="text-white font-semibold">{fechaFormateada}</p>
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
                    <p className="text-white font-semibold">{horaFormateada}</p>
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
                    <p className="text-white font-semibold">{lugarSeguro}</p>
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
                {evento.sinopsis || `¡No te pierdas de ${nombreSeguro} en ${lugarSeguro}! Compra tus boletas de manera segura a través de QueBoleta.`}
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FFD166] text-[#FFD166]" />
                  <span className="text-white font-semibold">5.0</span>
                  <span className="text-gray-400 text-sm">(Evento Verificado)</span>
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
              className="bg-[#111111] rounded-2xl p-6 border border-[#7B2CFF]/30 sticky top-24"
              style={{
                boxShadow: '0 0 40px rgba(123, 44, 255, 0.15)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Selecciona tus boletas</h2>

              <div className="space-y-3 mb-6">
                  <button
                    className="w-full p-4 rounded-xl border-2 text-left transition-all duration-300 border-[#7B2CFF] bg-[#7B2CFF]/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">Única Localidad</h3>
                        <p className="text-gray-400 text-sm">Acceso general al evento</p>
                      </div>
                      <div className="ml-3">
                        <Ticket className="w-5 h-5 text-[#7B2CFF]" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                        ${precioSeguro.toLocaleString('es-CO')}
                      </span>
                      <span className="text-sm text-gray-400 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {aforoSeguro} disponibles
                      </span>
                    </div>
                  </button>
              </div>

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
                    disabled={quantity >= aforoSeguro}
                    className="p-3 hover:bg-[#00C2FF]/20 rounded-lg text-gray-300 hover:text-[#00C2FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6 p-4 bg-[#0a0a0a] rounded-xl">
                <div className="flex justify-between text-gray-300">
                  <span>Precio unitario</span>
                  <span className="font-semibold">${precioSeguro.toLocaleString('es-CO')}</span>
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

              {/* 🔥 BOTÓN ACTUALIZADO PARA AGREGAR AL CARRITO */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAgregarAlCarrito}
                disabled={aforoSeguro === 0}
                className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                  boxShadow: '0 10px 30px rgba(123, 44, 255, 0.4)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al Carrito
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

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