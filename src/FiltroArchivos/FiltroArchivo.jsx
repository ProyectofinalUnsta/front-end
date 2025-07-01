import useHandleFiles from "./hook/useHandleFiles"

export default function FiltroArchivo () {
      const {handleFiles} = useHandleFiles()
    return(
        <>
        <select name="filtro-archivo" id="filtro-archivo" onChange={(e)=> handleFiles(e)}>
            <option value="Archivos-inscripto">Archivos Evento Inscripto</option>
            <option value="por-Mi" >Archivos Subidos por Mi</option>
        </select>
        </>
    )
}