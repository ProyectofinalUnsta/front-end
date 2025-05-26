import { createContext, useState } from "react";
import Cookies from 'js-cookie'
export const LoginContext = createContext()


export const LoginProvider = ({children}) => {

const [user, setUser] = useState(() => {
  try {
    const cookie = Cookies.get('usuario');
    if (cookie) {
      const parsed = JSON.parse(cookie);
      return parsed;
    }
  } catch (e) {
    console.error('Error al leer la cookie usuario:', e);
  }

  return {
    nombre: '',
    logged: false
  };
});


const [token,setToken] = useState(()=> Cookies.get('token') || null)
const [isregistred,setisRegistred] = useState(()=> window.localStorage.getItem('registred') || false)


    return <LoginContext.Provider value={{
        setUser,
        user,
        isregistred,
        setisRegistred,
        token,
        setToken
    }}>
        {children}
    </LoginContext.Provider>
}