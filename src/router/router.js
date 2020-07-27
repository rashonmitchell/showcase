import Vue from 'vue';
import VueRouter from 'vue-router';

// Auth
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'

// Views

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/forgotpassword',
            name: 'forgotpassword',
            component: ForgotPassword
        },
    ]
});
export { router };