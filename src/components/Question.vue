<template>
  <div class="relative">
    <div class="absolute top-2 right-2 text-sm text-gray-600 font-semibold">
      {{ index + 1 }} / {{ countQuestions }}
    </div>
    <div class="bg-white px-4 pt-6 pb-4 rounded-t-lg">
      <div v-if="question" class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-semibold text-lg" v-html="question.question"></h3>
          <p class="text-sm text-gray-600 font-medium">
            {{ question.category }} •
            {{ translateDifficulty(question.difficulty) }}
          </p>
        </div>

        <div class="flex space-x-4">
          <button
            v-for="(answer, i) in question.answers"
            :key="i"
            class="font-semibold text-sm border px-3 py-2 rounded-lg"
            @click="selectAnswer(answer)"
            :class="[
              {
                'bg-green-600 text-white hover:bg-green-600':
                  submited && question.correct_answer === answer,
              },
              selectedAnswer === answer &&
              answer !== question.correct_answer &&
              submited
                ? 'bg-red-600 text-white'
                : selectedAnswer === answer
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 hover:bg-gray-100',
            ]"
            v-html="answer"
          ></button>
        </div>
      </div>
    </div>
    <div
      class="
        bg-gray-50
        rounded-b-lg
        px-4
        py-3
        justify-between
        sm:px-6 sm:flex sm:flex-row-reverse
        mt-2
      "
    >
      <button
        form="get-questions"
        type="submit"
        :disabled="!selectedAnswer"
        @click="submit"
        class="
          disabled:opacity-50 disabled:hover:bg-blue-600
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-blue-600
          text-base
          font-medium
          text-white
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-blue-500
          sm:ml-3 sm:w-auto sm:text-sm
        "
      >
        <span v-if="submited">Question suivante</span>
        <span v-else>Valider ma réponse</span>
      </button>
      <button
        type="button"
        class="
          mt-3
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-gray-300
          shadow-sm
          px-4
          py-2
          bg-white
          text-base
          font-medium
          text-gray-700
          hover:bg-red-600 hover:text-white
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
        "
        @click="close()"
        ref="cancelButtonRef"
      >
        Arreter la partie
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

defineProps({
  question: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  countQuestions: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["next", "close"]);
const submited = ref(false);
const selectedAnswer = ref("");

const translateDifficulty = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "Facile";
    case "medium":
      return "Moyen";
    case "hard":
      return "Extrême";
  }
};

const selectAnswer = (answer) => {
  if (!submited.value) {
    console.log("okok");
    selectedAnswer.value = answer;
  }
};

const submit = () => {
  if (submited.value) {
    next();
  } else {
    submited.value = true;
  }
};

const next = () => {
  emit("next", selectedAnswer.value);
  submited.value = false;
  selectedAnswer.value = "";
};

const close = () => {
  emit("close");
};
</script>
