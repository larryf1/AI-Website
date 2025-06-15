import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
    console.error('Global error:', err);
    console.error('Error info:', info);
};

app.use(router);
app.use(
    createAuth0({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/api/v2/`,
            scope: 'openid profile email'
        },
    })
);

app.mount('#app');
