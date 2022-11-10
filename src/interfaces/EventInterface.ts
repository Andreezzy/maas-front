export interface EventInterface {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  color?: string;
  kind: string;
  user_id: number;
  schedule_id: number;
  extendedProps: object;
}