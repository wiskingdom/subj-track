import Vue from 'vue';
import Vuex from 'vuex';
import fireapp from './fireapp';

Vue.use(Vuex);

export default new Vuex.Store(***REMOVED***
  state: ***REMOVED***
    docList: ***REMOVED******REMOVED***,

  ***REMOVED***,
  mutations: ***REMOVED***
    setDocList(state, payload) ***REMOVED***
      state.docList = payload;
    ***REMOVED***,
  ***REMOVED***,
  actions: ***REMOVED***
    fetchDocList(***REMOVED*** commit ***REMOVED***) ***REMOVED***
      fireapp.database().ref('/stat').once('value').then((dataSnapshot) => ***REMOVED***
        commit('setDocList', dataSnapshot);
      ***REMOVED***);
    ***REMOVED***,
  ***REMOVED***,
  getters: ***REMOVED***
    docList: state => state.docList,
  ***REMOVED***,
***REMOVED***);
