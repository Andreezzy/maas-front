<script setup lang="ts">
  import NavBar from "@/components/layout/NavBar.vue"
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
  <div class="min-h-full">
    <NavBar />
    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div class="h-full min-h-[100px] rounded-lg border-gray-200">
            <div class="flex ">
              <SelectMenu text-label='Company' :values="all" :onSelect="setSelected" class="mr-4" />
              <SelectMenu text-label='Week' :onSelect="test" :values="schedules" />
            </div>
            <div class="mt-4">
              <EventCalendar />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>