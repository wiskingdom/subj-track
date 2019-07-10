import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from './fireapp';

const db = fireapp.database();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docStats: [], // store <- firebase
    docTypes: [], // ToolLayout <- store [computed]
    selectedDocs: [], // ToolLayout <-> store [computed] -> firebase
  },
  mutations: {
    setDocStats(state, payload) {
      state.docStats = payload;
    },
    setDocTypes(state, payload) {
      state.docTypes = payload;
    },
    setSelectedDocs(state, payload) {
      state.selectedDocs = payload;
    },
  },
  actions: {
    fetchDocStats({ commit }) {
      db.ref('/stat').once('value').then((dataSnapshot) => {
        const stats = Object.entries(dataSnapshot.val());
        commit('setDocStats', stats);
        const types = stats.map(item => item[1].type);
        const typeSet = Array.from(new Set(types));
        const typeSetCount = typeSet.map((item) => {
          const count = types.filter(elem => elem === item).length;
          return { label: `${item} (${count})`, value: item };
        });
        const sortedTypeSetCount = typeSetCount
          .sort((a, b) => (a.label < b.label ? -1 : 1));
        commit('setDocTypes', sortedTypeSetCount);
      });
    },
    selecteDocs({ commit, state }, payload) {
      const docs = state.docStats.filter(item => item[1].type === payload);
      const docsObj = docs.reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});
      commit('setSelectedDocs', docsObj);
    },
  },
  getters: {
    docStats: state => state.docStats,
    docTypes: state => state.docTypes,
    selectedDocs: state => state.selectedDocs,
  },
});
