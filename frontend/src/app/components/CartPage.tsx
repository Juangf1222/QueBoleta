import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Ticket, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router';

interface CartItem {
  id: string;
  eventName: string;
  eventDate: string;
  location: string;
  ticketType: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      eventName: 'The Weeknd - After Hours Tour',
      eventDate: '15 Jun 2026',
      location: 'Movistar Arena, Bogotá',
      ticketType: 'VIP - Platea Alta',
      price: 350000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
    },
    {
      id: '2',
      eventName: 'Karol G - Mañana Será Bonito',
      eventDate: '22 Jul 2026',
      location: 'Estadio El Campín, Bogotá',
      ticketType: 'Preferencial',
      price: 280000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    },
    {
      id: '3',
      eventName: 'Coldplay - Music of the Spheres',
      eventDate: '10 Ago 2026',
      location: 'Estadio Atanasio Girardot, Medellín',
      ticketType: 'General',
      price: 220000,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#7B2CFF] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#00C2FF] rounded-full blur-[120px] opacity-10"></div>
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
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-[#7B2CFF]" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7B2CFF] via-[#9D4EFF] to-[#00C2FF] bg-clip-text text-transparent">
              Tu Carrito
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'evento seleccionado' : 'eventos seleccionados'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111111] rounded-2xl p-12 text-center border border-gray-800"
              >
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">Explora nuestros eventos y encuentra tu próxima experiencia</p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] text-white font-semibold hover:shadow-[0_0_30px_rgba(123,44,255,0.5)] transition-all duration-300"
                >
                  Ver eventos
                </Link>
              </motion.div>
            ) : (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111111] rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-[#7B2CFF]/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Event Image */}
                    <div className="flex-shrink-0">
                      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.eventName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2 truncate">{item.eventName}</h3>

                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-[#00C2FF]" />
                          {item.eventDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4 text-[#00C2FF]" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Ticket className="w-4 h-4 text-[#7B2CFF]" />
                          {item.ticketType}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">Cantidad:</span>
                          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-[#7B2CFF]/20 rounded text-gray-300 hover:text-[#7B2CFF] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-[#00C2FF]/20 rounded text-gray-300 hover:text-[#00C2FF] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              ${item.price.toLocaleString('es-CO')} × {item.quantity}
                            </p>
                            <p className="text-xl font-bold text-white">
                              ${(item.price * item.quantity).toLocaleString('es-CO')}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div
                className="bg-[#111111] rounded-2xl p-6 sticky top-24 border border-[#7B2CFF]/20"
                style={{
                  boxShadow: '0 0 40px rgba(123, 44, 255, 0.1)',
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Resumen del pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Cargo por servicio (5%)</span>
                    <span className="font-semibold">${serviceFee.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                      ${total.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                    boxShadow: '0 10px 30px rgba(123, 44, 255, 0.4)',
                  }}
                >
                  <span className="relative z-10">Proceder al Pago</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Security Info */}
                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <span className="text-[#00C2FF]">🔒</span> Pago 100% seguro
                  </p>
                  <p>Aceptamos todas las tarjetas de crédito y débito</p>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <p className="text-xs text-gray-500 text-center mb-3">Métodos de pago</p>
                  <div className="flex justify-center items-center gap-3 opacity-60">
                    <div className="w-10 h-7 bg-[#1a1a1a] rounded border border-gray-700 flex items-center justify-center text-[10px] text-gray-400">
                      VISA
                    </div>
                    <div className="w-10 h-7 bg-[#1a1a1a] rounded border border-gray-700 flex items-center justify-center text-[10px] text-gray-400">
                      MC
                    </div>
                    <div className="w-10 h-7 bg-[#1a1a1a] rounded border border-gray-700 flex items-center justify-center text-[10px] text-gray-400">
                      PSE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
