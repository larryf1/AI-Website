<template>
  <header class="header">
    <div class="header-content">
      <h1>My Vue App (Auth0)</h1>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link v-if="isAuthenticated" to="/profile">My Profile</router-link>
        <router-link v-if="isAuthenticated" to="/token">View Token</router-link>
        <div class="auth-buttons">
          <button v-if="!isAuthenticated" @click="loginAction">Login</button>
          <button v-if="isAuthenticated" @click="logoutAction" class="logout-btn">Logout</button>
        </div>
      </nav>
    </div>
    <div class="user-info" v-if="isAuthenticated && user">
      Logged in as: {{ user.name }} ({{ user.email }})
    </div>
    <div class="loading" v-if="isLoading">
      Loading authentication status...
    </div>
    <div class="error" v-if="authError">
      Authentication Error: {{ authError.message }}
    </div>
  </header>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HeaderComponent',
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading, error: authError } = useAuth0();
    const router = useRouter();

    const loginAction = () => loginWithRedirect();
    const logoutAction = () => {
      logout({
        returnTo: window.location.origin,
        logoutParams: {
          returnTo: window.location.origin
        }
      });
      router.push('/');
    };

    return {
      loginAction,
      logoutAction,
      user,
      isAuthenticated,
      isLoading,
      authError
    };
  }
}
</script>

<style scoped>
.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--secondary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover:after,
.nav-links a.router-link-active:after {
  width: 100%;
}

.auth-buttons {
  margin-left: auto;
}

.logout-btn {
  background-color: #e74c3c;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.user-info {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 2rem;
  font-size: 0.9rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 0.5rem;
  background-color: var(--secondary-color);
}

.error {
  text-align: center;
  padding: 0.5rem;
  background-color: #e74c3c;
  color: white;
}
</style>
