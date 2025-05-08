import { useCrearEventos } from "../hooks/useCrearEventos"

export const AtributeDescripcion = ({event}) => {
    const {lenght} = useCrearEventos()
    return(
        <>
        <div class="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" placeholder="Descripción larga del evento" maxlength="210" onChange={(e)=> event(e) }></textarea>
        <article className='limit'>
            <small className='small-limit' style={{color: lenght < 210 ? 'green' : 'red'}}>{lenght} </small>
            <small className='small-limit'  style={{color: lenght < 210 ? 'green' : 'red'}}>/ 210</small>
            </article>
      </div>
        </>
    )
}