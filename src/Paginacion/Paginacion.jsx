import './style/paginacion.css'
import { usePaginacion }  from '../hooks/usePaginacion'
export const Paginacion = () => {

  const {currenntPage,next,back} = usePaginacion()

    return (
        <>
        <div className="paginacion-container">
          <button onClick={()=> back()}>prev</button>
            <h3>{currenntPage}</h3>
          <button onClick={()=> next()}>Next</button>
        </div>
        </>
    )
}