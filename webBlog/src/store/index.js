import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    role: "",
    token: "",
  },
  plugins: [createPersistedState()],
  mutations: {
    saveUser(state, user) {
      state.user = user;
    },
    saveRole(state, role) {
      state.role = role;
    },
    saveToken(state, token) {
      state.token = token;
    },
    deleteUser(state) {
      state.user = "";
      state.role = "";
      state.token = "";
    },
  },
  getters: {
    user: (state) => state.user,
    role: (state) => state.role,
    token: (state) => state.token,
  },
  actions: {},
});
