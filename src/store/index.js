import Vue from "vue";
import Vuex from "vuex";
import Router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: "",
  },
  mutations: {
    login(state, userModel) {
      state.id = userModel.id;
      state.name = userModel.name;
    },
    logout(state) {
      state.id = "";
      state.name = "";
      Router.push("/");
    },
  },
  actions: {},
  modules: {},
});
