import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './quasar';
import fireapp from './fireapp';

Vue.config.productionTip = false;

let app = '';

Vue.prototype.$auth = fireapp.auth();
Vue.prototype.$db = fireapp.database();

fireapp.auth().onAuthStateChanged(() => ***REMOVED***
  if (!app) ***REMOVED***
    app = new Vue(***REMOVED***
      router,
      store,
      render: h => h(App),
    ***REMOVED***).$mount('#app');
  ***REMOVED***
***REMOVED***);
