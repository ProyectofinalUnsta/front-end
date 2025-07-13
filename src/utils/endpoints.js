const endpoints = {};

if (import.meta.env.MODE === "production") {
  (endpoints.get = import.meta.env.VITE_ENDPOINT_GET),
    (endpoints.keepserveralive = import.meta.env.VITE_ENDPOINT_SERVER),
    (endpoints.keepservicealive = import.meta.env.VITE_SERVICE_IMAGE),
    (endpoints.keepmailalive = import.meta.env.VITE_SERVICE_MAIL),
    (endpoints.post = import.meta.env.VITE_ENDPOINT_POST),
    (endpoints.login = import.meta.env.VITE_ENDPOINT_LOGIN),
    (endpoints.register = import.meta.env.VITE_ENDPOINT_REGISTER),
    (endpoints.logout = import.meta.env.VITE_ENDPOINT_LOGOUT);
  endpoints.eventoPorId = import.meta.env.VITE_ENDPOINT_EVENTOID;
  endpoints.files = import.meta.env.VITE_ENDPOINT_FILES;
  endpoints.presentaciones = import.meta.env.VITE_ENDPOINT_PRESENTACIONES;
  endpoints.inscripciones = import.meta.env.VITE_ENDPOINT_INSCRIPCIONES;
}
if (import.meta.env.MODE === "development") {
  (endpoints.get = "https://back-end-fiq8.onrender.com/api/"),
    (endpoints.keepserveralive = "https://back-end-fiq8.onrender.com"),
    (endpoints.keepservicealive =
      "https://convertidor-webp-service.onrender.com"),
    (endpoints.keepmailalive = "https://email-sender-qs8y.onrender.com"),
    (endpoints.post = "https://back-end-fiq8.onrender.com/api/admin/"),
    (endpoints.login = "https://back-end-fiq8.onrender.com/api/auth/login"),
    (endpoints.register =
      "https://back-end-fiq8.onrender.com/api/auth/register"),
    (endpoints.logout = "https://back-end-fiq8.onrender.com/api/auth/logout"),
    (endpoints.eventoPorId = "https://back-end-fiq8.onrender.com/api/admin/"),
    (endpoints.files = "https://back-end-fiq8.onrender.com/api/files"),
    (endpoints.presentaciones =
      "https://back-end-fiq8.onrender.com/api/presentations/");
  endpoints.inscripciones =
    "https://back-end-fiq8.onrender.com/api/inscriptos/";
}
export default endpoints;
