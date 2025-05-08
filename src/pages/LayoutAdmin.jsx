import { useState } from "react";
import { AdminMenu } from "../AdminMenu/AdminMenu";
import { AdminNavbar } from "../Navbar/AdminNavbar";
import '../global/admin.css'
import { useCanvasConfetti } from "../hooks/useCanvasConfetti";
import { PopUp } from "../PopUp/PopUp";
import { Footer } from "../footer/footer";

export function LayoutAdmin  ({children})  {

const [load,setload] = useState( ()=> window.localStorage.getItem('admin-hi') || false)

    const { sectionRef } = useCanvasConfetti()

    const handlehi = () => {
        setload(!load)
        window.localStorage.setItem('admin-hi',true)
    }

    return(
     <>
     {load == false ? <PopUp ref={sectionRef} content={'Jhon Doe!'} event={handlehi} namebtn={'Aceptar'}/> : null}
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
            <Footer/>
        </footer>
     </div>
     </>
    )
}

