import './style/paginacion.css'
import { usePaginacion }  from '../hooks/usePaginacion'
export const Paginacion = () => {

  const {currenntPage} = usePaginacion()

    return (
        <>
        <div className="paginacion-container">
          <button>prev</button>
            <h3>{currenntPage}</h3>
          <button>Next</button>
        </div>
        </>
    )
}