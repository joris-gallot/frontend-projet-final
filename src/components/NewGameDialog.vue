<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="close()"
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
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
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
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
              <h3 class="font-semibold text-2xl mb-8">Nouvelle partie</h3>

              <form
                id="get-questions"
                @submit.prevent="getQuestion"
                class="space-y-4"
              >
                <div>
                  <label
                    for="amount"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Nombre de questions
                  </label>
                  <div class="mt-1">
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      v-model="amount"
                      required
                      min="1"
                      max="30"
                      class="
                        appearance-none
                        block
                        w-full
                        px-3
                        py-2
                        border border-gray-300
                        rounded-md
                        shadow-sm
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-blue-500
                        focus:border-blue-500
                        sm:text-sm
                      "
                    />
                    <span
                      v-for="(e, i) in amountErrors"
                      :key="i"
                      class="text-red-500 text-sm"
                      >{{ e }}</span
                    >
                  </div>
                </div>

                <div>
                  <SelectCategory v-model="category" />
                  <span
                    v-for="(e, i) in categoryErrors"
                    :key="i"
                    class="text-red-500 text-sm"
                    >{{ e }}</span
                  >
                </div>
              </form>
            </div>
            <div
              class="
                bg-gray-50
                rounded-b-lg
                px-4
                py-3
                sm:px-6 sm:flex sm:flex-row-reverse
                mt-2
              "
            >
              <button
                form="get-questions"
                type="submit"
                class="
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
                Valider
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
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-blue-500
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                "
                @click="close()"
                ref="cancelButtonRef"
              >
                Annuler
              </button>
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
import { ExclamationIcon } from "@heroicons/vue/outline";
import { defineComponent, inject, ref, defineEmits } from "vue";
import { useStore } from "vuex";
import { configure, useField, useForm } from "vee-validate";
import { string, object, number } from "yup";
import { useRouter } from "vue-router";
import SelectCategory from "./SelectCategory.vue";

defineProps({
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
const emit = defineEmits(["createdGame"]);
const schema = object({
  amount: number(),
  category: object(),
});

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: schema,
  initialValues: { amount: 10 },
});
const { errors: amountErrors, value: amount } = useField("amount", number());

const { errors: categoryErrors, value: category } = useField(
  "category",
  object()
);

const getQuestion = async () => {
  const { data } = await api.question.getQuestions({
    amount: amount.value,
    category: category.value ? category.value.id : undefined,
  });

  emit("createdGame", data);
};
</script>
