<script setup lang="ts">
  import { useUserStore } from '@/stores/user';

  import NavBar from "@/components/layout/NavBar.vue"

  const userStore = useUserStore();

  import EventCalendar from "@/components/EventCalendar.vue"

</script>

<template>
  <div class="min-h-full">
    <NavBar />
    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div class="h-96 rounded-lg border-4 border-dashed border-gray-200">
            <EventCalendar />
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>