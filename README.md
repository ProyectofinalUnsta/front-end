#Eventum 

1 estructura de carpetas
se creara una carpeta para cada componente y dentro de esa carpeta se encontrarar los componentes que este utilizara , los estylos o otros recursos

EJ

//SomeComponent.jsx|
                   |style
                   |somecomponent.css
                   |
                   |componentes
                   |Navbar.jsx
                   |Cart.jsx

2 se utilizara como dependencias react router para enrutar la pagina y axios para hacer peticiones http

documentacion de axios: https://axios-http.com/es/docs/intro
documentacion de react-router: https://reactrouter.com/home


3 uso de react-router 
1 como agregar rutas ?
1 crear un componente , el cual sera ejecutada en esa ruta
2 crear un elemento Route , este consta de dos parametros path=? el cual es la ruta donde se encontrara el componente, 2 el element=? es decir el componente que recibira en esa ruta
3 agregar el elemeto route dentro de routes en app.jsx deberia verse algo asi
<BrowserRouter>
<Routes>
<Route path="/someruta" element={<MiComponente/>}/>
</Routes>
</BrowserRouter>
