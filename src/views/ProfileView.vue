<template>
  <div>
    <div v-if="!isAuthenticated">
      <h1>Access Denied</h1>
      <p>Please log in to view your profile.</p>
    </div>
    <div v-else>
      <h1>Profile</h1>
      <div v-if="user">
        <img :src="user.picture" :alt="user.name">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      </div>
      <div v-else>
        <p>Loading profile...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'ProfileView',
  setup() {
    const { user, isAuthenticated } = useAuth0();
    return { user, isAuthenticated };
  }
}
</script>
