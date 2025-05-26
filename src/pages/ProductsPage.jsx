import { Layout } from "./Layout";
import { ProductContainer } from "../Productos/ProductContainer";

export default function ProductsPage() {
    return (
        <>
        <Layout children={<ProductContainer/>} banner={false}/>
        </>
    );
}