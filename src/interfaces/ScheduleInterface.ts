interface BusinessHour {
  daysOfWeek: number[];
  startTime: string,
  endTime: string
}

interface ValidRange {
  start: string;
  end: string;
}
export interface ScheduleInterface {
  id: number;
  name: string,
  week: string;
  company_id: number;
  validRange: ValidRange,
  slotMinTime: string,
  slotMaxTime: string,
  businessHours: BusinessHour[]
}