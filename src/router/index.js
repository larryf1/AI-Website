import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import TokenDisplayView from '../views/TokenDisplayView.vue';
import { authGuard } from '@auth0/auth0-vue'; // Import authGuard

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        beforeEnter: authGuard, // Secure this route with Auth0 authGuard
    },
    {
        path: '/token',
        name: 'token',
        component: TokenDisplayView,
        beforeEnter: authGuard, // Secure this route with Auth0 authGuard
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Remove the old MSAL beforeEach guard if it wasn't fully removed in step 1.
// router.beforeEach(async (to, from, next) => { ... }); // This should be gone.

export default router;
