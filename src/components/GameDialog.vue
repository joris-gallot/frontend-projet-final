<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="beforeClose"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="
              fixed
              inset-0
              bg-gray-500 bg-opacity-75
              transition-opacity
              pointer-events-none
            "
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
            "
          >
            <Question
              v-if="questions.length && !gameEnd"
              :question="questions[activeIndex]"
              @next="next"
              @close="beforeClose"
            />

            <div v-if="gameEnd">
              <div class="bg-white p-4 sm:p-6 rounded-lg text-center space-y-4">
                <h3 class="font-bold text-2xl">Fin de la partie</h3>
                <h3 class="text-gray-700 text-xl">
                  Votre score :
                  <span class="font-bold text-xl"> {{ score }} </span>
                </h3>
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
                  @click="beforeClose()"
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
                  Voir mon historique
                </button>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { defineComponent, inject, ref, onMounted, defineEmits } from "vue";
import Question from "./Question.vue";

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Function,
    required: true,
  },
});
const api = inject("api");
const activeIndex = ref(0);
const gameEnd = ref(false);
const answers = ref([]);
const score = ref(0);
const emit = defineEmits(["finish"]);

const beforeClose = () => {
  answers.value = [];
  activeIndex.value = 0;
  emit("finish");
  gameEnd.value = false;
};

const sendAnwser = async () => {
  const answersWithQuestion = answers.value.map((answer, i) => ({
    answer,
    questionId: props.questions[i]._id,
  }));

  const { data } = await api.question
    .sendAnswers(props.gameId, answersWithQuestion)
    .catch((e) => {
      console.log(error);
    });

  score.value = data.score;
};

const next = async (answer) => {
  answers.value.push(answer);
  if (activeIndex.value === props.questions.length - 1) {
    gameEnd.value = true;
    await sendAnwser();
  } else {
    activeIndex.value = activeIndex.value + 1;
  }
};
</script>
