<script setup lang="ts">
  import '@fullcalendar/core/vdom';
  import FullCalendar, { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/vue3';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { ref, toRefs } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { EventInterface } from '@/interfaces/EventInterface';
  import { ScheduleInterface } from '@/interfaces/ScheduleInterface';

  const userStore = useUserStore();
  const { currentUser } = userStore;

  const SLOT_LABEL_FORMAT = {
    hour: '2-digit',
    meridiem: 'lowercase'
  } as const

  const props = defineProps<{
    events: EventInterface[],
    selectable: boolean,
    addEvent: Function,
    removeEvent: Function,
    schedule_id: number,
    slotMinTime: string,
    slotMaxTime: string,
    validRange: object,
    businessHours: any
  }>()

  const { selectable,
          events,
          schedule_id,
          slotMinTime,
          slotMaxTime,
          validRange,
          businessHours
  } = toRefs(props);

  const handleEventClick = (clickInfo: EventClickArg) => {
    // const { extendedProps } = clickInfo.event
    if (selectable.value && confirm(`Estás seguro de eliminar el evento: ${clickInfo.event.start?.getHours()} - ${clickInfo.event.end?.getHours()}`)) {
      // clickInfo.event.remove()
      props.removeEvent(clickInfo.event);
    }
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const newEvent: EventInput = {
      id: Date.now().toString(),
      title: currentUser.name,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: currentUser.color,
      borderColor: currentUser.color,
    }
    // calendarApi.addEvent(newEvent)
    if(selectable.value)
      props.addEvent(newEvent, currentUser.id, schedule_id);
  }

  const options = ref({
    allDaySlot: false,
    displayEventTime: false,
    expandRows: true,
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    // height: '100%',
    initialView: 'timeGridWeek',
    plugins: [ timeGridPlugin, interactionPlugin ],
    slotDuration: '01:00:00',
    slotLabelFormat: SLOT_LABEL_FORMAT,
    selectOverlap: false,
    eventOverlap: false,
    selectable: selectable,
    slotMinTime: slotMinTime,
    slotMaxTime: slotMaxTime,
    businessHours: businessHours,
    selectConstraint: businessHours,
    validRange: validRange,
    events: events,
    timeZone: 'UTC',
    eventClick: (arg: EventClickArg) => handleEventClick(arg),
    select: (selectInfo: DateSelectArg) => handleDateSelect(selectInfo)
  })
</script>
<template>
  <FullCalendar :options="options" />
</template>