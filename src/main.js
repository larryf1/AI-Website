import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue'; // Import Auth0

// Ensure the app is mounted after MSAL processing
const app = createApp(App);

app.use(router);

// Configure Auth0 plugin
app.use(
    createAuth0({
        domain: 'dev-wvsshtw8stom6rkc.us.auth0.com', // User provided domain
        clientId: 'TALkzJqm9hbqg7GN0eZyaqePI6CSp2Cr', // User provided client ID
        authorizationParams: {
            redirect_uri: window.location.origin, // Or 'http://localhost:8080' specifically
            // audience: 'YOUR_API_AUDIENCE' // Add this later if needed for API access
        },
    })
);

app.mount('#app');
