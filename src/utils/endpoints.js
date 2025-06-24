const endpoints = {}

if(import.meta.env.MODE ===   'production'){

    endpoints.get = import.meta.env.VITE_ENDPOINT_GET,
    endpoints.post = import.meta.env.VITE_ENDPOINT_POST,
    endpoints.login = import.meta.env.VITE_ENDPOINT_LOGIN,
    endpoints.register = import.meta.env.VITE_ENDPOINT_REGISTER,
    endpoints.logout = import.meta.env.VITE_ENDPOINT_LOGOUT
    endpoints.eventoPorId = import.meta.env.VITE_ENDPOINT_EVENTOID

}
if(import.meta.env.MODE === 'development'){
      endpoints.get = 'http://localhost:3000/api/',
    endpoints.post = 'http://localhost:3000/api/admin/',
    endpoints.login = 'http://localhost:3000/api/auth/login',
    endpoints.register = 'http://localhost:3000/api/auth/register',
    endpoints.logout = 'http://localhost:3000/api/auth/logout'
    endpoints.eventoPorId = 'http://localhost:3000/api/admin/'
}
export default endpoints