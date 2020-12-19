// Recibe un erorr por parámetro y asigna una respuesta en texto dependiendo del tipo de error
export const parseError = (err) => {
  console.log(err)
  let errorMsg = 'Revisa tu conexión a internet o intentalo más tarde'
  if (err.response) {
    if (+err.response.status < 500) {
      errorMsg = err.response.data.message
    } else {
      errorMsg = 'Ocurrió un problema interno, intentalo más tarde'
    }
  }
  return errorMsg
}
