import { ScheduleInterface } from "@/interfaces/ScheduleInterface";

export interface CompanyInterface {
  id: number;
  name: string;
  avatar: string;
  schedules: ScheduleInterface[];
}