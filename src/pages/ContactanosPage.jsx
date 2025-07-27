import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactanosPage.css';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const CATEGORIAS = [
  'Problemas de registro',
  'Problemas de acceso',
  'Problemas con archivos',
  'Problemas con eventos',
  'Sugerencias',
  'Otros',
];

export default function ContactanosPage() {
  const [form, setForm] = useState({ nombre: '', email: '', categoria: '', descripcion: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sending, setSending] = useState(false);

  const validate = () => {
    if (!form.nombre.trim() || !form.email.trim() || !form.categoria || !form.descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    // Validación básica de email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Ingrese un email válido.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setError('');
    setSuccess('');
    try {
      await emailjs.send(
        'service_ozxwulp',
        'template_7ofivto',
        {
          from_name: form.nombre,
          from_email: form.email,
          categoria: form.categoria,
          message: form.descripcion,
        },
        'Eym9LCuebCqwTcr3U'
      );
      setSuccess('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      setForm({ nombre: '', email: '', categoria: '', descripcion: '' });
    } catch (err) {
      setError('Hubo un error al enviar el mensaje. Intente nuevamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contactanos-container">
      <div className="home-btn-wrapper left">
        <Link to="/" className="home-btn" title="Volver al inicio">
          <IoArrowBack size={22} />
        </Link>
      </div>
      <h1>Contáctanos</h1>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Categoría
          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Descripción del problema
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={5}
            required
          />
        </label>
        <button type="submit" disabled={sending}>{sending ? 'Enviando...' : 'Enviar'}</button>
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}
      </form>
      <div className="contact-info">
        <p>Este formulario enviará tu mensaje al equipo de Eventum.</p>
      </div>
      
    </div>
  );
} 