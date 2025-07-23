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
    endpoints.publicdownloads = import.meta.env.VITE_ENDPOINT_PUBLIC_DOWNLOADS
    endpoints.userProfile = import.meta.env.VITE_ENDPOINT_USER_PROFILE
}
if(import.meta.env.MODE === 'development'){
      endpoints.get = 'http://localhost:3001/api/',
    endpoints.keepserveralive = 'http://localhost:3001',
    endpoints.keepservicealive = 'https://convertidor-webp-service.onrender.com',
    endpoints.keepmailalive = 'https://email-sender-qs8y.onrender.com',
    endpoints.post = 'http://localhost:3001/api/admin/',
    endpoints.login = 'http://localhost:3001/api/auth/login',
    endpoints.register = 'http://localhost:3001/api/auth/register',
    endpoints.logout = 'http://localhost:3001/api/auth/logout',
    endpoints.eventoPorId = 'http://localhost:3001/api/admin/',
    endpoints.files = 'http://localhost:3001/api/files',
    endpoints.presentaciones = 'http://localhost:3001/api/presentations/'
    endpoints.inscripciones = 'http://localhost:3001/api/inscriptos/'
    endpoints.disertantes = 'http://localhost:3001/api/disertante/'
    endpoints.publicdownloads = 'http://localhost:3001/api/descargas/'
    endpoints.userProfile = 'http://localhost:3001/api/user/'
}
export default endpoints
