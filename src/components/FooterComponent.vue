<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© 2025 My Vue App. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
