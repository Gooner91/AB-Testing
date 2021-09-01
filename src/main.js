import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

Vue.config.productionTip = false;

const variations = [
  {
    id: 1,
    description: "This is the first variation",
    viewCount: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
  },
  {
    id: 2,
    description: "This is the second variation",
    viewCount: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1614001678682-ac4573d8b743?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 3,
    description: "This is the third variation",
    viewCount: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1590634332985-5ffd67093c1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1466&q=80"
  }
];

const store = new Vuex.Store({
  state: {
    visitors: [],
    conversionLog: [],
    variations
  },
  mutations: {
    addVisitor(state, visitorPayload) {
      state.visitors.push(visitorPayload);
    },
    clearVisitors(state) {
      state.visitors = [];
    },
    logVisitorConversion(state, payload) {
      let log = state.conversionLog.find(
        (log) => log.visitorId === payload.visitorId
      );
      if (!log) {
        console.log("NEW USER SING UP!!", payload.visitorId);
        this.state.conversionLog.push(payload);
      }
    },
    increaseVariationViewCount(state, id) {
      let variation = state.variations.find((variation) => variation.id === id);
      variation.viewCount++;
      console.log("Variations =>", state.variations);
    }
  },
  getters: {
    getVisitoryById: (state) => (visitorId) => {
      return state.visitors.find((visitor) => visitor.visitorId === visitorId);
    },
    getVariation: (state) => (id) => {
      return state.variations.find((variation) => variation.id === id);
    }
  },
  plugins: [createPersistedState()]
});

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
