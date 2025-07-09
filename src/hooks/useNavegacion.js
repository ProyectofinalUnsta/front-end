import { useNavigate } from 'react-router'
export function useNavegacion () {
const navegar = useNavigate()

const handlenavigate = ({ruta, params}) => {

const {_id,lugar,fecha,hora,title,descripcion,imagen} = params

const route = `${ruta}/${_id}`
navegar(route,{state:{_id,lugar,fecha,hora,title,descripcion,imagen}})
}

const navigatewithoutparams = ({ruta}) => {
    console.log(ruta)
const route = `${ruta}`
navegar(route)
}

return {handlenavigate,navigatewithoutparams}
}

