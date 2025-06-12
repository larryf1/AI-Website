<template>
  <div>
    <div v-if="!isAuthenticated">
      <h1>Access Denied</h1>
      <p>Please log in to view your token.</p>
    </div>
    <div v-else>
      <h1>Access Token</h1>
      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else-if="token">
        <p>Your access token is:</p>
        <pre>{{ token }}</pre>
      </div>
      <div v-else>
        <p>Loading token...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, onMounted } from 'vue';

export default {
  name: 'TokenDisplayView',
  setup() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const token = ref(null);
    const error = ref(null);

    onMounted(async () => {
      if (isAuthenticated.value) {
        try {
          token.value = await getAccessTokenSilently();
        } catch (e) {
          error.value = e.message || 'Failed to get token';
          console.error('Token error:', e);
        }
      }
    });

    return { token, error, isAuthenticated };
  }
}
</script>
