
import { useFilters } from "../hooks/useFilters"
import { Paginacion } from "../Paginacion/Paginacion"
import { Card } from "./components/Card"
import { Filters } from "./components/Filters"
import { FilterTitle } from "./components/FilterTitle"
import './style/container.css'
export const ProductContainer =  () => {
    const {filteredProducts} = useFilters()

    return(
        <>
        <div className="event-page-container">
            <FilterTitle/>
        <section className="card-and-filter-container">
          <Filters/>
          <div className="card-products-container">
             {filteredProducts.map((items)=>( 
               <Card products={items}/>
            ))} 
          
        </div>
        </section>
          <Paginacion/>
        </div>
        
        </>
    )
}