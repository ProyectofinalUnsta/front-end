import { Layout } from "./Layout";
import { ProductContainer } from "../Productos/ProductContainer";
export function ProductsPage  () {

    return(
        <>
        <Layout children={<ProductContainer/>}/>
        </>
    )
}