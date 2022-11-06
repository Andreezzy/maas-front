<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>

<template>
  <div>
    <h1 className="text-3xl font-bold underline text-sky-400">
      Hello world!
    </h1>
    <h1>Hi {{user?.firstName}}!</h1>
    <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
  </div>
</template>