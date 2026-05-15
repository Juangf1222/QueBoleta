import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? 'Login' : 'Register', { email, password, name });
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7B2CFF] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00C2FF] rounded-full blur-[120px] opacity-20"></div>
      </div>

      {/* Logo - Top Left */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 flex items-center gap-2 group cursor-pointer"
      >
        <Sparkles className="text-[#7B2CFF] w-8 h-8" />
        <span className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
          QueBoleta
        </span>
      </motion.a>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="bg-[#111111] rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(123, 44, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(123, 44, 255, 0.2)',
          }}
        >
          {/* Glow effect on top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent blur-sm"></div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-white">Bienvenido a </span>
              <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4EFF] to-[#00C2FF] bg-clip-text text-transparent">
                QueBoleta
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Inicia sesión para continuar' : 'Crea tu cuenta y empieza a disfrutar'}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-gray-300 text-sm mb-2">Nombre completo</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full bg-[#1a1a1a] text-white rounded-xl px-4 py-3.5 pr-4 outline-none transition-all duration-300 border border-transparent focus:border-[#7B2CFF] focus:shadow-[0_0_20px_rgba(123,44,255,0.3)] placeholder:text-gray-600"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-gray-300 text-sm mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[#1a1a1a] text-white rounded-xl px-4 py-3.5 pl-12 outline-none transition-all duration-300 border border-transparent focus:border-[#7B2CFF] focus:shadow-[0_0_20px_rgba(123,44,255,0.3)] placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] text-white rounded-xl px-4 py-3.5 pl-12 pr-12 outline-none transition-all duration-300 border border-transparent focus:border-[#7B2CFF] focus:shadow-[0_0_20px_rgba(123,44,255,0.3)] placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-[#00C2FF] hover:text-[#7B2CFF] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white text-lg mt-6 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                boxShadow: '0 10px 30px rgba(123, 44, 255, 0.4)',
              }}
            >
              <span className="relative z-10">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
            <span className="text-gray-500 text-sm">o</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 px-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-800 hover:border-[#7B2CFF] hover:bg-[#1f1f1f] transition-all duration-300 flex items-center justify-center gap-2 text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="py-3 px-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-800 hover:border-[#00C2FF] hover:bg-[#1f1f1f] transition-all duration-300 flex items-center justify-center gap-2 text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Toggle Login/Register */}
          <p className="text-center text-gray-400 text-sm mt-8">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#00C2FF] hover:text-[#7B2CFF] font-semibold transition-colors"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>

        {/* Bottom glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#7B2CFF] to-transparent opacity-10 blur-3xl pointer-events-none"></div>
      </motion.div>
    </div>
  );
}
