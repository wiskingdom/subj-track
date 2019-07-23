import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import MainLayout from './layouts/MainLayout.vue';
import MainAbout from './views/MainAbout.vue';
import DocLayout from './layouts/DocLayout.vue';
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
          name: 'doc',
          component: DocLayout,
          children: [
            {
              path: '',
              redirect: '0',
            },
            {
              path: ':predId',
              name: 'pred',
              component: Pred,
            },
          ],
        },
      ],
    },
  ],
});
