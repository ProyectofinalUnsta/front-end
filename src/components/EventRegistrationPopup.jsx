import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EventRegistrationPopup = () => {
    const [email, setEmail] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setShowSuccess(true);
            setTimeout(() => {
                document.getElementById('event-registration-popup').style.display = 'none';
                setShowSuccess(false);
                setEmail('');
                navigate('/');
            }, 2000);
        }
    };

    const handleClose = () => {
        document.getElementById('event-registration-popup').style.display = 'none';
        setShowSuccess(false);
        setEmail('');
    };

    return (
        <div id="event-registration-popup" className="event-registration-popup">
            <div className="popup-content">
                <h2>Registro en el Evento</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Registrarse</button>
                </form>
                <div className={`success-message ${showSuccess ? 'show' : ''}`}>
                    ¡Ya estás registrado! Redirigiendo al inicio...
                </div>
                <button 
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '5px',
                        width: 'auto'
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
}; 