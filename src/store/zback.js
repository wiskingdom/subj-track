/*
import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from '@/fireapp';
import state from './state';

const db = fireapp.database();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docStats: [], // store <- firebase
    docTypes: [], // ToolLayout <- store [computed]
    selectedDocs: [], // ToolLayout <-> store [computed]
    selectedDocType: '', // ToolLayout <-> store [computed]
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
      return new Promise((resolve) => {
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
          resolve();
        });
      });
    },
    selectDocType({ commit, state }, docType) {
      return new Promise((resolve) => {
        commit('setSelectedDocType', docType);
        const docs = state.docStats
          .filter(item => item[1].type === docType);
        const docsObj = docs.reduce((obj, [key, val]) => {
          obj[key] = val;
          return obj;
        }, {});
        commit('setSelectedDocs', docsObj);
        resolve();
      });
    },
    selectDoc({ commit, state, dispatch }, doc) {
      commit('setSelectedDoc', doc);
      const docType = state.docStats
        .filter(item => item[0] === doc)[0][1].type;
      dispatch('selectDocType', docType);
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
*/
