
import { Link } from "react-router-dom";
import logo from "../../icons/mocks/logo2.webp"; // Ajustá esta ruta si usás otra estructura
import { useRegister } from "../../hooks/useRegister";
import { ShowEye } from "../../icons/ShowEye";
import { HideEye } from "../../icons/HideEye";
import { useState } from "react";
import { RegistroPopUp } from "../../PopUp/PopUp";
import { useCanvasConfetti } from "../../hooks/useCanvasConfetti";
import { useEffect } from "react";

const Register = () => {
 const { sectionRef, fireConfetti  } = useCanvasConfetti()
  const  {handleFormChange,handleRegister,error,success} = useRegister()
 const [eye,setEye] = useState(false)

     useEffect(() => {
     if (success == true) {
       fireConfetti();
     }
   }, [success]);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabecera con logotipo y palabra */}
      {success == true ?<RegistroPopUp ref={sectionRef} isSuccess={success}/> : null}
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

      {/* Formulario de registro */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-6">
          <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre completo</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Juan Pérez"
                required
                onChange={(e)=>handleFormChange(e.target.value,'username')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
                required
                 onChange={(e)=>handleFormChange(e.target.value,'email')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type={eye == false ? 'password' : 'text'}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{borderColor: error.error == false ? 'green' : 'red'}}
                placeholder="••••••••"
                required
                onChange={(e)=>handleFormChange(e.target.value,'password')}
              />
              { eye == false ? <button className="relative z-10 bottom-8 left-7/8 " onClick={(e)=>{ e.preventDefault(); setEye(!eye)}}><ShowEye width={'24px'} height={'24px'} /> </button> : <button className="relative z-10 bottom-8 left-7/8 "  onClick={(e)=>{ e.preventDefault(); setEye(!eye)}} > <HideEye width={'24px'} height={'24px'} /> </button> }
            </div>
            <span className="relative z-10 bottom-10 left-1/36" style={{color:error.error == false ? 'green' : 'red'}}>{error.message}</span>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={(e)=>handleRegister(e)}
            >
              Registrarse
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;