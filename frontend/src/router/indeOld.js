// import { createRouter, createWebHistory } from 'vue-router'
// import Register from '../views/Register.vue'
// import Login from '../views/Login.vue'
// import Dashboard from '../views/Dashboard.vue'
// import ForgotPassword from '../views/ForgotPassword.vue'
// import Verification from '../views/Verification.vue'
// import ResetPassword from '../views/ResetPassword.vue'

// function isAuthenticated() {
//     const token = localStorage.getItem('accessToken');
//     return !!token;
// }

// function isValidUser() {
//     const email = localStorage.getItem('email');
//     return !!email;
// }

// //Router Configuration
// const routes = [
//     {
//         path: '/',
//         name: 'Login',
//         component: Login,
//         beforeEnter: (to, from, next) => {
//             if (!isAuthenticated()) {
//                 next();
//             } else {
//                 next('/dashboard');
//             }
//         }
//     },
//     {
//         path: '/register',
//         name: 'Register',
//         component: Register,
//         beforeEnter: (to, from, next) => {
//             if (!isAuthenticated()) {
//                 next();
//             } else {
//                 next('/dashboard');
//             }
//         }
//     },
//     {
//         path: '/dashboard',
//         name: 'Dashboard',
//         component: Dashboard,
//         beforeEnter: (to, from, next) => {
//             if (isAuthenticated()) {
//                 next();
//             } else {
//                 next('/');
//             }
//         }
//     },
//     {
//         path: '/forgot-password',
//         name: 'ForgotPassword',
//         component: ForgotPassword
//     },
//     {
//         path: '/verification',
//         name: 'Verification',
//         component: Verification,
//         beforeEnter: (to, from, next) => {
//             if (isValidUser()) {
//                 next();
//             } else {
//                 next('/');
//             }
//         }
//     },
//     {
//         path: '/reset-password',
//         name: 'ResetPassword',
//         component: ResetPassword,
//         beforeEnter: (to, from, next) => {
//             if (isValidUser()) {
//                 next();
//             } else {
//                 next('/');
//             }
//         }
//     }
// ]
// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('accessToken');
//     if (to.matched.some(record => record.meta.requiresAuth) && !token) {
//         next('/');
//     } else {
//         next();
//     }
// });

// export default router


