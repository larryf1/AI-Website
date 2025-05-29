<template>
  <div class="profile">
    <h1>My Profile</h1>
    <p v-if="account">This is your profile page, {{ account.name }}.</p>
    <p>This page should only be accessible after logging in.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { msalInstance } from '../authConfig';

export default {
  name: 'ProfileView',
  setup() {
    const account = ref(null);
    onMounted(() => {
      account.value = msalInstance.getActiveAccount();
    });
    return { account };
  },
};
</script>
