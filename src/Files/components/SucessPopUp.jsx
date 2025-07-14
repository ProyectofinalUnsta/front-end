import '../../PopUp/style/popUp.css'
import { useNavigate } from 'react-router';
import { useState , useEffect} from 'react';

export const SucessPopUp = () => {

       const [segundos, setSegundos] = useState(5);
       const volver = useNavigate()
       useEffect(() => {
         const timer = setInterval(() => {
           setSegundos((prev) => {
             if (prev <= 1) {
               clearInterval(timer);
              volver('/')
               return 0;
             }
             return prev - 1;
           });
         }, 1000);
    
         // Cleanup interval on component unmount
         return () => clearInterval(timer);
       }, []);

    return(
        <div  className="pop-up-container">
         <div className='popup-disertante'>
             <div style={{marginBottom:'3rem'}} className="icon">✔️</div>
           <h2 className='popUp-text-disertante'>Archivo subido Con exito!</h2>
          <div className="separator"></div>
           <button className='popup-disertante-button'>regresando a home en {segundos}</button>
         </div>
        </div>
    )
}