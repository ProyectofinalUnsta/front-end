import { CardVentajas } from './components/CardVentajas'
import ventajas from './mocks/ventajas.json'
export const WhyUs = () => {
const ventaja = ventajas.ventajas
    return (
        <>
        {ventaja.map((items)=>(
            <CardVentajas items={items}/>
        ))}
        </>
    )
}
