import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import MainLayout from './layouts/MainLayout.vue';
import MainAbout from './views/MainAbout.vue';
import AnnoLayout from './layouts/AnnoLayout.vue';
import Pred from './views/Pred.vue';
// import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/main',
    },
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: 'about',
        },
        {
          path: 'about',
          name: 'about',
          component: MainAbout,
        },
        {
          path: ':docId',
          name: 'anno',
          component: AnnoLayout,
          children: [
            {
              path: ':predId',
              name: 'pred',
              componant: Pred,
            },
          ],
        },
      ],
    },
  ],
});
