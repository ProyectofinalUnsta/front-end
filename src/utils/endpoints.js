const endpoints = {}

if(import.meta.env.MODE ===   'production'){
    endpoints.get = import.meta.env.VITE_ENDPOINT_GET,
    endpoints.keepserveralive = import.meta.env.VITE_ENDPOINT_SERVER,
    endpoints.keepservicealive = import.meta.env.VITE_SERVICE_IMAGE,
    endpoints.keepmailalive = import.meta.env.VITE_SERVICE_MAIL,
    endpoints.post = import.meta.env.VITE_ENDPOINT_POST,
    endpoints.login = import.meta.env.VITE_ENDPOINT_LOGIN,
    endpoints.register = import.meta.env.VITE_ENDPOINT_REGISTER,
    endpoints.logout = import.meta.env.VITE_ENDPOINT_LOGOUT
    endpoints.eventoPorId = import.meta.env.VITE_ENDPOINT_EVENTOID
    endpoints.files = import.meta.env.VITE_ENDPOINT_FILES
    endpoints.presentaciones = import.meta.env.VITE_ENDPOINT_PRESENTACIONES
    endpoints.inscripciones = import.meta.env.VITE_ENDPOINT_INSCRIPCIONES
    endpoints.disertantes = import.meta.env.VITE_ENDPOINT_DISERTANTES
}
if(import.meta.env.MODE === 'development'){
    endpoints.get = 'http://localhost:3001/api/',
    endpoints.keepserveralive = 'http://localhost:3001',
    endpoints.keepservicealive = 'http://localhost:3001',
    endpoints.keepmailalive = 'http://localhost:3001',
    endpoints.post = 'http://localhost:3001/api/admin/',
    endpoints.login = 'http://localhost:3001/api/auth/login',
    endpoints.register = 'http://localhost:3001/api/auth/register',
    endpoints.logout = 'http://localhost:3001/api/auth/logout',
    endpoints.eventoPorId = 'http://localhost:3001/api/admin/',
    endpoints.files = 'http://localhost:3001/api/files',
    endpoints.presentaciones = 'http://localhost:3001/api/presentations/'
    endpoints.inscripciones = 'http://localhost:3001/api/inscriptos/'
    endpoints.disertantes = 'http://localhost:3001/api/disertante/'
}
export default endpoints