import { defineStore } from "pinia"
import { EventInterface } from '@/interfaces/EventInterface'
import { ScheduleInterface } from "@/interfaces/ScheduleInterface";
import { useDashboardStore } from '@/stores/dashboard';

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

    loadEvents(schedule: ScheduleInterface) {
      // request to get events
      this.setActiveEvents(this.allEvents);
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