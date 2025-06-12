<template>
  <header>
    <div>
      <h1>My Vue App (Auth0)</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="isAuthenticated" to="/profile">My Profile</router-link>
        <router-link v-if="isAuthenticated" to="/token">View Token</router-link>
        <div>
          <button v-if="!isAuthenticated" @click="loginAction">Login</button>
          <button v-if="isAuthenticated" @click="logoutAction">Logout</button>
        </div>
      </nav>
    </div>
    <div v-if="isAuthenticated && user">
      Logged in as: {{ user.name }} ({{ user.email }})
    </div>
    <div v-if="isLoading">
      Loading authentication status...
    </div>
    <div v-if="authError">
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
