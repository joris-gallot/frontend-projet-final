<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
      <div v-if="question" class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-semibold text-lg" v-html="question.question"></h3>
          <p class="text-sm text-gray-600 font-medium">
            {{ question.category }} • {{ question.difficulty }}
          </p>
        </div>

        <div class="flex space-x-4">
          <button
            v-for="(answer, i) in answers"
            :key="i"
            class="font-semibold text-sm border px-3 py-2 rounded-lg"
            @click="selectedAnswer = answer"
            :class="
              selectedAnswer === answer
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            "
          >
            {{ answer }}
          </button>
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
        @click="next"
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
        Valider ma réponse
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
import { defineProps, computed, defineEmits, ref } from "vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["next", "close"]);

const selectedAnswer = ref("");

const next = () => {
  emit("next", selectedAnswer.value);
  selectedAnswer.value = "";
};

const close = () => {
  emit("close");
};

const answers = computed(() => {
  if (props.question) {
    const array = shuffle([
      ...props.question.incorrect_answers,
      props.question.correct_answer,
    ]);

    return array;
  }

  return [];
});

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
</script>
