<template>
  <div class="token-display">
    <div v-if="!isAuthenticated" class="error-message">
      <h1>Access Denied</h1>
      <p>Please log in to view your token.</p>
    </div>
    <div v-else class="token-container">
      <h1>Access Token</h1>
      <div v-if="error" class="error-message">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else-if="token" class="token-content">
        <div class="token-section">
          <div class="section-header">
            <h2>Raw Token</h2>
            <button @click="copyToken" class="copy-button">
              {{ copySuccess ? 'Copied!' : 'Copy Token' }}
            </button>
          </div>
          <textarea
            readonly
            :value="token"
            class="token-text"
            rows="4"
          ></textarea>
        </div>

        <!-- Debug info -->
        <pre class="debug-info">{{ decodedToken ? 'Has decoded token' : 'No decoded token' }}</pre>

        <div v-show="decodedToken" class="token-section">
          <h2>Decoded Token</h2>
          <div class="decoded-sections">
            <div class="decoded-part">
              <h3>Header</h3>
              <pre>{{ decodedToken?.header ? JSON.stringify(decodedToken.header, null, 2) : 'No header' }}</pre>
            </div>
            <div class="decoded-part">
              <h3>Payload</h3>
              <pre>{{ decodedToken?.payload ? JSON.stringify(decodedToken.payload, null, 2) : 'No payload' }}</pre>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading token...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, onMounted } from 'vue';

export default {
  name: 'TokenDisplayView',
  setup() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const token = ref(null);
    const error = ref(null);
    const copySuccess = ref(false);
    const decodedToken = ref(null);

    const decodeToken = (tokenValue) => {
      if (!tokenValue) return null;
      console.log('Attempting to decode token:', tokenValue.substring(0, 20) + '...');
      try {
        const parts = tokenValue.split('.');

        // Decode header (part 1)
        let header = null;
        try {
          const headerRaw = atob(parts[0]);
          console.log('Raw header:', headerRaw);
          header = JSON.parse(headerRaw);
          console.log('Successfully decoded header:', header);
        } catch (e) {
          console.error('Error decoding header:', e);
        }

        // Decode payload (part 2)
        let payload = null;
        try {
          // Add padding if needed
          const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const pad = payloadBase64.length % 4;
          const paddedPayload = pad ? payloadBase64 + '='.repeat(4 - pad) : payloadBase64;

          const rawPayload = atob(paddedPayload);
          console.log('Raw payload before JSON parse:', rawPayload);

          if (rawPayload) {
            payload = JSON.parse(rawPayload);
            console.log('Successfully decoded payload:', payload);
          } else {
            console.error('Raw payload is empty after base64 decode');
          }
        } catch (e) {
          console.error('Error decoding payload:', e);
          if (e instanceof DOMException) {
            console.error('Base64 decoding failed:', e.message);
          } else if (e instanceof SyntaxError) {
            console.error('JSON parsing failed:', e.message);
          }
        }

        if (!header && !payload) {
          console.log('Both header and payload failed to decode');
          return null;
        }

        const result = {
          header: header || { error: 'Failed to decode header' },
          payload: payload || { error: 'Failed to decode payload' }
        };
        console.log('Final decoded result:', result);
        return result;
      } catch (e) {
        console.error('Error in token decoding:', e);
        return null;
      }
    };

    const copyToken = async () => {
      try {
        await navigator.clipboard.writeText(token.value);
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2000);
      } catch (e) {
        error.value = 'Failed to copy token';
      }
    };

    onMounted(async () => {
      if (isAuthenticated.value) {
        try {
          const accessToken = await getAccessTokenSilently();
          token.value = accessToken;
          // Decode token immediately after setting it
          const decoded = decodeToken(accessToken);
          decodedToken.value = decoded;
          console.log('Token decoded in onMounted:', decoded);
        } catch (e) {
          error.value = e.message || 'Failed to get token';
          console.error('Token error:', e);
        }
      }
    });

    return {
      token,
      error,
      isAuthenticated,
      copyToken,
      copySuccess,
      decodedToken
    };
  }
}
</script>

<style scoped>
.token-display {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.token-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.token-section {
  margin: 2rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.token-text {
  width: 100%;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  white-space: pre-wrap;
  word-break: break-all;
}

.copy-button {
  min-width: 100px;
}

.decoded-sections {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
}

.decoded-part {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
}

.decoded-part h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.decoded-part pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.error-message {
  color: #dc3545;
  text-align: center;
}

.loading {
  text-align: center;
  color: var(--secondary-color);
}

h1, h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.25rem;
}

.debug-info {
  margin: 1rem 0;
  padding: 0.5rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
}
</style>
