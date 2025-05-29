<template>
  <div class="token-display p-4">
    <h1 class="text-2xl font-semibold mb-4">Access Token (Auth0)</h1>
    <p class="mb-3 text-sm text-gray-600">
      This page attempts to retrieve an access token from Auth0.
      For this token to be a JWT suitable for calling your own APIs,
      ensure you have configured an 'audience' in the Auth0 plugin initialization
      (in `src/main.js`) and that your Auth0 application is set up for API authorization.
    </p>
    <div v-if="isLoading" class="text-gray-500">Loading token...</div>
    <div v-if="error" class="text-red-500 bg-red-100 p-3 rounded mb-4">
      <p class="font-semibold">Error acquiring token:</p>
      <pre class="whitespace-pre-wrap text-sm">{{ error.message || error }}</pre>
      <p v-if="error.error === 'consent_required' || error.error === 'login_required'" class="mt-2 text-sm">
        This error might mean you need to grant consent or log in again.
        You might also need to configure an API in your Auth0 dashboard and request an audience.
      </p>
    </div>
    <div v-if="accessToken" class="bg-gray-100 p-3 rounded">
      <p class="font-semibold mb-2">Your Auth0 Access Token:</p>
      <textarea
          readonly
          class="w-full h-64 p-2 border rounded text-xs bg-gray-50"
          :value="accessToken"
          ref="tokenTextarea"
      ></textarea>
      <button
          @click="copyToken"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Copy Token
      </button>
      <p v-if="copySuccess" class="text-green-600 mt-1">Token copied to clipboard!</p>
    </div>
    <p v-if="!isLoading && !accessToken && !error && isAuthenticated" class="text-gray-500">
      Could not acquire token. You are logged in, but token retrieval failed.
      Check console and Auth0 logs. Ensure 'audience' is configured if needed.
    </p>
    <p v-if="!isAuthenticated && !isLoading" class="text-red-500">
      You are not authenticated. Please log in to view a token.
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'TokenDisplayView',
  setup() {
    const { getAccessTokenSilently, isLoading: authIsLoading, error: authError, isAuthenticated } = useAuth0();
    const accessToken = ref(null);
    const isLoading = ref(false); // Separate loading state for token fetching
    const error = ref(null); // Separate error state for token fetching
    const tokenTextarea = ref(null);
    const copySuccess = ref(false);

    const fetchToken = async () => {
      if (!isAuthenticated.value) {
        // error.value = 'User is not authenticated.'; // No need to set error, template handles this.
        return;
      }
      isLoading.value = true;
      error.value = null; // Clear previous token errors
      try {
        // To get a JWT for an API, an audience must be configured in main.js
        // and the call to getAccessTokenSilently might need to pass the audience.
        // For now, we assume default behavior or audience is globally configured.
        const token = await getAccessTokenSilently();
        accessToken.value = token;
      } catch (e) {
        console.error('Error acquiring token for display:', e);
        error.value = e; // e might be an Auth0Error object with a .message property
      } finally {
        isLoading.value = false;
      }
    };

    const copyToken = () => {
      if (tokenTextarea.value) {
        tokenTextarea.value.select();
        try {
          document.execCommand('copy');
          copySuccess.value = true;
          setTimeout(() => copySuccess.value = false, 2000);
        } catch (err) {
          console.error('Failed to copy token: ', err);
          alert('Failed to copy token. Please copy manually.');
        }
      }
    };

    onMounted(() => {
      // Wait for auth loading to complete before fetching token
      if (!authIsLoading.value) {
        fetchToken();
      }
    });

    // Watch for changes in authentication state
    // useAuth0().isAuthenticated is reactive, so can watch its changes.
    // This is a bit more complex with watchers for composables.
    // A simpler approach is to rely on onMounted or a button click if auth state changes after component load.
    // For now, onMounted and initial auth state check is fine.
    // If user logs in while on this page, they might need to refresh or re-trigger fetchToken.

    return {
      accessToken,
      isLoading: isLoading, // Expose local loading state
      error: error, // Expose local error state
      authIsLoading, // Auth0 loading state
      isAuthenticated, // Auth0 authenticated state
      tokenTextarea,
      copyToken,
      copySuccess,
      fetchToken, // Could be called from a button if desired
    };
  },
};
</script>
