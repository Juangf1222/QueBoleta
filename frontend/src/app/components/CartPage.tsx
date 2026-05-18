import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Ticket, MapPin, Calendar, CreditCard, User, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

interface CartItem {
  idEvento: string;
  nombre: string;
  imagen: string;
  lugar: string;
  fecha: string;
  precio: number;
  cantidad: number;
  total: number;
}

export function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [nombreForm, setNombreForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [tarjetaForm, setTarjetaForm] = useState('');
  const [cvvForm, setCvvForm] = useState('');

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoQueBoleta');
    if (carritoGuardado) {
      setCartItems(JSON.parse(carritoGuardado));
    }
  }, []);

  const updateQuantity = (idEvento: string, delta: number) => {
    const newCart = cartItems.map(item =>
      item.idEvento === idEvento
        ? { 
            ...item, 
            cantidad: Math.max(1, item.cantidad + delta),
            total: Math.max(1, item.cantidad + delta) * item.precio
          }
        : item
    );
    setCartItems(newCart);
    localStorage.setItem('carritoQueBoleta', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (idEvento: string) => {
    const newCart = cartItems.filter(item => item.idEvento !== idEvento);
    setCartItems(newCart);
    localStorage.setItem('carritoQueBoleta', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("¡Alto ahí! Debes iniciar sesión primero para poder pagar.");
      navigate('/login');
      return;
    }

    if (tarjetaForm.length !== 16) {
      alert("La tarjeta debe tener exactamente 16 números.");
      return;
    }
    if (cvvForm.length < 3 || cvvForm.length > 4) {
      alert("El CVV debe tener 3 o 4 números.");
      return;
    }

    setIsProcessing(true);

    try {
      for (const item of cartItems) {
        const paqueteCompra = {
          idEvento: item.idEvento,
          cantidad: item.cantidad,
          metodoPago: "TARJETA_CREDITO",
          email: emailForm, 
          nombre: nombreForm, 
          numeroTarjeta: tarjetaForm, 
          cvv: cvvForm 
        };

        const respuesta = await fetch('http://localhost:8080/api/compras', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(paqueteCompra)
        });

        // 🔥 AQUÍ ESTÁ EL ARREGLO: Leemos el error una sola vez de forma segura
        if (!respuesta.ok) {
          const errorText = await respuesta.text(); // Leemos como texto primero
          let mensajeError = errorText;
          
          try {
            // Intentamos ver si ese texto en realidad era un JSON camuflado
            const errorData = JSON.parse(errorText);
            mensajeError = errorData.mensaje || errorData.error || errorText;
          } catch (err) {
            // Si falla, no pasa nada, nos quedamos con el texto original de Java
          }
          
          throw new Error(mensajeError || `Error de servidor HTTP ${respuesta.status}`);
        }
      }

      localStorage.removeItem('carritoQueBoleta');
      setCartItems([]);
      window.dispatchEvent(new Event('cartUpdated')); 
      alert("🎉 ¡PAGO EXITOSO! Tus boletas se han comprado correctamente.");
      navigate('/'); 
      
    } catch (error: any) {
      console.error("Error en checkout:", error);
      alert(`❌ Falló la compra: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#7B2CFF] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#00C2FF] rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C2FF] transition-colors mb-6 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111111] rounded-2xl p-12 text-center border border-gray-800">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">Explora nuestros eventos y encuentra tu próxima experiencia</p>
                <Link to="/" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] text-white font-semibold hover:shadow-[0_0_30px_rgba(123,44,255,0.5)] transition-all duration-300">
                  Ver eventos
                </Link>
              </motion.div>
            ) : (
              cartItems.map((item, index) => (
                <motion.div key={item.idEvento} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#111111] rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-[#7B2CFF]/30 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden relative">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2 truncate">{item.nombre}</h3>
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400"><Calendar className="w-4 h-4 text-[#00C2FF]" />{item.fecha}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400"><MapPin className="w-4 h-4 text-[#00C2FF]" />{item.lugar}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400"><Ticket className="w-4 h-4 text-[#7B2CFF]" />Admisión General</div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">Cantidad:</span>
                          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-1">
                            <button type="button" onClick={() => updateQuantity(item.idEvento, -1)} className="p-1.5 hover:bg-[#7B2CFF]/20 rounded text-gray-300 hover:text-[#7B2CFF] transition-colors"><Minus className="w-4 h-4" /></button>
                            <span className="w-8 text-center font-semibold text-white">{item.cantidad}</span>
                            <button type="button" onClick={() => updateQuantity(item.idEvento, 1)} className="p-1.5 hover:bg-[#00C2FF]/20 rounded text-gray-300 hover:text-[#00C2FF] transition-colors"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">${item.precio.toLocaleString('es-CO')} × {item.cantidad}</p>
                            <p className="text-xl font-bold text-white">${item.total.toLocaleString('es-CO')}</p>
                          </div>
                          <button type="button" onClick={() => removeItem(item.idEvento)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <form onSubmit={handleCheckout} className="bg-[#111111] rounded-2xl p-6 sticky top-24 border border-[#7B2CFF]/20" style={{ boxShadow: '0 0 40px rgba(123, 44, 255, 0.1)' }}>
                
                <h2 className="text-xl font-bold text-white mb-4">Datos de Pago</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Nombre en la tarjeta</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input required type="text" value={nombreForm} onChange={(e) => setNombreForm(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-[#7B2CFF] transition-colors" placeholder="Ej. Juan Pérez" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Correo de contacto</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input required type="email" value={emailForm} onChange={(e) => setEmailForm(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-[#7B2CFF] transition-colors" placeholder="correo@ejemplo.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Número de Tarjeta</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input required type="text" maxLength={16} value={tarjetaForm} onChange={(e) => setTarjetaForm(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-[#7B2CFF] transition-colors" placeholder="16 dígitos" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">CVV</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input required type="text" maxLength={4} value={cvvForm} onChange={(e) => setCvvForm(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-[#7B2CFF] transition-colors" placeholder="3 o 4 dígitos" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800 my-6"></div>

                <h2 className="text-xl font-bold text-white mb-4">Resumen del pedido</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Cargo por servicio (5%)</span>
                    <span className="font-semibold">${serviceFee.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                      ${total.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isProcessing} className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group mb-4 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)', boxShadow: '0 10px 30px rgba(123, 44, 255, 0.4)' }}>
                  <span className="relative z-10">{isProcessing ? 'Procesando Pago...' : 'Pagar Ahora'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p className="flex items-center justify-center gap-1"><span className="text-[#00C2FF]">🔒</span> Pago 100% seguro</p>
                  <p>Aceptamos todas las tarjetas de crédito y débito</p>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}