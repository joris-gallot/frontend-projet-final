<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Se connecter
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="signIn">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                required
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
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500
                  sm:text-sm
                "
              />
              <span
                v-for="(e, i) in emailErrors"
                :key="i"
                class="text-red-500 text-sm"
                >{{ e }}</span
              >
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                required
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
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500
                  sm:text-sm
                "
              />
              <span
                v-for="(e, i) in passwordErrors"
                :key="i"
                class="text-red-500 text-sm"
                >{{ e }}</span
              >
            </div>
          </div>

          <div class="text-sm">
            <router-link
              :to="{ name: 'Register' }"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Pas de compte ?
            </router-link>
          </div>

          <div class="text-sm text-red-500">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="!meta.valid || isSubmitting"
              class="
                disabled:opacity-50 disabled:hover:bg-blue-600
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-blue-600
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-blue-500
              "
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, inject, ref } from "vue";
import { useStore } from "vuex";
import { configure, useField, useForm } from "vee-validate";
import { string, object, ref as yupRef } from "yup";
import { useRouter } from "vue-router";

const api = inject("api");
const error = ref("");
const store = useStore();
const router = useRouter();

const schema = object({
  email: string().required().email(),
  password: string().required(),
});

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: schema,
});
const { errors: emailErrors, value: email } = useField(
  "email",
  string().required()
);

const { errors: passwordErrors, value: password } = useField(
  "password",
  string().required()
);

const signIn = handleSubmit(async () => {
  const res = await api.auth
    .signin({ email: email.value, password: password.value })
    .catch((e) => {
      error.value = e.response.data.message;
    });

  if (res) {
    store.commit("setToken", res.data.access_token);
    store.commit("setUser", res.data.user);
    router.push({ name: "Home" });
  }
});
</script>
