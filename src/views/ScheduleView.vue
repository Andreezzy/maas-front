<script setup lang="ts">
  import EventCalendar from "@/components/EventCalendar.vue"
  import SelectMenu from "@/components/SelectMenu.vue"

  import { useCompanyStore } from '@/stores/company';
  import { storeToRefs } from "pinia";

  const companyStore = useCompanyStore();

  const { all, setSelected } = companyStore
  const { selected, schedules } = storeToRefs(companyStore)

  const test = (val: object) => console.log(val)
</script>
<template>
  <div class="flex ">
    <SelectMenu text-label='Company' :values="all" :onSelect="setSelected" class="mr-4" />
    <SelectMenu text-label='Week' :onSelect="test" :values="schedules" />
  </div>
  <div class="mt-4">
    <EventCalendar />
  </div>
</template>