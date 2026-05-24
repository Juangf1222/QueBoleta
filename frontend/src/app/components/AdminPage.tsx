import { useEffect, useState } from 'react';

export function AdminPage() {

  // =========================================
  // STATES
  // =========================================
  const [eventos, setEventos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [artista, setArtista] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [aforoDisponible, setAforoDisponible] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [estado, setEstado] =
    useState('ACTIVO');

  const [cargando, setCargando] = useState(true);

  // =========================================
  // CARGAR EVENTOS
  // =========================================
  const cargarEventos = () => {

    fetch('http://localhost:8080/api/eventos')

      .then(res => {

        if (!res.ok) {
          throw new Error(
            'Error cargando eventos'
          );
        }

        return res.json();
      })

      .then(data => {

        setEventos(data);
        setCargando(false);
      })

      .catch(error => {

        console.error(error);

        setCargando(false);
      });
  };

  const cargarCategorias = () => {

  fetch(
    'http://localhost:8080/api/categorias'
  )

    .then(res => res.json())

    .then(data => {

      setCategorias(data);
    })

    .catch(error => {

      console.error(
        'Error cargando categorías',
        error
      );
    });
};

  // =========================================
  // USE EFFECT
  // =========================================
  useEffect(() => {

    cargarEventos();

    cargarCategorias();

  }, []);

  // =========================================
  // CREAR / EDITAR EVENTO
  // =========================================
  const crearEvento = async () => {

    if (
      !nombre ||
      !artista ||
      !lugar ||
      !fechaHora ||
      !sinopsis ||
      !precio ||
      !aforoDisponible ||
      !idCategoria
    ) {

      alert(
        'Completa todos los campos'
      );

      return;
    }

    const nuevoEvento = {

      nombre,
      artista,
      lugar,
      fechaHora,
      sinopsis,

      precio: Number(precio),

      aforoDisponible:
        Number(aforoDisponible),

      estado,

      idCategoria:
        Number(idCategoria),

      enlace: imagen
    };

    try {

      const token =
        localStorage.getItem('token');

      console.log(token);

      const eventoEditando =
        localStorage.getItem(
          'eventoEditando'
        );

      let url =
        'http://localhost:8080/api/eventos';

      let metodo: 'POST' | 'PUT' =
        'POST';

      if (eventoEditando) {

        url =
          `http://localhost:8080/api/eventos/${eventoEditando}`;

        metodo = 'PUT';
      }

      const respuesta = await fetch(
        url,
        {

          method: metodo,

          headers: {

            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify(
            nuevoEvento
          )
        }
      );

      console.log(respuesta);

      if (!respuesta.ok) {

        throw new Error(
          'Error guardando evento'
        );
      }

      alert(
        eventoEditando
          ? 'Evento actualizado'
          : 'Evento creado'
      );

      // limpiar
      setNombre('');
      setArtista('');
      setLugar('');
      setFechaHora('');
      setSinopsis('');
      setPrecio('');
      setAforoDisponible('');
      setIdCategoria('');
      setImagen('');
      setEstado('ACTIVO');

      localStorage.removeItem(
        'eventoEditando'
      );

      cargarEventos();

    } catch (error) {

      console.error(error);

      alert(
        'No se pudo guardar el evento'
      );
    }
  };

  // =========================================
  // ELIMINAR EVENTO
  // =========================================
  const eliminarEvento = async (
    id: string
  ) => {

    const confirmar = window.confirm(
      '¿Eliminar evento?'
    );

    if (!confirmar) return;

    try {

      const token =
        localStorage.getItem('token');

      const respuesta = await fetch(
        `http://localhost:8080/api/eventos/${id}`,
        {

          method: 'DELETE',

          headers: {

            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (!respuesta.ok) {

        throw new Error(
          'Error eliminando evento'
        );
      }

      cargarEventos();

    } catch (error) {

      console.error(error);

      alert(
        'No se pudo eliminar el evento'
      );
    }
  };

  // =========================================
  // RENDER
  // =========================================
  return (

    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">

      {/* TITULO */}
      <h1 className="text-4xl font-bold mb-8">

        Panel Administrador

      </h1>

      {/* ========================================= */}
      {/* FORMULARIO */}
      {/* ========================================= */}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6">

          Crear / Editar Evento

        </h2>

        <div className="grid gap-4">

          {/* NOMBRE */}
          <input
            type="text"
            placeholder="Nombre del evento"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* ARTISTA */}
          <input
            type="text"
            placeholder="Artista"
            value={artista}
            onChange={(e) =>
              setArtista(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* LUGAR */}
          <input
            type="text"
            placeholder="Lugar"
            value={lugar}
            onChange={(e) =>
              setLugar(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* FECHA */}
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) =>
              setFechaHora(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* PRECIO */}
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) =>
              setPrecio(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* AFORO */}
          <input
            type="number"
            placeholder="Aforo disponible"
            value={aforoDisponible}
            onChange={(e) =>
              setAforoDisponible(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* SINOPSIS */}
          <textarea
            placeholder="Sinopsis"
            value={sinopsis}
            onChange={(e) =>
              setSinopsis(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3 min-h-[120px]"
          />

          <select
          value={idCategoria}
          onChange={(e) =>
            setIdCategoria(
              e.target.value
            )
          }
          className="bg-black/40 border border-white/10 rounded-xl p-3"
          >
            <option value="">
              Selecciona categoría
              </option>
              {categorias.map((categoria: any) => (
                <option
                key={categoria.idCategoria}
                value={categoria.idCategoria}
                >
                  {categoria.nombre}
                  </option>
                ))}
          </select>

          {/* ESTADO */}
          <select
            value={estado}
            onChange={(e) =>
              setEstado(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          >

            <option value="ACTIVO">
              ACTIVO
            </option>

            <option value="PROXIMAMENTE">
              PROXIMAMENTE
            </option>

            <option value="CANCELADO">
              CANCELADO
            </option>

          </select>

          {/* IMAGEN */}
          <input
            type="text"
            placeholder="URL Imagen"
            value={imagen}
            onChange={(e) =>
              setImagen(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-xl p-3"
          />

          {/* BOTON */}
          <button
            onClick={crearEvento}
            className="bg-[#7B2CFF] hover:bg-[#6822db] transition-all duration-300 p-3 rounded-xl font-bold"
          >

            Guardar Evento

          </button>

        </div>

      </div>

      {/* ========================================= */}
      {/* EVENTOS */}
      {/* ========================================= */}

      <div className="grid gap-6">

        {cargando && (

          <div className="text-center text-[#00C2FF]">

            Cargando eventos...

          </div>

        )}

        {!cargando &&
          eventos.length === 0 && (

          <div className="text-center text-gray-400">

            No hay eventos creados

          </div>

        )}

        {!cargando &&
          eventos.map((evento: any) => (

          <div
            key={evento.idEvento}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center gap-6"
          >

            {/* INFO */}
            <div>

              <h2 className="text-2xl font-bold mb-2">

                {evento.nombre}

              </h2>

              <p className="text-gray-400">

                {evento.lugar}

              </p>

              <p className="text-[#00C2FF] mt-2 font-bold">

                ${evento.precio?.toLocaleString('es-CO')}

              </p>

              <p className="text-sm text-gray-500 mt-2">

                Estado: {evento.estado}

              </p>

            </div>

            {/* BOTONES */}
            <div className="flex gap-3">

              <button
                onClick={() => {

                  setNombre(
                    evento.nombre
                  );

                  setArtista(
                    evento.artista
                  );

                  setLugar(
                    evento.lugar
                  );

                  setFechaHora(
                    evento.fechaHora?.slice(0, 16)
                  );

                  setSinopsis(
                    evento.sinopsis
                  );

                  setPrecio(
                    evento.precio
                      .toString()
                  );

                  setAforoDisponible(
                    evento.aforoDisponible
                      .toString()
                  );

                  setIdCategoria(
                    evento.idCategoria
                      ?.toString() || ''
                  );

                  setImagen(
                    evento.enlace || ''
                  );

                  setEstado(
                    evento.estado
                  );

                  localStorage.setItem(
                    'eventoEditando',
                    evento.idEvento
                  );
                }}

                className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 px-4 py-2 rounded-xl font-semibold"
              >

                Editar

              </button>

              <button
                onClick={() =>
                  eliminarEvento(
                    evento.idEvento
                  )
                }
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-xl font-semibold"
              >

                Eliminar

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}