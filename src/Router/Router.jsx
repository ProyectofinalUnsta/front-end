import React  from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { useServerActive } from '../hooks/useActiveServer'
const   HomePage = React.lazy(()=> import('../pages/HomePage'))
const  ProductsPage = React.lazy(()=> import('../pages/ProductsPage'))
const  SobreNosotros = React.lazy(()=> import('../pages/SobreNosotros'))
const  ErrorPage = React.lazy(()=> import('../pages/ErrorPage'))
const   EventDetailsPage = React.lazy(()=> import('../pages/EventDetailsPage'))
const  AdminPage = React.lazy(()=> import('../pages/AdminPage'))
const  DisertantePage = React.lazy(()=> import('../pages/DisertantePage')) 
const  AdminCreatePage = React.lazy(()=> import('../pages/AdminCreatePage'))
const  AdminTodoPage  = React.lazy(()=> import('../pages/AdminTodoPage'))
const AdminFilesPage = React.lazy(()=> import('../pages/AdminFilesPage'))
const Login = React.lazy(()=> import('../pages/auth/Login')) 
const Register = React.lazy(()=> import('../pages/auth/Register'))
const  MisArchivos = React.lazy(()=> import('../pages/MisArchivos'))
const  MisEventos = React.lazy(()=> import('../pages/MisEventos'))
const PresentationPage = React.lazy(()=> import('../pages/PresentationPage'))
const AdminMetricas = React.lazy(()=> import('../pages/AdminMetricas'))
const VerMisIncripciones = React.lazy(()=> import('../pages/VerMisIncripciones'))
const PoliticasPage = React.lazy(()=> import('../pages/PoliticasPage'))
const ContactanosPage = React.lazy(()=> import('../pages/ContactanosPage'))
const UserProfilePage = React.lazy(()=> import('../pages/UserProfilePage'))

export default function Router () {
// hook mantiene "vivo" el servidor
useServerActive()
    return(
        <>
           <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Suspense fallback={<div>Cargando...</div>}>
                    <HomePage/>
                  </Suspense>} />
                  <Route path='/Eventos' element={ <Suspense fallback={<div>Cargando...</div>}>
                    <ProductsPage/>
                  </Suspense> }/>
                  <Route path='/Eventos/:id' element={ <Suspense fallback={<div>Cargando...</div>}>
                    <EventDetailsPage/>
                  </Suspense> }/>
                  <Route path='/Eventos/CargarDatos/:id' element={ <Suspense fallback={<div>Cargando...</div>}>
                      <DisertantePage/>
                  </Suspense>}/>
                  <Route path="/SobreNosotros" element={<SobreNosotros />} />
                  <Route path='/Admin' element={<AdminPage/>}/>
                  <Route path='/Admin/CrearEvento' element={<AdminCreatePage/>}/>
                  <Route path='/Admin/Todo' element={<AdminTodoPage/>}/>
                  <Route path='/Admin/Archivos' element={<Suspense fallback={<div>Cargando...</div>}>
                      <AdminFilesPage/>
                  </Suspense>}/>
                  <Route path='/Admin/Metricas' element={<Suspense fallback={<div>Cargando...</div>}>
                      <AdminMetricas/>
                  </Suspense>}/>
                   <Route path="/login" element={ <Suspense fallback={<div>Cargando...</div>}> 
                     <Login />
                   </Suspense>} />
                  <Route path="/register" element={ <Suspense fallback={<div>Cargando...</div>}>
                  <Register/>
                  </Suspense>} />
                  <Route path='/MisArchivos' element={ <Suspense fallback={<div>Cargando...</div>}>
                      <MisArchivos/>
                  </Suspense>}/>
                  <Route path='/MisEventos' element={ <Suspense fallback={<div>Cargando...</div>}>
                      <MisEventos/>
                  </Suspense>}/>
                  <Route path='/Presentacion' element={<Suspense fallback={<div>Cargando..</div>}>
                    <PresentationPage/>
                  </Suspense>} />
                  <Route path='/ver-mis-incripciones' element={ <Suspense fallback={<div>Cargando...</div>}>
                      <VerMisIncripciones/>
                  </Suspense>}/>
                  <Route path='/politicas' element={<Suspense fallback={<div>Cargando...</div>}>
                    <PoliticasPage/>
                  </Suspense>} />
                  <Route path='/contactanos' element={<Suspense fallback={<div>Cargando...</div>}>
                    <ContactanosPage/>
                  </Suspense>} />
                  <Route path='/usuario' element={<Suspense fallback={<div>Cargando...</div>}>
                    <UserProfilePage/>
                  </Suspense>} />
                  <Route path='*' element={ <Suspense fallback={<div>cargando...</div>}>
                    <ErrorPage/>
                  </Suspense> }/>
                </Routes>
                </BrowserRouter>
           
        </>
    )
}