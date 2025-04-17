// resources/js/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import App from '../components/App.vue';
import Main from '../components/Main.vue';
import Login from '../components/admin/Login.vue'; 
import Registration from '../components/admin/Registration.vue'; 
import Home from '../components/home/Home.vue'; 
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👇 Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
