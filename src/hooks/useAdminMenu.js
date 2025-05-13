import { useEffect, useContext } from "react"
import { MenuAdminContext } from "../context/MenuAdminContext"

export function useAdminMenu () {

    const { rotacion,setRotacion,displayed,setDisplayed,selectedesRef, refactiva,setRefActiva,active,setActive,popup,setPopUp,popUpDisplayed,setPopUpDisplayed,issuceed,setiscuceed} = useContext(MenuAdminContext)

    const handleAdminMenu = () => {
        if(!active){
            const options = document.getElementById('options')
            options.classList.add('active')
            setRotacion(270)
            setActive(!active)
            return
        }
        if(active){
            const options = document.getElementById('options')
            options.classList.remove('active')
            setRotacion(90)
            setActive(!active)
            return
        }

    }

    const closeMenu = () => {
        const options = document.getElementById('options')
        if(options){
            options.classList.remove('active')
        }
        setRotacion(90)
        setActive(false)
        return
    }

    const handleClick = (clave) => {

        // Elimina clase de la sección anterior
        window.localStorage.removeItem('clave')
        selectedesRef[refactiva].current?.classList.remove('selected');
        // Aplica clase a la nueva

        selectedesRef[clave].current?.classList.add('selected');

        // Actualiza la referencia activa
        setRefActiva(clave);
        window.localStorage.setItem('clave',clave)
      };

      const handledisplay = () => {

        setDisplayed(!displayed)
        if(displayed){
            setPopUp(360)
            let pop = document.getElementById('pop')
            pop.style.left = '60%'
            return
        }
        if(!displayed){
            setPopUp(180)
             let pop = document.getElementById('pop')
                pop.style.left = '90%'
                return
             }
            
        }

        const handlesucess = (valor) => {
            setiscuceed(valor)
            window.localStorage.setItem('success',JSON.stringify(valor))
        }
      

      const handlePopUpDisplayed = () => {
        setPopUpDisplayed(!popUpDisplayed)
      }

    useEffect(() => {
        selectedesRef[refactiva].current?.classList.add('selected');
      }, []);

    useEffect(()=>{
        closeMenu()
    },[displayed])





    return {rotacion,displayed,selectedesRef,refactiva,popup,popUpDisplayed,handleAdminMenu,closeMenu,handleClick,handledisplay,handlePopUpDisplayed,issuceed,handlesucess}
}