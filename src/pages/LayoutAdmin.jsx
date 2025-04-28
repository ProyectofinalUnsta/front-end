import { AdminMenu } from "../AdminMenu/AdminMenu";
import { AdminNavbar } from "../Navbar/AdminNavbar";
import '../global/admin.css'
import { useCanvasConfetti } from "../hooks/useCanvasConfetti";
export function LayoutAdmin  ({children})  {

    const { sectionRef } = useCanvasConfetti()
    return(
     <>
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
            <header className="panel-admin-title">
                <h2>Panel Administrador</h2>
            </header>
         <section ref={sectionRef}  style={{
          textAlign: 'center',
          padding: '50px',
          borderRadius: '10px',
          position: 'relative',  // Asegura que el confeti se origine sobre la sección
        }} 
        className="say-hi-login">
                <h2 className="hi-admin">Bienvenido Mateo Lozano!</h2>
            </section>
            </main>
         </section>
        </div>
     </div>
     </>
    )
}