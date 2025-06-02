import  { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../icons/mocks/logo2.webp"; // Ajustá esta ruta si es necesario
import { useLogin } from "../../hooks/useLogin";
import { HideEye } from "../../icons/HideEye";
import { ShowEye } from "../../icons/ShowEye";


export default function Login  ()  {

const {handleUser,handleSubmit,error,userform} = useLogin()

const [eye,setEye] = useState(false)


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabecera con logotipo y palabra */}
      <div className="w-full bg-white py-4 flex items-center justify-center shadow-md fixed top-0 left-0 z-10">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={logo}
            alt="Eventum Logo"
            className="h-8 cursor-pointer"
          />
          <span className="text-xl font-semibold text-gray-800">Eventum</span>
        </Link>
      </div>

      {/* Formulario de inicio de sesión */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-6">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
              style={{borderColor: error.estado == true ? 'red' : '#ddd'}}
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
                required
                value={userform.email}
                onChange={(e)=>handleUser('email',e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
              style={{borderColor: error.estado == true ? 'red' : '#ddd'}}
                type= {eye == false ? 'password' : 'text'}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                value={userform.password}
                onChange={(e)=>handleUser('password',e.target.value)}
              />
              { eye == false ? <button className="relative z-10 bottom-8 left-7/8 " onClick={(e)=>{ e.preventDefault(); setEye(!eye)}}> <ShowEye width={'24px'} height={'24px'} /> </button> : <button className="relative z-10 bottom-8 left-7/8 "  onClick={(e)=>{ e.preventDefault(); setEye(!eye)}} > <HideEye width={'24px'} height={'24px'} /> </button> }
            </div>
              <span className="relative z-10 bottom-10 left-1/36" style={{color:error.estado == false ? 'green' : 'red'}}>{error.message}</span>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={(e)=>handleSubmit(e)}
            >
              Entrar
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

