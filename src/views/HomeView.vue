<template>
  <div class="home flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 class="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">Welcome to the Home Page</h1>
    <p class="text-lg text-secondary mb-6">This is a public page for your modern Vue + Auth0 app.</p>
    <router-link to="/profile" class="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition">Go to Profile</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
