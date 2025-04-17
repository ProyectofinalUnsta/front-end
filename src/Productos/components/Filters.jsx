import '../style/filter.css'
import {FilterIcon} from '../../icons/FilterIcon'
import { FilteredRowCategory, FilteredRows } from './FilteredRows'
export const Filters = () => {
    return(
        <>
        <div className="filter-container">
            <header  className='header-filtros'>
             <FilterIcon/> 
             <span className='header-filtros-title'>Filtros</span>
            </header>
            <aside className='filters-props-container'>
               <FilteredRows nombre={'Buscar'} id={'Buscar'} />
              <FilteredRowCategory nombre={'Categoria'} id={'Categoria'} />
            </aside>
            <footer className='footer-filters'>
                <button className='btn-clear-filters'>Limpiar filtros</button>
            </footer>
        </div>
        </>
    )
}