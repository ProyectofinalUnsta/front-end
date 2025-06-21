import { Card } from '../Productos/components/Card.jsx'
import { render, screen  } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import {  describe, expect, it } from "vitest";


describe('card', () => {
    it('se busca que al enviar las props a la card , esta se renderice y muestre las props enviadas',  () => {
        const product = {
            _id:1,
            title:"Nombre de pruebas",
            descripcion:"Descripcion de pruebas",
            fecha:"hoy",
            hora:"18:25 hs",
            lugar:"Mi casa",
            categoria:"test",
            imagen:"https:imagenprueba.webp"
        }
       render(
            <MemoryRouter>
                <Card products={product}/>
            </MemoryRouter>
        )
        const title = screen.getByText(/Nombre de pruebas/i)
        const fecha = screen.getByText(/hoy/i)
        const hora = screen.getByText(/18:25 hs/i)
        const lugar = screen.getByText(/Mi casa/i)
        const categoria = screen.getByText(/test/i)
      
        expect(title,fecha,hora,lugar,categoria).toBeInTheDocument()
    })

    it('se busca que el boton de detalles evento este visible',  () => {
        const product = {
            _id:1,
            title:"Nombre de pruebas",
            descripcion:"Descripcion de pruebas",
            fecha:"hoy",
            hora:"18:25 hs",
            lugar:"Mi casa",
            categoria:"test",
            imagen:"https:imagenprueba.webp"
        }
      const { container } =  render(
            <MemoryRouter>
                <Card products={product}/>
            </MemoryRouter>
        )
        const btnAnchor = container.querySelector('.event-btn')
        const anchor = container.querySelector('.btn-event')
        expect(btnAnchor,anchor).toBeInTheDocument()
        expect(anchor).toHaveTextContent(/Ver detalles/i)

    })
})