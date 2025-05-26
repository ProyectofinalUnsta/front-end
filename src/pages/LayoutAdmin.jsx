import React, { Suspense, useContext, useEffect, useState } from "react";
import { AdminMenu } from "../AdminMenu/AdminMenu";
import { AdminNavbar } from "../Navbar/AdminNavbar";
import '../global/admin.css'
import { useCanvasConfetti } from "../hooks/useCanvasConfetti";
import { PopUp } from "../PopUp/PopUp";
import { useAdminMenu } from "../hooks/useAdminMenu";
import { LoginContext } from "../context/LoginContext";

const Footer = React.lazy(()=> import('../footer/footer'))

export default function LayoutAdmin  ({children})  {

const {token,user} = useContext(LoginContext)

const [load,setload] = useState( ()=> window.localStorage.getItem('admin-hi') || false)
const {issuceed,handlesucess} = useAdminMenu()
    const { sectionRef, fireConfetti  } = useCanvasConfetti()

    const handlehi = () => {
        setload(!load)
        window.localStorage.setItem('admin-hi',true)
    }

    useEffect(() => {
    if (sectionRef.current) {
      fireConfetti();
    }
  }, [sectionRef.current]);

    return(
     <>
     { issuceed == true ? <PopUp ref={sectionRef}  isSuccess={issuceed} event={handlesucess} namebtn={'Aceptar'}  content={true}/> : null}
     {load == false ? <PopUp ref={sectionRef} content={user.nombre} event={handlehi} namebtn={'Aceptar'}/> : null}

{
token != null && user.logged == true ? 
<div className="admin-container">
        <div className="content-container">
            <header>
            <AdminNavbar/> 
            </header>
         <section className="main-section-content">
            <header>
            <AdminMenu/>
            </header>
            <main className="main-main-section-content">
              {children}
            </main>
         </section>
        </div>
        <footer>
          <Suspense fallback={<div>Cargando..</div>}>
             <Footer/>
          </Suspense>
        </footer>
     </div> 
     : null

     }
   
     </>
    )
}

