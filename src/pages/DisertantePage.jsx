import { useState } from "react"
import { PopUp } from "../PopUp/PopUp"
import { useLocation } from "react-router"
import { EventRegistrationPopup } from "../components/EventRegistrationPopup"
import "./DisertantePage.css"

export default function DisertantePage() {
    const location = useLocation()
    const {nombre} = location.state || {}

    const [code, setcode] = useState()
    const [pass, setPass] = useState(false)
    const [error, setError] = useState(false)

    const handlecode = (e) => {
        let pin = e.target.value
        if(pin.length < 8){
            setError(true)
        }
        console.log(pin)
    }

    return (
        <div className="disertante-page-container">
            {pass == false ? (
                <>
                    <PopUp 
                        role={'Disertante'} 
                        namebtn={'Enviar'} 
                        event={handlecode} 
                        error={error} 
                        nombre={nombre}
                    />
                    <div className="register-button-container">
                        <button 
                            className="register-event-btn" 
                            onClick={() => {
                                document.getElementById('event-registration-popup').style.display = 'flex';
                            }}
                        >
                            Registrarse en el evento
                        </button>
                    </div>
                </>
            ) : null}
            <EventRegistrationPopup />
        </div>
    )
}
