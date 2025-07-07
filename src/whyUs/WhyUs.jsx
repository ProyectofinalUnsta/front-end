import { CardVentajas } from './components/CardVentajas'
import ventajas from './mocks/ventajas.json'
import './style/whyus.css'

export const WhyUs = () => {
const ventaja = ventajas.ventajas
    return (
        <section className="why-us-section">
            <div className="why-us-container">
                <h2 className="why-us-title">¿Por qué elegir Eventum?</h2>
                <p className="why-us-subtitle">
                    Descubre las ventajas que hacen de Eventum la plataforma ideal para gestionar tus eventos de manera profesional y eficiente.
                </p>
                {ventaja.map((items) => (
                    <CardVentajas key={items.id} items={items} />
                ))}
            </div>
        </section>
    )
}

export default WhyUs