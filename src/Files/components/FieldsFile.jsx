export const FieldFile = ({type,id,name,label,placeholder,loading,event,value,}) => {
    return(

          <div className="form-group">
            <label htmlFor={type}>{label}</label>
                <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={event}
                placeholder={placeholder}
                disabled={loading}
                required
                />
            </div>

    )
}

export const FileField = ({event,loading}) => {
    return(
     <div className="form-group">
    <label htmlFor="file">Archivo:</label>
        <input
            type="file"
            id="file"
            onChange={event}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
            disabled={loading}
            required
            />
        <small>Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Máx. 10MB)</small>
    </div>
    )
}


