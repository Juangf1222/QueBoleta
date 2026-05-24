import { useEffect, useState } from 'react';

import {
  Ticket,
  Calendar,
  MapPin,
  QrCode
} from 'lucide-react';

import { Navbar } from './Navbar';

export default function ProfilePage() {

  // =========================================
  // STATES
  // =========================================

  const [entradas, setEntradas] =
    useState<any[]>([]);

  const [usuario, setUsuario] =
    useState<any>(null);

  const [cargando, setCargando] =
    useState(true);

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem('token');

    const nombre =
      localStorage.getItem('nombre');

    const correo =
      localStorage.getItem('correo');

    setUsuario({
      nombre,
      correo
    });

    fetch(
      'http://localhost:8080/api/entradas/mis-entradas',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

      .then(res => {

        if (!res.ok) {

          throw new Error(
            'Error cargando entradas'
          );
        }

        return res.json();
      })

      .then(data => {

        setEntradas(data);

        setCargando(false);
      })

      .catch(error => {

        console.error(error);

        setCargando(false);
      });

  }, []);

  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-black text-white overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <section className="pt-32 pb-16 px-6">

        <div className="max-w-6xl mx-auto">

          {/* PERFIL */}
          <div className="mb-14">

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(123,44,255,0.08)]">

              <div className="flex flex-col md:flex-row items-center gap-8">

                {/* AVATAR */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] flex items-center justify-center text-4xl font-bold shadow-[0_0_40px_rgba(123,44,255,0.5)]">

                  {usuario?.nombre
                    ? usuario.nombre
                        .charAt(0)
                        .toUpperCase()
                    : 'U'}

                </div>

                {/* INFO */}
                <div className="text-center md:text-left flex-1">

                  <h1 className="text-5xl font-bold mb-3">

                    {usuario?.nombre ||
                      'Usuario'}

                  </h1>

                  <p className="text-gray-400 text-lg mb-4">

                    {usuario?.correo ||
                      'correo@queboleta.com'}

                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF]">

                    <Ticket className="w-5 h-5" />

                    <span className="font-semibold">

                      {entradas.length} entradas compradas

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* CARGANDO */}
          {cargando && (

            <div className="text-center py-20">

              <div className="animate-pulse text-[#00C2FF] text-xl">

                Cargando entradas...

              </div>

            </div>

          )}

          {/* SIN ENTRADAS */}
          {!cargando &&
            entradas.length === 0 && (

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-3xl font-bold mb-4">

                No tienes entradas aún

              </h2>

              <p className="text-gray-400">

                Compra tu primer evento y aparecerá aquí ✨

              </p>

            </div>

          )}

          {/* ENTRADAS */}
          {!cargando &&
            entradas.length > 0 && (

            <div className="grid gap-8">

              {entradas.map((entrada: any) => (

                <div
                  key={entrada.idEntrada}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#00C2FF]/40 transition-all duration-500 shadow-[0_0_30px_rgba(123,44,255,0.08)]"
                >

                  {/* GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CFF]/5 to-[#00C2FF]/5 pointer-events-none" />

                  <div className="relative grid md:grid-cols-[1fr_250px]">

                    {/* INFO */}
                    <div className="p-8">

                      <div className="flex items-center gap-3 mb-6">

                        <div className="px-4 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-sm font-semibold">

                          {entrada.estado}

                        </div>

                      </div>

                      <h2 className="text-3xl font-bold mb-6">

                        {entrada.evento?.nombre ||
                          'Evento sin nombre'}

                      </h2>

                      <div className="space-y-4">

                        <div className="flex items-center gap-3 text-gray-300">

                          <Calendar className="w-5 h-5 text-[#00C2FF]" />

                          <span>

                            {entrada.evento?.fechaHora
                              ? new Date(
                                  entrada.evento.fechaHora
                                ).toLocaleDateString(
                                  'es-CO',
                                  {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  }
                                )
                              : 'Fecha no disponible'}

                          </span>

                        </div>

                        <div className="flex items-center gap-3 text-gray-300">

                          <MapPin className="w-5 h-5 text-[#FF2D95]" />

                          <span>

                            {entrada.evento?.lugar ||
                              'Lugar por confirmar'}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* QR */}
                    <div className="border-t md:border-t-0 md:border-l border-dashed border-white/10 flex flex-col items-center justify-center p-8 bg-black/20">

                      <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,255,255,0.2)]">

                        <QrCode className="w-20 h-20 text-black" />

                      </div>

                      <p className="text-xs text-center text-gray-400 break-all">

                        {entrada.codigoQR}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}