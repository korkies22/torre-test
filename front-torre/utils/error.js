// Recibe un erorr por parámetro y asigna una respuesta en texto dependiendo del tipo de error
export const parseError = (err) => {
  console.log(err)
  let errorMsg = 'Check your internet connection or try again later'
  if (err.response) {
    if (+err.response.status < 500) {
      errorMsg = err.response.data.message
    } else {
      errorMsg = 'There has been an internal problem, try again later'
    }
  }
  return errorMsg
}
