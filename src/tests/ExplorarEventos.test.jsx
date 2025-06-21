import { render, screen  } from "@testing-library/react";
import ExplorarEventos  from "../explore/ExplorarEventos.jsx";
import { MemoryRouter } from 'react-router-dom';
import {  describe, expect, it } from "vitest";

describe('explorar eventos', () => {

    it('Se busca verificar que al renderizar el componente este tenga su titulo', () => {
        render( <MemoryRouter>
          <ExplorarEventos/>
        </MemoryRouter> )
        const titulo = screen.getByText(/Crea Momentos Inolvidables/i)
        expect(titulo).toBeInTheDocument()
    })

        it('Se busca verificar que al renderizar el componente este tenga sus botones ', () => {

        render( <MemoryRouter>
          <ExplorarEventos/>
        </MemoryRouter> )
        const links = screen.getAllByRole('link', { name: /explorar eventos/i });
        const link = links[0]
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/Eventos');
    })

    it('se busca que al renderizar el elemento se muestre su descripcion', () => {
        
const { container } = render( 
<MemoryRouter>
 <ExplorarEventos/>
</MemoryRouter> );
        const descripcion = container.querySelector('p.explore-paragraph')
        expect(descripcion).toBeInTheDocument()
    })
})