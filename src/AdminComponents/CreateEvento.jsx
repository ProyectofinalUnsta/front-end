import './style/create.css'
import { useCrearEventos } from '../hooks/useCrearEventos'
import { Atributes } from './Atributes'
import { AtributeDescripcion } from './AtributeDescripcion'
import { AtributeCategory } from './AtributeCategory'

export const CreateEvento = ({ onSuccess }) => {

   const {loading,handlesubmit,handleFoto,handledate,error,handleTime,handletext,handleform,handlecategoria,form} = useCrearEventos(onSuccess)

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
      <div class="form-group-archivo">
        <label className='archivo' htmlFor="archivo" style={{border: error ? '6px dotted red' : ' 6px dotted #ddd', color: error ? 'red' : 'gray'}} > {error ? `${error}` :  form.imagen == '' ? 'Foto Evento (1MB)' : form.imagen.name }</label>
        <input style={{marginBottom:'1rem', marginLeft:'0.5rem', marginTop:'1rem'}} type="file" id="archivo" onChange={(e)=>handleFoto(e)} />
      </div>
      <button
      style={{background: loading.value ? '#d4ffdf;' : '#b7fec9'}}
      class="submit-btn" 
      onClick={()=> handlesubmit()}
      disabled={loading.value}
      >{loading.value ? loading.message : 'Enviar'}</button>
    </div>

  </div>
</>

    )
}