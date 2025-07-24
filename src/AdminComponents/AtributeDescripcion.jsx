import './style/create.css'
import { useCrearEventos } from "../hooks/useCrearEventos"

export const AtributeDescripcion = ({event}) => {
    const {lenght,setLength} = useCrearEventos()
    return(

        <div class="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" placeholder="Descripción larga del evento" maxlength="210" onChange={(e)=> {event(e);setLength(e.target.value.length)} }></textarea>
        <article className='limit flex flex-row gap-3'>
            <small style={{color: lenght < 210 ? 'green' : 'red'}}>{lenght} </small>
            <small style={{color: lenght < 210 ? 'green' : 'red'}}> / 210</small>
            </article>
      </div>

    )
}