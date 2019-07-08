import Vue from 'vue';
import Router from 'vue-router';
import ToolLayout from './layouts/ToolLayout.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router(***REMOVED***
  mode: 'history',
  routes: [
    ***REMOVED***
      path: '*',
      redirect: '/login',
    ***REMOVED***,
    ***REMOVED***
      path: '/',
      redirect: '/login',
    ***REMOVED***,
    ***REMOVED***
      path: '/login',
      name: 'login',
      component: Login,
    ***REMOVED***,
    ***REMOVED***
      path: '/tool',
      component: ToolLayout,
      children: [
        ***REMOVED***
          path: '',
          name: 'home',
          component: Home,
        ***REMOVED***,
        ***REMOVED***
          path: '/about',
          name: 'about',
          component: About,
        ***REMOVED***,
      ],
    ***REMOVED***,
  ],
***REMOVED***);
