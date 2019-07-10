import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from './fireapp';

const db = fireapp.database();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docStats: [], // store <- firebase
    docTypes: [], // ToolLayout <- store [computed]
    selectedDocType: '', // ToolLayout <-> store [computed]
    selectedDocs: [], // ToolLayout <-> store [computed]
    selectedDoc: '', // ToolLayout <-> store [computed] -> firebase
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
    setSelectedDoc(state, payload) {
      state.selectedDoc = payload;
    },
    setSelectedDocType(state, payload) {
      state.selectedDocType = payload;
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
    selecteDoc({ commit }, payload) {
      commit('setSelectedDoc', payload);
    },
    selecteDocType({ commit }, payload) {
      commit('setSelectedDocType', payload);
    },
    selectDocsByDoc({ commit, state }, payload) {
      const docType = state.docStats.filter(item => item[0] === payload)[0];
      commit('setSelectedDocType', docType);
    },
  },
  getters: {
    docStats: state => state.docStats,
    docTypes: state => state.docTypes,
    selectedDocType: state => state.selectedDocType,
    selectedDocs: state => state.selectedDocs,
    selectedDoc: state => state.selectedDoc,
  },
});
