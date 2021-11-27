<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="font-semibold text-4xl mb-6">Historique</h1>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
    <div v-else-if="!history.length" class="text-gray-700">
      Aucun historique.
    </div>

    <ul v-else role="list" class="divide-y divide-gray-200">
      <li v-for="(h, i) in history" :key="i" class="py-4">
        <p class="text-sm font-medium text-gray-900">Score {{ h.score }}</p>
        <p class="text-sm text-gray-500">
          Partie joué le {{ formatDate(h.createdAt) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { DateTime } from "luxon";

const api = inject("api");
const history = ref([]);
const error = ref(null);
const loading = ref(false);

onMounted(() => {
  getHistory();
});

const formatDate = (date) => {
  return DateTime.fromJSDate(new Date(date)).toFormat("ff");
};

const getHistory = async () => {
  loading.value = true;
  const res = await api.game.getHistory().catch((e) => {
    error.value = "Erreur lors de la récupération de l'historique";
    return null;
  });

  if (res) {
    history.value = res.data;
  }
  loading.value = false;
};
</script>
