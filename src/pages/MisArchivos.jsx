import { useState } from 'react'
import '../global/MisArchivos.css'
import { Layout } from './Layout'

export const MisArchivos = () => {
    const [filtroEvento, setFiltroEvento] = useState('todos')
    const [busqueda, setBusqueda] = useState('')

    const archivos = [
        {
            id: 1,
            nombre: 'Presentación.pdf',
            evento: 'Conferencia de Tecnología',
            fecha: '20/05/2024',
            tipo: 'pdf'
        },
        {
            id: 2,
            nombre: 'Documento.docx',
            evento: 'Seminario de Innovación',
            fecha: '19/05/2024',
            tipo: 'doc'
        },
        {
            id: 3,
            nombre: 'Imagen.jpg',
            evento: 'Taller de Diseño',
            fecha: '18/05/2024',
            tipo: 'imagen'
        },
        {
            id: 4,
            nombre: 'Notas.pdf',
            evento: 'Conferencia de Tecnología',
            fecha: '20/05/2024',
            tipo: 'pdf'
        }
    ]

    // Obtener lista única de eventos para el filtro
    const eventos = ['todos', ...new Set(archivos.map(archivo => archivo.evento))]

    const getIcono = (tipo) => {
        switch(tipo) {
            case 'pdf': return '📄'
            case 'doc': return '📝'
            case 'imagen': return '🖼️'
            default: return '📁'
        }
    }

    const archivosFiltrados = archivos.filter(archivo => {
        const cumpleFiltroEvento = filtroEvento === 'todos' || archivo.evento === filtroEvento
        const cumpleBusqueda = archivo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              archivo.evento.toLowerCase().includes(busqueda.toLowerCase())
        return cumpleFiltroEvento && cumpleBusqueda
    })

    const handleDescargar = (archivo) => {
        // Aquí iría la lógica de descarga
        console.log('Descargando:', archivo.nombre)
    }

    const ContenidoMisArchivos = () => (
        <div className="mis-archivos-page">
            <div className="archivos-header">
                <h2>Mis Archivos</h2>
                <div className="filtros-container">
                    <input 
                        type="text" 
                        placeholder="Buscar archivos..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="busqueda-input"
                    />
                    <select 
                        value={filtroEvento} 
                        onChange={(e) => setFiltroEvento(e.target.value)}
                        className="filtro-select"
                    >
                        {eventos.map(evento => (
                            <option key={evento} value={evento}>
                                {evento === 'todos' ? 'Todos los eventos' : evento}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="archivos-container">
                {archivosFiltrados.map(archivo => (
                    <div key={archivo.id} className="archivo-card">
                        <div className="archivo-icon">{getIcono(archivo.tipo)}</div>
                        <div className="archivo-info">
                            <h3>{archivo.nombre}</h3>
                            <p>Evento: {archivo.evento}</p>
                            <p>Fecha: {archivo.fecha}</p>
                        </div>
                        <div className="archivo-actions">
                            <button className="btn-ver">Ver archivo</button>
                            <button 
                                className="btn-descargar"
                                onClick={() => handleDescargar(archivo)}
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <Layout children={<ContenidoMisArchivos />} banner={false} />
    )
} 