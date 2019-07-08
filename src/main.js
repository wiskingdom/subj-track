import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import App from './App.vue';
import router from './router';
import store from './store';
import './quasar';
import firebaseConfig from './firebase-config.json';

Vue.config.productionTip = false;

let app = '';

firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged(() => ***REMOVED***
  if (!app) ***REMOVED***
    app = new Vue(***REMOVED***
      router,
      store,
      render: h => h(App),
    ***REMOVED***).$mount('#app');
  ***REMOVED***
***REMOVED***);
