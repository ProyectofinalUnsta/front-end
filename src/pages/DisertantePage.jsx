import { useState } from "react"
import { PopUp } from "../PopUp/PopUp"
import { useLocation } from "react-router"

export const DisertantePage = () => {

    const location = useLocation()

    const {nombre} = location.state || {}

    const [code,setcode] = useState()
    const [pass,setPass] = useState(false)
    const [error,setError] = useState(false)
    const handlecode = (e) => {
     let pin = e.target.value
     if(pin.length < 8){
        setError(true)
     }
     console.log(pin)
    }

    return (
        <>
        {pass == false ? <PopUp role={'Disertante'} namebtn={'Enviar'} event={handlecode} error={error} nombre={nombre}/> : null}
        </>
    )

}
