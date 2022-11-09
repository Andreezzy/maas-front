<script setup lang="ts">
  import { defineAsyncComponent } from "vue"
  const ScheduleView = defineAsyncComponent(() => import("@/views/ScheduleView.vue"))
</script>
<template>
  <Suspense>
    <template #default>
      <ScheduleView />
    </template>
</Suspense>
</template>
