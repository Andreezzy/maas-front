import { defineStore } from "pinia"
import { EventInterface } from '@/interfaces/EventInterface'
import { ScheduleInterface } from "@/interfaces/ScheduleInterface";
import { useDashboardStore } from '@/stores/dashboard';
import { EventService } from "@/services/event";

const eventService: EventService = new EventService()

const dashboardStore = useDashboardStore();

const { setEditEvents } = dashboardStore;

interface State {
  myDrafts: EventInterface[] | [],
  allDrafts: EventInterface[] | [],
  activeEvents: EventInterface[] | [],
  allPublished: EventInterface[] | []
}

export const useEventStore = defineStore('event', {

  state: (): State => ({
    myDrafts: [
      {
        id: '1',
        title: 'Andres',
        start: '2022-11-11T10:00:00',
        end: '2022-11-11T12:00:00',
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        extendedProps: {
          schedule_id: 1
        },
      },
    ],
    allDrafts: [
      {
        id: '1',
        title: 'Andres',
        start: '2022-11-11T10:00:00',
        end: '2022-11-11T12:00:00',
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        extendedProps: {
          schedule_id: 1
        },
      },
      {
        id: '2',
        title: 'Jorge',
        start: '2022-11-11T10:00:00',
        end: '2022-11-11T12:00:00',
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        extendedProps: {
          schedule_id: 1
        },
      },
      {
        id: '3',
        title: 'Barbara',
        start: '2022-11-10T10:00:00',
        end: '2022-10-12T13:00:00',
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        extendedProps: {
          schedule_id: 1
        },
      }
    ],
    allPublished: [],
    activeEvents: [],
  }),

  actions: {
    setActiveEvents(events: EventInterface[]) {
      this.activeEvents = events;
    },

    setAllPublished(events: EventInterface[]) {
      this.allPublished = events;
    },

    setAllDrafts(events: EventInterface[]) {
      this.allDrafts = events;
    },

    setMyDrafts(events: EventInterface[]) {
      this.myDrafts = events;
    },

    async loadEvents(schedule: ScheduleInterface) {
      await eventService.getAll(schedule.id)
        .then((events: any) => {
          this.setMyDrafts(events.my_drafts);
          this.setAllDrafts(events.all_drafts);
          this.setAllPublished(events.all_published);
          this.setActiveEvents(events.all_published);
        })
    },

    async saveEvents(schedule_id: number) {
      await eventService.updateMyEvents(this.activeEvents, schedule_id)
        .then((events: any) => {
          console.log(events)
          this.setMyDrafts(events.my_drafts);
          this.setAllDrafts(events.all_drafts);
          this.setAllPublished(events.all_published);
          this.setActiveEvents(events.all_published)
        })
        .catch((err) => {
          console.warn("HUBO UN ERROR: ", err)
          this.setActiveEvents(this.allPublished);
        })
      setEditEvents(false);
    },

    editMyEvents() {
      setEditEvents(true);
      this.setActiveEvents(this.myDrafts);
    },

    cancelEdit() {
      this.setActiveEvents(this.allPublished);
      setEditEvents(false);
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