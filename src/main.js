import Vue from 'vue';
import * as firebase from 'firebase/app';
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
Vue.prototype.$auth = firebase.auth();
Vue.prototype.$db = firebase.database();

firebase.auth().onAuthStateChanged(() => ***REMOVED***
  if (!app) ***REMOVED***
    app = new Vue(***REMOVED***
      router,
      store,
      render: h => h(App),
    ***REMOVED***).$mount('#app');
  ***REMOVED***
***REMOVED***);
