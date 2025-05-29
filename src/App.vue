<template>
  <div id="app-layout" class="flex flex-col min-h-screen">
    <HeaderComponent /> <!-- No more props needed for auth -->
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
    <FooterComponent />
    <!-- Global error display can be kept if desired, but auth errors are now in HeaderComponent -->
    <!-- Example: <div v-if="globalError" class="fixed bottom-0 right-0 bg-red-500 text-white p-3 m-4 rounded shadow-lg">{{ globalError.message }}</div> -->
  </div>
</template>

<script>
// Removed MSAL related imports and setup logic
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
// Import useAuth0 if you want to access auth state directly in App.vue for other reasons
// import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    // const { isLoading, error: globalError } = useAuth0(); // Example if App.vue needs global loading/error state from Auth0
    // For now, App.vue setup can be minimal or handle non-auth global concerns.
    // Error handling for login is now mostly within Auth0 and displayed in HeaderComponent.
    return {
      // globalError // if using useAuth0 here for a global error display
    };
  },
};
</script>

<style>
/* Styles remain the same */
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif; /* Or your Tailwind font stack */
  color: #2c3e50; /* Or your Tailwind text colors */
  background-color: #f9fafb; /* Example background, Tailwind bg-gray-50 */
}

#app-layout {
  /* Styles for the main layout container if needed */
}
</style>
