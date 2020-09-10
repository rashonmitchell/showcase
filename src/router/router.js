import Vue from 'vue';
import VueRouter from 'vue-router';

// Auth
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'

// Views
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard'
import Template from '../components/user/yogurt/Template'

// Users
import UserSettings from '../components/user/settings/UserSettings'
import UserProfile from '../components/user/profile/UserProfile'
import UserProfilePassword from '../components/user/profile/UserProfilePassword'
import UserProfileEmail from '../components/user/profile/UserProfileEmail'
import UserProfileNotfication from '../components/user/profile/UserProfileNotfication'
import UserDailyYogurt from '../components/user/profile/UserDailyYogurt'

// App Settings
import AppSettings from '../components/user/settings/AppSettings'

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
            path: "/settings/",
            name: "Settings",
            component: UserSettings,
            props: true,
            children: [
                {
                    path: '',
                    name: 'UserProfile',
                    component: UserProfile
                },
                {
                    path: 'password',
                    name: 'Password & Security',
                    component: UserProfilePassword
                },
                {
                    path: "email",
                    Name: 'UserProfileEmail',
                    component: UserProfileEmail
                },
                {
                    path: "general",
                    Name: 'App Settings',
                    component: AppSettings
                }
              ]
        },
        // {
        //     path: '/settings/password',
        //     name: 'Password & Security',
        //     component: UserProfilePassword
        // },
        {
            path: "/temp",
            name: 'Template',
            component: Template
        },
        {
            path: '/settings/notfication',
            component: UserProfileNotfication
        },
        {
            path: '/settings/daily-yogurt',
            component: UserDailyYogurt
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