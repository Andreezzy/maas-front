import { defineStore } from "pinia"
import { EventInterface } from '@/interfaces/EventInterface'
import { ScheduleInterface } from "@/interfaces/ScheduleInterface";
import { useDashboardStore } from '@/stores/dashboard';
import { EventService } from "@/services/event";

const eventService: EventService = new EventService()

const dashboardStore = useDashboardStore();

const { setEditEvents, setShowAllDraftsButton } = dashboardStore;

interface State {
  myDrafts: EventInterface[] | [],
  allDrafts: EventInterface[] | [],
  activeEvents: EventInterface[] | [],
  allPublished: EventInterface[] | [],
  title: string
}

export const useEventStore = defineStore('event', {

  state: (): State => ({
    myDrafts: [],
    allDrafts: [],
    activeEvents: [],
    allPublished: [],
    title: '',
  }),

  actions: {
    setActiveEvents(events: EventInterface[]) {
      this.activeEvents = events;
    },

    setAllPublished(events: EventInterface[]) {
      this.allPublished = this.parseColor(events);
    },

    setAllDrafts(events: EventInterface[]) {
      this.allDrafts = this.parseColor(events);
    },

    setMyDrafts(events: EventInterface[]) {
      this.myDrafts = this.parseColor(events);
    },

    setTitleConfirmed() {
      this.title = 'Turnos Confirmados';
    },

    parseColor(events: EventInterface[]) {
      return events.map((event: any) => (
        { ...event, backgroundColor: event.color, borderColor: event.color }
      ))
    },

    async loadEvents(schedule: ScheduleInterface) {
      await eventService.getAll(schedule.id)
        .then((events: any) => {
          this.setMyDrafts(events.my_drafts);
          this.setAllDrafts(events.all_drafts);
          this.setAllPublished(events.all_published);
          this.setActiveEvents(this.allPublished);
          this.setTitleConfirmed();
        })
    },

    async saveEvents(schedule_id: number) {
      await eventService.updateMyEvents(this.activeEvents, schedule_id)
        .then((events: any) => {
          this.setMyDrafts(events.my_drafts);
          this.setAllDrafts(events.all_drafts);
          this.setAllPublished(events.all_published);
          this.setActiveEvents(this.allPublished);
        })
        .catch((err) => {
          console.warn("HUBO UN ERROR: ", err)
          this.setActiveEvents(this.allPublished);
        })
      setEditEvents(false);
      this.setTitleConfirmed()
    },

    loadAllDrafts() {
      this.setActiveEvents(this.allDrafts);
      setEditEvents(false);
      setShowAllDraftsButton(true);
      this.title = 'Turnos Del Equipo';
    },

    loadAllPublished() {
      this.setActiveEvents(this.allPublished);
      setEditEvents(false);
      setShowAllDraftsButton(false);
      this.setTitleConfirmed()
    },

    editMyEvents() {
      setEditEvents(true);
      this.setActiveEvents(this.myDrafts);
      this.title = 'Mi Disponibilidad';
    },

    cancelEdit() {
      this.setActiveEvents(this.allPublished);
      setEditEvents(false);
      this.setTitleConfirmed()
    },

    addEvent(event: EventInterface, user_id: number, schedule_id: number) {
      const payload = {...event, user_id, schedule_id, kind: 'draft'}
      this.activeEvents = [...this.activeEvents, payload]
    },

    removeEvent(event: EventInterface) {
      this.activeEvents = this.activeEvents.filter((el) => el.id != event.id)
    }
  }
})