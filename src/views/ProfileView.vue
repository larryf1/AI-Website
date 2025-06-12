<template>
  <div class="profile max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
    <h1 class="text-3xl font-bold text-primary mb-4">My Profile</h1>
    <div v-if="isAuthenticated && user">
      <p class="text-lg mb-2">Hello, <span class="font-semibold">{{ user.name || user.email }}</span>!</p>
      <p class="text-gray-600 mb-4">This is your profile page.</p>
      <!-- <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ user }}</pre> -->
    </div>
    <div v-else>
      <p class="text-red-500">You must be logged in to view your profile.</p>
    </div>
    <p class="text-xs text-gray-400 mt-6">This page should only be accessible after logging in.</p>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'ProfileView',
  setup() {
    const { user, isAuthenticated } = useAuth0();

    return {
      user, // This will be the Auth0 user object
      isAuthenticated,
    };
  },
};
</script>
