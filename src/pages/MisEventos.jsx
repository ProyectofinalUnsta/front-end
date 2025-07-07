import React, { Suspense } from "react";
import './MisEventos.css';
import { useGetEventsById } from '../hooks/useGetEventsById';
import '../global/layout.css'
import '../global/global.css'
const NavBar = React.lazy(()=> import('../Navbar/NavBar.jsx'))
const Footer = React.lazy(()=> import('../footer/footer.jsx'))

export default function MisEventos() {
    const {setEmail,isAuthenticated,error,eventos,setIsAuthenticated,email,handleGetEventosById,isLoading} = useGetEventsById()

    return (
        <div className="mis-eventos-page">
            <Suspense fallback={<div>cargando..</div>}>
                <nav className='nav-container'>
                    <NavBar/>
                </nav>
            </Suspense>

            <div className="mis-eventos-container">
                {!isAuthenticated ? (
                    <div className="email-auth-container">
                        <h2>Mis Eventos</h2>
                        <p>Ingresa tu correo electrónico para ver tus eventos registrados</p>
                        <form onSubmit={handleGetEventosById}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                                required
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Buscando...' : 'Ver mis eventos'}
                            </button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                ) : (
                    <div className="eventos-list-container">
                        <h2>Mis Eventos Registrados</h2>
                        <p className="email-display">Eventos registrados para: {email}</p>
                        {eventos.length === 0 ? (
                            <p className="no-eventos">No tienes eventos registrados</p>
                        ) : (
                            <div className="eventos-grid">
                                {eventos.map((evento) => (
                                    <div key={evento._id} className="evento-card">
                                        <img src={evento.imagen} alt={evento.titulo} />
                                        <div className="evento-info">
                                            <h3>{evento.titulo}</h3>
                                            <p>{evento.fecha}</p>
                                            <p>{evento.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button 
                            className="cambiar-email-btn"
                            onClick={() => setIsAuthenticated(false)}
                        >
                            Cambiar correo electrónico
                        </button>
                    </div>
                )}
            </div>

            <Suspense fallback={<div>cargando..</div>}>
                <Footer/>
            </Suspense>
        </div>
    );
} 