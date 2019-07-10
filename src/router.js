import Vue from 'vue';
import Router from 'vue-router';
import ToolLayout from './layouts/ToolLayout.vue';
import Login from './views/Login.vue';
import ToolAbout from './views/ToolAbout.vue';
import DocLayout from './layouts/DocLayout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/tool',
    },
    {
      path: '/',
      redirect: '/tool',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/tool',
      component: ToolLayout,
      children: [
        {
          path: '',
          redirect: 'about',
        },
        {
          path: 'about',
          name: 'about',
          component: ToolAbout,
        },
        {
          path: 'doc/:id',
          name: 'doc',
          component: DocLayout,
        },
      ],
    },
  ],
});
