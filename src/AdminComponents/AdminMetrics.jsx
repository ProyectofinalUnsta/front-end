import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import { LoginContext } from '../context/LoginContext'

export const AdminMetrics = () => {
  const { user } = useContext(LoginContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !user.email) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${endpoints.inscripciones}recuentos/admin?adminEmail=${user.email}`)
        setData(res.data)
        setError(null)
      } catch (err) {
        setError('Error al cargar métricas')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000) // Actualiza cada 5 segundos
    return () => clearInterval(interval)
  }, [user])

  return (
    <div style={{maxWidth: '700px', margin: '40px auto', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 16px #0001', padding: '32px 24px'}}>
      <h2 style={{fontWeight:700, fontSize: '2rem', marginBottom: '24px', color:'#2a2a2a'}}>Métricas de tus eventos</h2>
      {loading ? (
        <div style={{textAlign:'center', color:'#888'}}>Cargando...</div>
      ) : error ? (
        <div style={{color:'#d32f2f', textAlign:'center'}}>{error}</div>
      ) : data.length === 0 ? (
        <div style={{textAlign:'center', color:'#888'}}>No has creado eventos aún.</div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:'1rem'}}>
            <thead>
              <tr style={{background:'#f5f5fa'}}>
                <th style={{padding:'12px 8px', textAlign:'left', color:'#444'}}>Evento</th>
                <th style={{padding:'12px 8px', textAlign:'center', color:'#444'}}>Inscriptos</th>
              </tr>
            </thead>
            <tbody>
              {data.map(ev => (
                <tr key={ev._id} style={{borderBottom:'1px solid #eee'}}>
                  <td style={{padding:'10px 8px', fontWeight:500, color:'#222'}}>{ev.nombreEvento}</td>
                  <td style={{padding:'10px 8px', textAlign:'center', fontWeight:600, color:'#1976d2'}}>{ev.cantidadInscriptos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 