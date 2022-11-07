import { defineStore } from 'pinia';
import { CompanyInterface } from '@/interfaces/CompanyInterface';
import { ScheduleInterface } from '@/interfaces/ScheduleInterface';

interface State {
  all: CompanyInterface[] | null,
  selected: CompanyInterface | null,
  schedules: ScheduleInterface[] | []
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
            start: '',
            end: '',
            week: '10',
            company_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Betterfly',
        avatar: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/sqirokuyqqzwfk198n9x',
        schedules: []
      },
      {
        id: 3,
        name: 'Buk',
        avatar: 'https://www.buk.mx/hubfs/logoBukAzul-1.png',
        schedules: []
      }
    ],
    selected: null,
    schedules: []
  }),

  actions: {
    setSelected(company: CompanyInterface) {
      this.selected = company
      this.schedules = company.schedules
    },
  }
});
