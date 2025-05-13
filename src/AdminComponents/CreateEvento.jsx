import './style/create.css'
import { useCrearEventos } from '../hooks/useCrearEventos'
import { Atributes } from './Atributes'
import { AtributeDescripcion } from './AtributeDescripcion'
import { AtributeCategory } from './AtributeCategory'

export const CreateEvento = () => {

   const {handlesubmit,handleFoto,handledate,error,handleTime,handletext,handleform,handlecategoria,form} = useCrearEventos()

    return(

        <>
        <header className="panel-admin-title">
        Crear Evento
        </header>
        <div class="form-card">
          <div class="form-left">
      <Atributes lenght={75} nombre={'title'} placeholder={'Nombre del evento'} label={'Nombre'} type={'text'} event2={handleform}/>
      <Atributes lenght={50} nombre={'breveDescripcion'} placeholder={'Detalle general del evento'} label={'Detalle'} type={'text'}  event2={handleform}/>
      <Atributes nombre={'fecha'} type={'Date'} label={'fecha'} event={handledate}/>
      <Atributes nombre={'hora_entrada'} type={'time'} label={'Hora Entrada'} event={handleTime}/>
      <Atributes nombre={'hora_salida'} type={'time'} label={'Hora Salida'} event={handleTime}/>
      <AtributeDescripcion event={handletext}/>
    </div>
    <div class="form-right">
     <Atributes nombre={'lugar'} label={'Ubicacion'} type={'text'} placeholder={'NH Hotel, Buenos Aires'}  event2={handleform}/>
     <AtributeCategory nombre={'Categoria'} label={'Categoria'} event={handlecategoria}/>
      <div class="form-group">
        <label className='archivo' htmlFor="archivo" style={{border: error ? '6px dotted red' : ' 6px dotted #ddd', color: error ? 'red' : 'gray'}} > {error ? <span>{error}</span> : <span style={{color: form.imagen.name ? ' #24d651' : 'gray'}}>  {form.imagen == '' ? 'Foto Evento (1MB)' : form.imagen.name }</span> }</label>
        <input type="file" id="archivo" onChange={(e)=>handleFoto(e)}/>
      </div>
      <button class="submit-btn" onClick={()=> handlesubmit()}>Enviar</button>
    </div>

  </div>
</>

    )
}