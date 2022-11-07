<script setup lang="ts">
  import NavBar from "@/components/layout/NavBar.vue"
</script>

<template>
  <div class="min-h-full">
    <NavBar />
    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div class="h-full min-h-[100px] rounded-lg border-gray-200">
            <router-view />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>