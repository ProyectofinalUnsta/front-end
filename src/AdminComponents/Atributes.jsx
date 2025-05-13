export const Atributes = ({lenght,nombre,placeholder,label,type , event , event2}) => {

    return(

        <div class="form-group">
        <label htmlFor={nombre}>{label}</label>
        <input 
        type={type} 
        id={nombre} 
        maxLength={lenght} 
        placeholder={placeholder}
        onChange={ event ? (e)=>event(e) : (e) => event2(e.target.value,nombre)}/>
      </div>

    )
} 