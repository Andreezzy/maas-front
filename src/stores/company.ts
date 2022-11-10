import { defineStore } from 'pinia';
import { CompanyInterface } from '@/interfaces/CompanyInterface';
import { ScheduleInterface } from '@/interfaces/ScheduleInterface';
import { useDashboardStore } from '@/stores/dashboard';
import { CompanyService } from '@/services/company';

const companyService: CompanyService = new CompanyService()

const dashboardStore = useDashboardStore();
const { setEditEvents, setCompanySelected, setScheduleSelected } = dashboardStore;

interface State {
  all: CompanyInterface[] | [],
  selected: CompanyInterface | null,
  schedules: ScheduleInterface[] | [],
  currentSchedule: ScheduleInterface | null
}

export const useCompanyStore = defineStore('company', {
  state: (): State => ({
    all: [],
    selected: null,
    schedules: [],
    currentSchedule: null,
  }),

  actions: {
    async getAll() {
      await companyService.getAll()
        .then((companies: CompanyInterface[]) => {
          this.all = companies
        })
    },
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
