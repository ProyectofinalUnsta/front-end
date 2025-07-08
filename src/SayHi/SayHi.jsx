import { useGetEventsById } from '../hooks/useGetEventsById'
import { Card } from '../Productos/components/Card'
import { useNavegacion } from '../hooks/useNavegacion'
import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import '../AdminComponents/style/sayhi.css'

export const SayHi = () => {
    const { eventoscreados, handleEventosCreadosPorMi } = useGetEventsById()
    const { handlenavigate } = useNavegacion()
    const { token } = useContext(LoginContext)

    const handleCrearEvento = () => {
      handlenavigate({ ruta: '/Admin/CrearEvento' })
    }

    const handleEliminarEvento = async (id) => {
      if (!window.confirm('¿Seguro que deseas eliminar este evento?')) return
      try {
        await axios.delete(`${endpoints.post}event/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        handleEventosCreadosPorMi()
      } catch (err) {
        alert('Error al eliminar el evento')
      }
    }

    return(
        <>
        {/* Mostrar mensaje motivacional solo si no hay eventos creados */}
        {(!eventoscreados || eventoscreados.length === 0) && (
          <section className="say-hi-login">
            <h2 className="aun-no-text">¡Aún no has creado ningún evento!</h2>
            <p>Parece que aún no has creado tus primeros eventos. ¿Qué tal si empiezas ahora y haces que tu plataforma cobre vida?</p>
            <aside>
              <button className="btn-join" onClick={handleCrearEvento}>
                Crear Evento
              </button>
            </aside>
          </section>
        )}
        {/* Mostrar eventos creados por el admin */}
        {eventoscreados && eventoscreados.length > 0 && (
          <section className="eventos-creados-admin">
            <h3 className="eventos-creados-title">Tus eventos creados</h3>
            <div className="card-container">
              {eventoscreados.map(evento => (
                <div key={evento._id} style={{ position: 'relative' }}>
                  <Card products={evento} />
                  <button className="btn-eliminar-evento-admin" onClick={() => handleEliminarEvento(evento._id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        </>
    )
}