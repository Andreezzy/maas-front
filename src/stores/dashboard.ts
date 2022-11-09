import { defineStore } from 'pinia';

interface State {
  editEvents: boolean;
  companySelected: any;
  scheduleSelected: any;
  showAllDraftsButton: boolean;
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): State => ({
    editEvents: false,
    companySelected: null,
    scheduleSelected: null,
    showAllDraftsButton: false
  }),

  actions: {
    setEditEvents(value: boolean) {
      this.editEvents = value;
    },
    setCompanySelected(value: any) {
      this.companySelected = value;
    },
    setScheduleSelected(value: any) {
      this.scheduleSelected = value;
    },
    setShowAllDraftsButton(value: boolean) {
      this.showAllDraftsButton = value;
    },
  }
});
