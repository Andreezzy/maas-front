import { defineStore } from "pinia"
import { EventInterface } from '@/interfaces/EventInterface'
import { ScheduleInterface } from "@/interfaces/ScheduleInterface";
import { useDashboardStore } from '@/stores/dashboard';
import { EventService } from "@/services/event";

const eventService: EventService = new EventService()

const dashboardStore = useDashboardStore();

const { setEditEvents } = dashboardStore;

interface State {
  myEvents: EventInterface[] | [],
  allEvents: EventInterface[] | [],
  activeEvents: EventInterface[] | []
}

export const useEventStore = defineStore('event', {

  state: (): State => ({
    myEvents: [
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
    allEvents: [
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
    activeEvents: [],
  }),

  actions: {
    setActiveEvents(events: EventInterface[]) {
      this.activeEvents = events;
    },

    setAllEvents(events: EventInterface[]) {
      this.allEvents = events;
    },

    setMyEvents(events: EventInterface[]) {
      this.myEvents = events;
    },

    async loadEvents(schedule: ScheduleInterface) {
      await eventService.getAll(schedule.id)
        .then((events: any) => {
          this.setAllEvents(events.all_drafts)
          this.setMyEvents(events.my_drafts)
          this.setActiveEvents(events.all_drafts)
        })
    },

    saveEvents() {
      this.myEvents = this.activeEvents;
      this.activeEvents = this.allEvents;
      setEditEvents(false);
    },

    editMyEvents() {
      setEditEvents(true);
      this.setActiveEvents(this.myEvents);
    },

    cancelEdit() {
      this.setActiveEvents(this.allEvents);
      setEditEvents(false);
    },

    addEvent(event: EventInterface) {
      this.activeEvents = [...this.activeEvents, event]
    },

    removeEvent(event: EventInterface) {
      this.activeEvents = this.activeEvents.filter((el) => el.id != event.id)
    }
  }
})