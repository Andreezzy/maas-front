import SecureLS from "secure-ls";
const ls = new SecureLS()

export default class Session {
  static AUTH_TOKEN = "my_auth_token"
  static JWT_DATA = "my_jwt_data"

  static setToken(token: string) {
    ls.set(this.AUTH_TOKEN, token)
  }

  static setJWTData (JWTData: object) {
    const serializedJWTData = JSON.stringify(JWTData)
    ls.set(this.JWT_DATA, serializedJWTData)
  }

  static getToken() {
    try {
      return ls.get(this.AUTH_TOKEN)
    } catch (e) {
      return null
    }
  }

  static getJWTData () {
    const serializedJWTData = ls.get(this.JWT_DATA)
    if (!serializedJWTData) return { }

    return JSON.parse(serializedJWTData)
  }

  static clear() {
    localStorage.removeItem(this.AUTH_TOKEN)
    localStorage.removeItem(this.JWT_DATA)
    ls.removeAll()
  }
}
