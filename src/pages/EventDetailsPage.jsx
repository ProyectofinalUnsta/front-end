import { useLocation, useParams } from "react-router";
import { Layout } from './Layout';
import { CardDetails } from "../Productos/components/CardDetails";
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../utils/endpoints';

export default function EventDetailsPage() {
    const location = useLocation();
    const params = useParams();
    const initial = location.state || {};
    const [evento, setEvento] = useState(initial);
    const [notFound, setNotFound] = useState(false);
    const id = initial._id || params.id;

    useEffect(() => {
        if (!id) {
            setNotFound(true);
            return;
        }
        if (!initial._id || !initial.title || !initial.imagen) {
            axios.get(`${endpoints.eventoPorId}${id}`)
                .then(res => {
                    const ev = Array.isArray(res.data) ? res.data[0] : res.data;
                    if (!ev || !ev._id) {
                        setNotFound(true);
                    } else {
                        setEvento(ev);
                        setNotFound(false);
                    }
                })
                .catch(() => setNotFound(true));
        }
    }, [id]);

    if (notFound) {
        return (
            <Layout>
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '5rem', // Espacio para la navbar
                    color: '#dc2626',
                    fontWeight: 600,
                    fontSize: '1.3rem',
                    textAlign: 'center',
                }}>
                    <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>⚠️</div>
                    Evento no encontrado o eliminado.<br />
                    Verifica el enlace o contacta al organizador.
                </div>
            </Layout>
        );
    }

    // Si aún no hay datos, mostrar un loader
    if (!evento || !evento._id) {
        return (
            <Layout>
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '5rem',
                    color: '#2563eb',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    textAlign: 'center',
                }}>
                    Cargando evento...
                </div>
            </Layout>
        );
    }

    return (
        <Layout children={<CardDetails {...evento} />} />
    );
}