<template>
  <Disclosure as="nav" class="bg-white w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="text-4xl font-bold">Quizz game</div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link
              :to="{ name: 'Login' }"
              as="button"
              class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
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
              <span>Connexion</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import { PlusSmIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    PlusSmIcon,
    XIcon,
  },
};
</script>
