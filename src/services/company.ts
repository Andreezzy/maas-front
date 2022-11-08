import { api } from "@/api"

export class CompanyService {
  public getAll = async (): Promise<any> => {
    try {
      const response = await api.get(`companies`)
      return <any>response.data
    } catch (error) {
      console.error("service CompanyService#getAll  ", error)
      throw error
    }
  }
}
