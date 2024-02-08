import { createRouter, createWebHistory } from 'vue-router'

import LoginViewVue from '@/views/LoginView.vue';
import TaskmanagerViewVue from '@/views/TaskmanagerView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TaskmanagerViewVue,
      meta: {
        authReq: true
      }
    },
    {
      path: '/login',
      component: LoginViewVue,
    }
  ]
})

router.beforeEach((to, form, next) => {
  const token = localStorage.getItem("token");
  if(to.meta.authReq){
    if(token){
      next(); 
    }
    else{
      next("/login")
    }       
  }
  else if(token && to.path == "/login"){
    next("");
  }
  else{
    next();
  }
})

export default router
