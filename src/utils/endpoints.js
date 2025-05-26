const endpoints = {}

if(import.meta.env.MODE === 'development' || import.meta.env.MODE ===   'production'){

    endpoints.get = import.meta.env.VITE_ENDPOINT_GET,
    endpoints.post = import.meta.env.VITE_ENDPOINT_POST,
    endpoints.login = import.meta.env.VITE_ENDPOINT_LOGIN,
    endpoints.register = import.meta.env.VITE_ENDPOINT_REGISTER,
    endpoints.logout = import.meta.env.VITE_ENDPOINT_LOGOUT

}

export default endpoints