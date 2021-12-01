<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="-ml-2 mr-2 flex items-center md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="
                  inline-flex
                  items-center
                  justify-center
                  p-2
                  rounded-md
                  text-gray-400
                  hover:text-gray-500 hover:bg-gray-100
                  focus:outline-none
                  focus:ring-2
                  focus:ring-inset
                  focus:ring-blue-500
                "
              >
                <span class="sr-only">Open main menu</span>
                <MenuIcon
                  v-if="!open"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <!-- Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <a
                href="#"
                class="
                  border-blue-500
                  text-gray-900
                  inline-flex
                  items-center
                  px-1
                  pt-1
                  border-b-2
                  text-sm
                  font-medium
                "
              >
                Historique des parties
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <button
                @click="openDialogCreateGame = true"
                type="button"
                class="
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-transparent
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-blue-600
                  shadow-sm
                  hover:bg-blue-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-blue-500
                "
              >
                <PlusSmIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                <span>Nouvelle partie</span>
              </button>
            </div>
            <div
              class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center"
            >
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="
                      bg-white
                      rounded-full
                      flex
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-blue-500
                    "
                  >
                    <span class="sr-only">Open user menu</span>
                    <UserCircleIcon class="h-10 w-10 text-gray-700" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="
                      origin-top-right
                      absolute
                      right-0
                      mt-2
                      w-48
                      rounded-md
                      shadow-lg
                      py-1
                      bg-white
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="logout"
                        class="flex w-full"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        Se deconnecter
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <!-- Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
          <DisclosureButton
            as="a"
            href="#"
            class="
              bg-blue-50
              border-blue-500
              text-blue-700
              block
              pl-3
              pr-4
              py-2
              border-l-4
              text-base
              font-medium
              sm:pl-5 sm:pr-6
            "
            >Historique des parties</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4 sm:px-6">
            <div class="flex-shrink-0">
              <UserCircleIcon class="h-12 w-12 text-gray-700" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {{ store.state.user.username }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ store.state.user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              as="button"
              @click="logout"
              class="
                block
                px-4
                py-2
                text-base
                font-medium
                text-gray-500
                hover:text-gray-800 hover:bg-gray-100
                sm:px-6
              "
              >Se connecter</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <NewGameDialog
      @createdGame="launchGame"
      :open="openDialogCreateGame"
      :close="() => (openDialogCreateGame = false)"
    />
    <GameDialog
      @finish="refresh"
      :questions="questionsGame"
      :gameId="gameId"
      :open="openDialogGame"
      :close="() => (openDialogGame = false)"
    />
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MenuIcon, UserCircleIcon, XIcon } from "@heroicons/vue/outline";
import { PlusSmIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import GameDialog from "./GameDialog.vue";
import NewGameDialog from "./NewGameDialog.vue";

const store = useStore();
const router = useRouter();
const openDialogCreateGame = ref(false);
const openDialogGame = ref(false);
const questionsGame = ref([]);
const gameId = ref(0);

const launchGame = (game) => {
  openDialogCreateGame.value = false;
  questionsGame.value = game.questions;
  gameId.value = game.gameId;
  openDialogGame.value = true;
};

const refresh = () => {
  location.reload();
};

const logout = () => {
  store.commit("logout");
  router.push({ name: "Home" });
};
</script>
