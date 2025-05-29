<template>
  <div class="profile">
    <h1>My Profile</h1>
    <div v-if="isAuthenticated && user">
      <p>Hello, {{ user.name || user.email }}!</p>
      <p>This is your profile page.</p>
      <!-- You can display more user info here, e.g.: -->
      <!-- <pre>{{ user }}</pre> -->
    </div>
    <div v-else>
      <p>You must be logged in to view your profile.</p>
    </div>
    <p>This page should only be accessible after logging in.</p> <!-- This line is a bit redundant with the check above but can be kept or removed -->
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
