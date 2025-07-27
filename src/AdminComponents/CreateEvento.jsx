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
        <label className='archivo' htmlFor="archivo" style={{border: error ? '6px dotted red' : ' 6px dotted #ddd', color: error ? 'red' : 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '180px', minWidth: '220px', position: 'relative'}} >
          {error ? `${error}` :  form.imagen == '' ? 'Foto Evento (1MB)' : form.imagen.name }
          {/* Previsualización de imagen */}
          {form.imagen && typeof form.imagen !== 'string' && (
            <>
              <img
                src={URL.createObjectURL(form.imagen)}
                alt="Previsualización"
                style={{
                  marginTop: '10px',
                  maxWidth: '100%',
                  maxHeight: '140px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                  display: 'block',
                }}
              />
              <button
                type="button"
                onClick={() => handleform('', 'imagen')}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: '#fff',
                  color: '#dc2626',
                  border: '1.5px solid #dc2626',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(220,38,38,0.08)',
                  zIndex: 2
                }}
                title="Quitar imagen"
              >
                ×
              </button>
            </>
          )}
          <label htmlFor="archivo" style={{
            marginTop: '1rem',
            background: 'linear-gradient(90deg, #2563eb 0%, #dc2626 100%)',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
            border: 'none',
            display: 'inline-block',
            transition: 'background 0.2s',
            letterSpacing: '0.5px',
          }}>
            Seleccionar archivo
            <input
              style={{ display: 'none' }}
              type="file"
              id="archivo"
              onChange={(e) => handleFoto(e)}
            />
          </label>
        </label>
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