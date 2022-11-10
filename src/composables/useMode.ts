const useMode = () => {

  const isProduction = import.meta.env.PROD
  const isDevelopment = import.meta.env.DEV
  const domain = isProduction ? "https://maas-api-cl.herokuapp.com" : "http://localhost:3000"

  const baseUrl = `${domain}/api/v1/`

  return {
    isProduction,
    isDevelopment,
    baseUrl
  }
}

export default useMode