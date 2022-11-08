<script setup lang="ts">
  import { ref } from "vue";
  import { storeToRefs } from "pinia";

  import EventCalendar from "@/components/EventCalendar.vue";
  import SelectMenu from "@/components/SelectMenu.vue";

  import { useCompanyStore } from '@/stores/company';
  import { useDashboardStore } from '@/stores/dashboard';
  import { useEventStore } from '@/stores/event';
  import { ScheduleInterface } from "@/interfaces/ScheduleInterface";
  
  const dashboardStore = useDashboardStore();
  const companyStore = useCompanyStore();
  const eventStore = useEventStore();

  const { setScheduleSelected } = dashboardStore;
  const { getAll, setSelected, setCurrentSchedule } = companyStore;
  const { editMyEvents, loadEvents, saveEvents, addEvent, removeEvent, cancelEdit } = eventStore;

  const { editEvents, companySelected, scheduleSelected } = storeToRefs(dashboardStore);
  const { all, selected, schedules, currentSchedule } = storeToRefs(companyStore);
  const { activeEvents } = storeToRefs(eventStore);

  const loadCalendarData = (schedule: ScheduleInterface) => {
    setCurrentSchedule(schedule);
    loadEvents(schedule);
    setScheduleSelected(schedule);
  }
  await getAll()
</script>
<template>
  <div class="flex">
    <SelectMenu text-label='Company' :values="all" :selected="companySelected" :onSelect="setSelected" class="mr-4" />
    <SelectMenu text-label='Week' :values="schedules" :selected="scheduleSelected" :onSelect="loadCalendarData" />
  </div>
  <div v-if="currentSchedule" class="mt-4 flex flex-col">
    <button v-if="!editEvents" @click="editMyEvents" type="button" class="btn-primary self-end max-w-[250px]">Editar Disponibilidad</button>
    <div v-else class="self-end">
      <button @click="saveEvents" type="button" class="btn-primary max-w-[250px] mr-4">Guardar Cambios</button>
      <button @click="cancelEdit" type="button" class="btn-primary-outline max-w-[250px]">Cancelar</button>
    </div>
    <EventCalendar
      :selectable="editEvents"
      :schedule="currentSchedule"
      :events="activeEvents"
      :addEvent="addEvent"
      :removeEvent="removeEvent"
    />
  </div>
</template>