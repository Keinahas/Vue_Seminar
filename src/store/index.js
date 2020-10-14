import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import Router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: "",
    role: "",
  },
  mutations: {
    login(state, userModel) {
      state.id = userModel.id;
      state.name = userModel.name;
      state.role = userModel.role;
    },
    logout(state) {
      state.id = "";
      state.name = "";
      state.role = "";
      Axios.post("/api/auth/logout");
      Router.push("/");
    },
  },
  actions: {},
  modules: {},
});
