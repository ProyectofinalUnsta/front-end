import { Link } from "react-router-dom";
import logo from "../../icons/mocks/logo2.webp";
import { useRegister } from "../../hooks/useRegister";
import { ShowEye } from "../../icons/ShowEye";
import { HideEye } from "../../icons/HideEye";
import { useState, useEffect } from "react";
import { RegistroPopUp } from "../../PopUp/PopUp";
import { useCanvasConfetti } from "../../hooks/useCanvasConfetti";
import './Register.css';

const Register = () => {
  const { sectionRef, fireConfetti } = useCanvasConfetti();
  const { handleFormChange, handleRegister, error, success } = useRegister();
  const [eye, setEye] = useState(false);

  useEffect(() => {
    if (success === true) {
      fireConfetti();
    }
  }, [success]);

  return (
    <div className="register-bg-pro">
      {success === true ? <RegistroPopUp ref={sectionRef} isSuccess={success} /> : null}
      <div className="register-card-pro">
        <Link to="/" className="register-logo-pro">
          <img src={logo} alt="Eventum Logo" className="register-logo-img-pro" />
          <span className="register-title-pro">Eventum</span>
        </Link>
        <h2 className="register-heading-pro">Crear Cuenta</h2>
        <form className="register-form-pro" autoComplete="off" onSubmit={handleRegister}>
          <div className="register-field-pro">
            <label className="register-label-pro">Nombre completo</label>
            <input
              type="text"
              className="register-input-pro"
              placeholder="Juan Pérez"
              required
              onChange={e => handleFormChange(e.target.value, 'username')}
            />
          </div>
          <div className="register-field-pro">
            <label className="register-label-pro">Email</label>
            <input
              type="email"
              className="register-input-pro"
              placeholder="correo@ejemplo.com"
              required
              onChange={e => handleFormChange(e.target.value, 'email')}
            />
          </div>
          <div className="register-field-pro">
            <label className="register-label-pro">Contraseña</label>
            <div className="register-password-wrapper-pro">
              <input
                type={eye ? 'text' : 'password'}
                className="register-input-pro"
                style={{ borderColor: error.error === false ? 'green' : error.error === true ? 'red' : '#e5e7eb' }}
                placeholder="••••••••"
                required
                onChange={e => handleFormChange(e.target.value, 'password')}
              />
              <button
                className="register-eye-pro"
                type="button"
                onClick={() => setEye(!eye)}
                tabIndex={-1}
              >
                {eye ? <HideEye width={'24px'} height={'24px'} /> : <ShowEye width={'24px'} height={'24px'} />}
              </button>
            </div>
          </div>
          {error.message && (
            <span className="register-error-pro" style={{ color: error.error === false ? 'green' : 'red' }}>{error.message}</span>
          )}
          <button
            type="submit"
            className="register-btn-pro"
          >
            Registrarse
          </button>
        </form>
        <p className="register-login-text-pro">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="register-login-link-pro">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;