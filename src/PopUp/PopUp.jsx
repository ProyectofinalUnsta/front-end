import './style/popup.css'

export const PopUp = ({content,role,event,ref,namebtn,error,nombre,isSuccess}) => {

    return (
        <>
         <div ref={ref}  className="pop-up-container">
         <div class="popup">
      <div class="icon">{isSuccess == true ? '✔️' : '👋'}</div>
        <h1>{isSuccess != true ? '¡Bienvenido!' : '¡Evento Exitoso!'}</h1>
       {isSuccess == true ? <EventText /> 
       : <>
       <HiLine content={content} role={role} nombre={nombre}/>
      <CodeInput role={role} event={event} error={error}/>
      </>
      }
      
       <div class="separator"></div>
      <button onClick={()=>event(false)}>{namebtn}</button>
        </div>
        </div> 

   
        </>
    )
}

export const HiLine = ({content,role, nombre}) => {

return(
<>
{!content ?  <p>Hola, {role}. Ingrese el codigo del Evento <strong>{nombre}</strong> para cargar archivos</p>
: <p>Hola, Admin {content}. Estamos encantados de tenerte aquí. ¡Disfruta de la experiencia!</p>}
</>)
}

export const CodeInput = ({role, event,error}) => {
    return(
        <>
        {role ?
         <div className='input-container'>
            <label htmlFor="pincode"  style={{color: error == true ? 'red' : 'black' }}>Codigo</label>
            <input id='pincode' style={{borderColor: error == true ? 'red' : 'black'}} type="text" placeholder='xxx-xxx-xxx' onChange={(e)=>event(e)}/>
            <small>ErrorCode</small>
         </div>
         : null}
        </>
    )
}

export const EventText = () => {
    return(
    <>
    <p>El evento fue creado con exito!</p> 
    </>
    )
}