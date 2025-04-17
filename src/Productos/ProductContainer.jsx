import { useProducts } from "../hooks/useProducts"
import { Card } from "./components/Card"
import { Filters } from "./components/Filters"
import { FilterTitle } from "./components/FilterTitle"
import './style/container.css'
export const ProductContainer =  () => {
    const {products} = useProducts()
    return(
        <>
        <div className="event-page-container">
            <FilterTitle/>
        <section className="card-and-filter-container">
          <Filters/>
          <div className="card-container">
             {products.map((items)=>( 
               <Card products={items}/>
            ))} 
          
        </div>
        </section>
       
        </div>
        
        </>
    )
}