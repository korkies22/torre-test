export default function ({ $axios }) {
  // Asigna el URL dependiendo de si está en producción o desarrollo
  const url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000/api/'
      : 'https://MOUNTED.net/api/'
  // Este NIT debe ser cambiado por cada retailer
  // Se asignan los parámetros para todas las peticiones
  $axios.setBaseURL(url)
}
