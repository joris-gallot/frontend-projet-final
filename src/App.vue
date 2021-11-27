<template>
  <div class="h-full">
    <Navbar v-if="store.state.user" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
