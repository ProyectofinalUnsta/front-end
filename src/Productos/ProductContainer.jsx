import { useProducts } from "../hooks/useProducts"
import { Card } from "./components/Card"
import './style/container.css'
export const ProductContainer =  () => {
    const {products} = useProducts()
    return(
        <>
        <div className="card-container">
             {products.map((items)=>(
                 <Card products={items}/>
            ))} 
          
        </div>
        </>
    )
}