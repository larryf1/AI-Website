<template>
  <div>
    <h1>Welcome</h1>
    <div>
      <h2>Authentication Demo</h2>
      <p>
        This is a demo application showcasing Auth0 authentication in Vue.js.
        Please login to access protected features.
      </p>
      <div>
        <div>
          <h3>Profile View</h3>
          <p>View your profile information after logging in.</p>
        </div>
        <div>
          <h3>Token Display</h3>
          <p>See your authentication token details.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
