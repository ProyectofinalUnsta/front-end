import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../icons/mocks/logo2.webp";
import { useLogin } from "../../hooks/useLogin";
import { HideEye } from "../../icons/HideEye";
import { ShowEye } from "../../icons/ShowEye";
import './Login.css';

export default function Login() {
  const {loading, handleUser, handleSubmit, error, userform } = useLogin();
  const [eye, setEye] = useState(false);

  return (
    <div className="login-bg-pro">
      <div className="login-card-pro">
        <Link to="/" className="login-logo-pro">
          <img src={logo} alt="Eventum Logo" className="login-logo-img-pro" />
          <span className="login-title-pro">Eventum</span>
        </Link>
        <h2 className="login-heading-pro">Iniciar Sesión</h2>
        <form className="login-form-pro" onSubmit={handleSubmit} autoComplete="off">
          <div className="login-field-pro">
            <label className="login-label-pro">Email</label>
              <input
              style={{ borderColor: error.estado === true ? 'red' : '#e5e7eb' }}
                type="email"
              className="login-input-pro"
                placeholder="correo@ejemplo.com"
                required
                value={userform.email}
              onChange={e => handleUser('email', e.target.value)}
              />
              {error.estado ? <span style={{color:'red'}}>{error.message}</span> : null}
            </div>
          <div className="login-field-pro">
            <label className="login-label-pro">Contraseña</label>
            <div className="login-password-wrapper-pro">
              <input
                style={{ borderColor: error.estado === true ? 'red' : '#e5e7eb' }}
                type={eye ? 'text' : 'password'}
                className="login-input-pro"
                placeholder="••••••••"
                required
                value={userform.password}
                onChange={e => handleUser('password', e.target.value)}
              />
              <button
                className="login-eye-pro"
                type="button"
                onClick={() => setEye(!eye)}
                tabIndex={-1}
              >
                {eye ? <HideEye width={'24px'} height={'24px'} /> : <ShowEye width={'24px'} height={'24px'} />}
              </button>
            </div>
          </div>
          {error.message && (
            <span className="login-error-pro" style={{ color: error.estado === false ? 'green' : 'red' }}>{error.message}</span>
          )}
            <button
              type="submit"
            className="login-btn-pro"
             disabled={loading.value}
            >
             {loading.value ? loading.message : 'Entrar'}
            </button>
          </form>
        <p className="login-register-text-pro">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="login-register-link-pro">
              Regístrate
            </Link>
          </p>
      </div>
    </div>
  );
}

