import { api } from "@/api"

export class UserService {
  public validateJwt = async (): Promise<any> => {
    try {
      const response = await api.get(`check_jwt`)
      return <any>response.data.user
    } catch (error) {
      console.error("service checkJwt ", error)
      throw error
    }
  }

  public login = async (email: string, password: string): Promise<any> => {
    try {
      const response = await api.post('/sessions', { email, password });
      return <any>response.data
    } catch (error) {
      console.error("service login ", error)
      throw error
    }
  }

}
