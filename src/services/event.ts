import { api } from "@/api"

export class EventService {
  public getAll = async (schedule_id: number): Promise<any> => {
    try {
      const response = await api.get(`events?schedule_id=${schedule_id}`)
      return <any>response.data
    } catch (error) {
      console.error("service EventService#getAll  ", error)
      throw error
    }
  }
}
