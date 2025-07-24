import useHandleFiles from "./hook/useHandleFiles"
import { useState } from "react"

export default function FiltroArchivo () {
    const {handleFiles} = useHandleFiles()
    const [showMsg, setShowMsg] = useState(false)

    const handleChange = (e) => {
        handleFiles(e)
        if (e.target.value === 'por-Mi') {
            setShowMsg(true)
        } else {
            setShowMsg(false)
        }
    }

    return(
        <>
        <select name="filtro-archivo" id="filtro-archivo" onChange={handleChange}>
            <option value="Archivos-inscripto">Archivos Evento Inscripto</option>
            <option value="por-Mi" >Archivos Subidos por Mi</option>
        </select>
        {showMsg && (
            <div style={{
                marginTop: '1.2rem',
                background: '#fff8e1',
                color: '#b45309',
                border: '1.5px solid #fbbf24',
                borderRadius: '8px',
                padding: '1rem',
                fontWeight: 500,
                fontSize: '1.05rem',
                textAlign: 'center',
                maxWidth: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 2px 8px rgba(251,191,36,0.08)'
            }}>
                Para ver tus archivos subidos debes ingresar al <b>Panel Admin</b> y seleccionar <b>Administrar Archivos</b>.
            </div>
        )}
        </>
    )
}