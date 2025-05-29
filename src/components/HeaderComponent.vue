<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-xl font-bold mb-2 sm:mb-0">My Vue App (Auth0)</h1>
      <nav class="flex flex-col sm:flex-row items-center">
        <router-link to="/" class="px-3 py-1 sm:py-2 rounded hover:bg-gray-700 mb-1 sm:mb-0 sm:mr-2">Home</router-link>
        <router-link v-if="isAuthenticated" to="/profile" class="px-3 py-1 sm:py-2 rounded hover:bg-gray-700 mb-1 sm:mb-0 sm:mr-2">My Profile</router-link>
        <router-link v-if="isAuthenticated" to="/token" class="px-3 py-1 sm:py-2 rounded hover:bg-gray-700 mb-1 sm:mb-0">View Token</router-link>
        <div class="mt-2 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row items-center">
          <button v-if="!isAuthenticated" @click="loginAction" class="w-full sm:w-auto px-3 py-2 rounded bg-green-500 hover:bg-green-400 mb-1 sm:mb-0 sm:mr-2">Login</button>
          <button v-if="isAuthenticated" @click="logoutAction" class="w-full sm:w-auto px-3 py-2 rounded bg-red-500 hover:bg-red-400">Logout</button>
        </div>
      </nav>
    </div>
    <div v-if="isAuthenticated && user" class="container mx-auto mt-2 text-sm text-gray-300 text-center sm:text-left">
      Logged in as: {{ user.name }} ({{ user.email }})
    </div>
    <div v-if="isLoading" class="container mx-auto mt-1 text-sm text-yellow-400 text-center sm:text-left">
      Loading authentication status...
    </div>
    <div v-if="authError" class="container mx-auto mt-1 text-sm text-red-400 text-center sm:text-left">
      Authentication Error: {{ authError.message }}
    </div>
  </header>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'HeaderComponent',
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading, error: authError } = useAuth0();

    const loginAction = () => {
      loginWithRedirect();
    };

    const logoutAction = () => {
      logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return {
      isAuthenticated,
      user,
      isLoading, // To give feedback during silent auth checks
      authError, // To display any auth errors
      loginAction,
      logoutAction,
    };
  },
};
</script>
