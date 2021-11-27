import { createRouter, createWebHashHistory } from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        mustBeLogged: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        mustBeLogged: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        mustBeLogged: false,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Home" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.mustBeLogged) &&
    !store.state.token
  ) {
    next({
      name: "Login",
    });
  } else if (
    to.matched.some((record) => !record.meta.mustBeLogged) &&
    store.state.token
  ) {
    next({
      name: "Home",
    });
  } else {
    next();
  }
});

export default router;
