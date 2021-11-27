import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state() {
    return {
      user: null,
      token: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  plugins: [createPersistedState()],
});
