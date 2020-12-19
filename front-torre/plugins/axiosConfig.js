export default function ({ $axios }) {
  // Asigna el URL dependiendo de si está en producción o desarrollo
  const url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000/api/'
      : 'https://d1fusizmrn8u31.cloudfront.net/api/'
  // Este NIT debe ser cambiado por cada retailer
  const NIT = '800242106-2'
  // Se asignan los parámetros para todas las peticiones
  $axios.setBaseURL(url)
  $axios.setHeader('Company-NIT', NIT)
}
