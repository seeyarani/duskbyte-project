import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Verification from '../views/Verification.vue'
import User from '../views/Admin/User/User.vue'
import CreateUser from '../views/Admin/User/Create.vue'
import EditUser from '../views/Admin/User/Edit.vue'
import Project from '../views/Admin/Project/Project.vue'
import CreateProject from '../views/Admin/Project/Create.vue'
import EditProject from '../views/Admin/Project/Edit.vue'
import Task from '../views/Admin/Task/Task.vue'
import CreateTask from '../views/Admin/Task/Create.vue'
import EditTask from '../views/Admin/Task/Edit.vue'
import NotFound from '../views/NotFound.vue'


const isAuthenticated = () => !!localStorage.getItem('accessToken');

const redirectToLoginIfNotAuthenticated = (to, from, next) => {
    if (isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
};

const redirectToDashboardIfAuthenticated = (to, from, next) => {
    if (!isAuthenticated()) {
      next();
    } else {
      next('/dashboard');
    }
  };

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: redirectToDashboardIfAuthenticated,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: redirectToDashboardIfAuthenticated,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {
        path: '/verification',
        name: 'Verification',
        component: Verification,
    },
    {
        path: '/admin/users',
        name: 'User',
        component: User,
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path: '/admin/users/create',
        name: 'CreateUser',
        component: CreateUser,
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path: '/admin/users/edit',
        name: 'EditUser',
        component: EditUser,
        props: (route) => ({ userId: route.query.userId }),
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path: '/admin/projects',
        name: 'Project',
        component: Project,
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path : '/admin/projects/create',
        name : 'CreateProject',
        component : CreateProject,
        beforeEnter: redirectToLoginIfNotAuthenticated,

    },
    {
        path: '/admin/projects/edit',
        name :'EditProject',
        component: EditProject,
        props :(route) => ({projectId : route.query.projectId}),
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path: '/admin/tasks',
        name: 'Task',
        component: Task,
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
    {
        path : '/admin/tasks/create',
        name : 'CreateTask',
        component : CreateTask,
        beforeEnter: redirectToLoginIfNotAuthenticated,

    },
    {
        path: '/admin/tasks/edit',
        name :'EditTask',
        component: EditTask,
        props :(route) => ({taskId : route.query.taskId}),
        beforeEnter: redirectToLoginIfNotAuthenticated,
    },
  ]
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
      next('/login');
  } else {
      next();
  }
});

export default router


