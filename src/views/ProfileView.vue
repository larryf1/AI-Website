<template>
  <div class="profile-container">
    <div v-if="!isAuthenticated" class="error-message">
      <h1>Access Denied</h1>
      <p>Please log in to view your profile.</p>
    </div>
    <div v-else class="profile-content">
      <h1>Profile</h1>
      <div v-if="user" class="user-info">
        <div class="profile-image-container">
          <img
            :src="user.picture"
            :alt="user.name"
            @error="handleImageError"
            class="profile-image"
          >
        </div>
        <div class="user-details">
          <h2>{{ user.name }}</h2>
          <p class="email">Email: {{ user.email }}</p>
        </div>
        <div class="user-metadata">
          <h3>User Information</h3>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading profile...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';

export default {
  name: 'ProfileView',
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const imageError = ref(false);

    const handleImageError = (e) => {
      imageError.value = true;
      // Use a data URL for the default avatar
      e.target.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
          <rect width="150" height="150" fill="#e0e0e0"/>
          <circle cx="75" cy="60" r="30" fill="#bdbdbd"/>
          <path d="M30 140c0-30 20-50 45-50s45 20 45 50" fill="#bdbdbd"/>
        </svg>
      `);
    };

    return {
      user,
      isAuthenticated,
      handleImageError
    };
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.profile-image-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--secondary-color);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  text-align: center;
}

.user-details h2 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.email {
  color: #666;
}

.user-metadata {
  width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.user-metadata h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.user-metadata pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.error-message {
  text-align: center;
  color: #dc3545;
}

.loading {
  text-align: center;
  color: var(--secondary-color);
}
</style>
