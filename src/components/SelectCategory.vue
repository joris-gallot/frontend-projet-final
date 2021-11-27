<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox
    as="div"
    :modelValue="selected"
    @update:modelValue="
      selected = $event;
      emit('update:modelValue', $event);
    "
  >
    <ListboxLabel class="block text-sm font-medium text-gray-700">
      Categorie
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        @click="fetchCategory"
        class="
          bg-white
          relative
          w-full
          border border-gray-300
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          focus:border-blue-500
          sm:text-sm
        "
      >
        <span class="block truncate">{{
          selected ? selected.name : "Choisis une categorie"
        }}</span>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="(c, i) in category"
            :key="i"
            :value="c"
            v-slot="{ active }"
          >
            <li
              :class="[
                active ? 'text-white bg-blue-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected && selected.id === c.id
                    ? 'font-semibold'
                    : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ c.name }}
              </span>

              <span
                v-if="selected && selected.id === c.id"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref, inject, defineProps, defineEmits } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const api = inject("api");

const selected = ref(null);
const category = ref([]);
const isOpen = ref(false);

const fetchCategory = async () => {
  if (!isOpen.value) {
    const { data } = await api.question.getCategory();
    category.value = data;
  }

  isOpen.value = !isOpen.value;
};
</script>
