import { useState } from 'react';
import './MisEventos.css';

export default function MisEventos() {
    const [email, setEmail] = useState('');
    const [eventos, setEventos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/eventos/registrados/${email}`);
            if (!response.ok) {
                throw new Error('No se encontraron eventos para este correo');
            }
            const data = await response.json();
            setEventos(data);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
            setEventos([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mis-eventos-container">
            {!isAuthenticated ? (
                <div className="email-auth-container">
                    <h2>Mis Eventos</h2>
                    <p>Ingresa tu correo electrónico para ver tus eventos registrados</p>
                    <form onSubmit={handleEmailSubmit}>
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
    );
} 