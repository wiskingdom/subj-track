import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from './fireapp';

const db = fireapp.database();

Vue.use(Vuex);

export default new Vuex.Store(***REMOVED***
  state: ***REMOVED***
    docStats: null,
    dummy: ***REMOVED***
      greet: 'hello',
      bye: 'byebye',
    ***REMOVED***,
  ***REMOVED***,
  mutations: ***REMOVED***
    setDocStats(state, payload) ***REMOVED***
      state.docStats = payload;
    ***REMOVED***,
  ***REMOVED***,
  actions: ***REMOVED***
    fetchDocStats(***REMOVED*** commit ***REMOVED***) ***REMOVED***
      db.ref('/stat').once('value').then((dataSnapshot) => ***REMOVED***
        commit('setDocStats', dataSnapshot.val());
      ***REMOVED***);
    ***REMOVED***,
  ***REMOVED***,
  getters: ***REMOVED***
    docStats: state => state.docStats,
  ***REMOVED***,
***REMOVED***);
