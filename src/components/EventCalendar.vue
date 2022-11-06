<script setup lang="ts">
  import '@fullcalendar/core/vdom'
  import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import { reactive } from 'vue-demi'

  interface SelectedDate {
    dateStr: string
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    // if (title) {
      calendarApi.addEvent({
        id: Date.now(),
        title: 'Hola mundo',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    // }
  }

  const options = reactive({
    plugins: [ timeGridPlugin, interactionPlugin ],
    initialView: 'timeGridWeek',
    allDaySlot: false,
    slotDuration: '01:00:00',
    slotLabelFormat: {
      hour: '2-digit',
      meridiem: 'lowercase'
    },
    headerToolbar: {
      left:   '',
      center: 'title',
      right:  ''
    },
    selectable: true,
    height: '100%',
    slotMinTime: "07:00:00",
    slotMaxTime: "21:00:00",
    expandRows: true,
    businessHours: [
      {
        daysOfWeek: [ 0 ], // Monday, Tuesday, Wednesday
        startTime: '08:00', // 8am
        endTime: '12:00', // 6pm
        color: 'red'
      },
      {
        daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
        startTime: '08:00', // 8am
        endTime: '18:00' // 6pm
      },
      {
        daysOfWeek: [ 4, 5 ], // Thursday, Friday
        startTime: '10:00', // 10am
        endTime: '16:00' // 4pm
      }
    ],
    validRange: {
      start: '2022-11-01',
      end: '2022-11-26'
    },
    selectOverlap: false,
    eventOverlap: false,
    selectConstraint: "businessHours",
    events: [
      { title: 'event 1', start: '2022-11-11T10:00:00', end: '2022-11-11T12:00:00', backgroundColor: '#ff0000', borderColor: '#ff0000' },
      { title: 'event 2', start: '2022-11-10T10:00:00', end: '2022-10-12T11:00:00' },
      { title: 'event 3', start: '2022-11-10T10:00:00', end: '2022-10-12T13:00:00' }
    ],
    displayEventTime:false,
    eventClick: (arg: EventClickArg) => handleEventClick(arg),
    select: (selectInfo: DateSelectArg) => handleDateSelect(selectInfo)
  })
</script>
<template>
  <FullCalendar :options="options" class="" />
</template>