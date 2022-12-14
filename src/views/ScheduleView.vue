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

  const { setScheduleSelected, setEditEvents } = dashboardStore;
  const { getAll, setSelected, setCurrentSchedule } = companyStore;
  const { editMyEvents, loadEvents, saveEvents, addEvent, removeEvent, cancelEdit, loadAllDrafts, loadAllPublished } = eventStore;

  const { editEvents, companySelected, scheduleSelected, showAllDraftsButton } = storeToRefs(dashboardStore);
  const { all, selected, schedules, currentSchedule } = storeToRefs(companyStore);
  const { activeEvents, title } = storeToRefs(eventStore);

  const loadCalendarData = (schedule: ScheduleInterface) => {
    setCurrentSchedule(schedule);
    loadEvents(schedule);
    setEditEvents(false);
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
    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      <span class="block">{{ title }}</span>
    </h2>
    <div class="self-end mt-4">
      <button v-if="!showAllDraftsButton" @click="loadAllDrafts" type="button" class="btn-primary self-end max-w-[250px] mr-4">Turnos del Equipo</button>
      <button v-if="showAllDraftsButton" @click="loadAllPublished" type="button" class="btn-primary self-end max-w-[250px] mr-4">Turnos Confirmados</button>
      <button v-if="!editEvents" @click="editMyEvents" type="button" class="btn-primary self-end max-w-[250px]">Editar Mi Disponibilidad</button>
      <button v-if="editEvents" @click="()=>saveEvents(scheduleSelected.id)" type="button" class="btn-primary max-w-[250px] mr-4">Guardar Cambios</button>
      <button v-if="editEvents" @click="cancelEdit" type="button" class="btn-primary-outline max-w-[250px]">Cancelar</button>
    </div>
    <EventCalendar
      :selectable="editEvents"
      :events="activeEvents"
      :addEvent="addEvent"
      :removeEvent="removeEvent"
      :schedule_id="scheduleSelected.id"
      :slotMinTime="currentSchedule.slotMinTime"
      :slotMaxTime="currentSchedule.slotMaxTime"
      :validRange="currentSchedule.validRange"
      :businessHours="currentSchedule.businessHours"
    />
  </div>
</template>