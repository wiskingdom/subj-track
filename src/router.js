import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import Login from './views/Login.vue';
import MainAbout from './views/MainAbout.vue';
import AnnoLayout from './layouts/AnnoLayout.vue';
import store from './store';

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
          path: ':id',
          name: 'anno',
          component: AnnoLayout,
          beforeEnter(_to, _from, next) {
            if (store.getters.docStats.length === 0) {
              store.dispatch('fetchDocStats').then(() => {
                next();
              });
            } else {
              next();
            }
          },
        },
      ],
    },
  ],
});
