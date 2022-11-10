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

  public updateMyEvents = async (events: any, schedule_id: number): Promise<any> => {
    try {
      const payload = events.map(({start: start_time, end: end_time, ...vl}: any)=>({start_time, end_time, ...vl}));
      const response = await api.post(`events?schedule_id=${schedule_id}`, {
        events: payload
      })
      return <any>response.data
    } catch (error) {
      console.error("service EventService#getAll  ", error)
      throw error
    }
  }
}
