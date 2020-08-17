import Vue from 'vue';
import VueRouter from 'vue-router';

// Auth
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'

// Views
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard'

// Users
import UserSettings from '../components/user/settings/UserSettings'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "/settings",
            name: "Settings",
            component: UserSettings
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/forgot-password',
            name: 'Forgotpassword',
            component: ForgotPassword
        },
    ]
});
export { router };