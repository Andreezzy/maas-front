import { defineStore } from 'pinia';
import { CompanyInterface } from '@/interfaces/CompanyInterface';
import { ScheduleInterface } from '@/interfaces/ScheduleInterface';
import { useDashboardStore } from '@/stores/dashboard';

const dashboardStore = useDashboardStore();
const { setEditEvents, setCompanySelected, setScheduleSelected } = dashboardStore;

interface State {
  all: CompanyInterface[] | null,
  selected: CompanyInterface | null,
  schedules: ScheduleInterface[] | [],
  currentSchedule: ScheduleInterface | null
}

export const useCompanyStore = defineStore('company', {
  state: (): State => ({
    all: [
      {
        id: 1,
        name: 'Recorrido',
        avatar: 'https://play-lh.googleusercontent.com/y_RWngrNi3t0YRRZ6Kq4U9RMaDAmaqFxBV9EW_uMkD9Z8mDPf3ouxSWMwhZT3mekWbM=w240-h480-rw',
        schedules: [
          {
            id: 1,
            name: 'Semana 11-2022',
            week: '10',
            company_id: 1,
            validRange: {
              start: '2022-11-06',
              end: '2022-11-13'
            },
            slotMinTime: "06:00:00",
            slotMaxTime: "21:00:00",
            businessHours: [
              {
                daysOfWeek: [ 0 ], // Monday, Tuesday, Wednesday
                startTime: '08:00',
                endTime: '12:00'
              },
              {
                daysOfWeek: [ 1, 2, 3, 4 ], // Monday, Tuesday, Wednesday
                startTime: '08:00',
                endTime: '18:00'
              },
              {
                daysOfWeek: [ 5, 6 ], // Thursday, Friday
                startTime: '09:00',
                endTime: '16:00'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Betterfly',
        avatar: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/sqirokuyqqzwfk198n9x',
        schedules: [
          {
            id: 1,
            name: 'Semana 12-2022',
            week: '10',
            company_id: 1,
            validRange: {
              start: '2022-11-06',
              end: '2022-11-13'
            },
            slotMinTime: "08:00:00",
            slotMaxTime: "12:00:00",
            businessHours: [
              {
                daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6 ],
                startTime: '08:00',
                endTime: '12:00'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Buk',
        avatar: 'https://www.buk.mx/hubfs/logoBukAzul-1.png',
        schedules: []
      }
    ],
    selected: null,
    schedules: [],
    currentSchedule: null,
  }),

  actions: {
    setSelected(company: CompanyInterface) {
      if(company.id != this.selected?.id) {
        this.selected = company;
        this.schedules = company.schedules;
        this.currentSchedule = null;
        setEditEvents(false);
        setCompanySelected(company);
        setScheduleSelected(null);
      }
    },
    setCurrentSchedule(schedule: ScheduleInterface) {
      this.currentSchedule = schedule
    },
  }
});
