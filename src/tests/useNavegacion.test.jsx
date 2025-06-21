import { useNavegacion } from "../hooks/useNavegacion.js";
import { render, screen  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {  describe, expect, it , beforeEach , vi  } from "vitest";

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

function TestComponent() {
  const { handlenavigate, navigatewithoutparams } = useNavegacion();

  const params = {
    _id: '123',
    lugar: 'Bs As',
    fecha: '2025-06-21',
    hora: '20:00',
    title: 'Fiesta',
    descripcion: 'Una fiesta'
  };

  return (
    <>
      <button onClick={() => handlenavigate({ ruta: '/eventos', params })}>
        Navegar con params
      </button>
      <button onClick={() => navigatewithoutparams({ ruta: '/inicio' })}>
        Navegar sin params
      </button>
    </>
  );
}

describe('useNavegacion ', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('navega con parámetros al hacer click', async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    await user.click(screen.getByText(/Navegar con params/i));

    expect(mockNavigate).toHaveBeenCalledWith('/eventos/123', {
      state: {
        _id: '123',
        lugar: 'Bs As',
        fecha: '2025-06-21',
        hora: '20:00',
        title: 'Fiesta',
        descripcion: 'Una fiesta'
      }
    });
  });

  it('navega sin parámetros al hacer click', async () => {
    render(<TestComponent />);
    const user = userEvent.setup();
    const boton = screen.getAllByRole('button');
   await user.click(boton[1]);

    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });
});

