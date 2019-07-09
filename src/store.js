import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from './fireapp';

const db = fireapp.database();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docStats: null,
    dummy: {
      greet: 'hello',
      bye: 'byebye',
    },
  },
  mutations: {
    setDocStats(state, payload) {
      state.docStats = payload;
    },
  },
  actions: {
    fetchDocStats({ commit }) {
      db.ref('/stat').once('value').then((dataSnapshot) => {
        commit('setDocStats', dataSnapshot.val());
      });
    },
  },
  getters: {
    docStats: state => state.docStats,
  },
});
