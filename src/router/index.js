import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import TokenDisplayView from '../views/TokenDisplay.vue';
import { authGuard } from '@auth0/auth0-vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        beforeEnter: authGuard
    },
    {
        path: '/token',
        name: 'token',
        component: TokenDisplayView,
        beforeEnter: authGuard
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
