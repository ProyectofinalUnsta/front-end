import { AdminMetrics } from '../AdminComponents/AdminMetrics'
import { useNavigate } from 'react-router-dom'

export default function AdminMetricas() {
  const navigate = useNavigate()
  return (
    <div style={{minHeight:'100vh',background:'#f7f8fa'}}>
      <div style={{maxWidth:700,margin:'0 auto',paddingTop:32}}>
        <button
          onClick={()=>navigate('/Admin')}
          style={{
            background:'#1976d2',color:'#fff',border:'none',borderRadius:6,padding:'8px 18px',fontWeight:600,marginBottom:24,cursor:'pointer',boxShadow:'0 2px 8px #0001',transition:'background .2s',fontSize:16
          }}
        >
          ← Volver al panel admin
        </button>
        <AdminMetrics />
      </div>
    </div>
  )
} 