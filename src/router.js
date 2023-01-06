import Vue from 'vue';
import Router from 'vue-router';
import Store from './store/state'
Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: ''
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心',
      requireAuth: true 
    }
  },
  {
    name: 'serviceCentre',
    component: () => import('./view/serviceCentre'),
    meta: {
      title: '服务中心',
      requireAuth: true 
    }
  },
  {
    name: 'calendarCenter',
    component: () => import('./view/calendarCenter'),
    meta: {
      title: '日程中心',
      requireAuth: true 
    }
  },
  {
    name: 'messageCenter',
    component: () => import('./view/messageCenter'),
    meta: {
      title: '消息',
      requireAuth: true 
    }
  },
  {
    name: 'calendarCenter/add',
    component: () => import('./view/calendarCenter/components/add.vue'),
    meta: {
      requireAuth: true 
    }
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '首页',
      requireAuth: true 
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  // 判断进入此页面是否token
  const requireAuth = to.meta && to.meta.requireAuth;
  if(requireAuth){
    if(!Store.token){
      next({
        path: '/login', // 未登录则跳转至login页面    
      })
    }
  }
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};