<template>
  <pv-card class="p-shadow-10 card">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <p><strong>Fingerprint (Public Key):</strong></p>
      <div class="code">
        <code>
          {{ publicFingerprint }}
        </code>
      </div>
      <p><strong>Fingerprint (Private Key):</strong></p>
      <div class="code">
        <code>
          {{ privateFingerprint }}
        </code>
      </div>
    </template>
    <template v-slot:footer>
      <div class="button-group">
        <pv-button
          class="p-shadow-10"
          label="Export Public Key"
          @click="exportPublicKey"
        ></pv-button>
        <pv-button
          class="p-shadow-10  p-button-outlined"
          label="Export Private Key"
          @click="exportPrivateKey"
        ></pv-button>
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    publicFingerprint: {
      type: String,
      required: true
    },
    privateFingerprint: {
      type: String,
      required: true
    }
  },
  emits: ['export-public-key', 'export-private-key'],
  methods: {
    exportPublicKey() {
      this.$emit('export-public-key');
    },
    exportPrivateKey() {
      this.$emit('export-private-key');
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  padding: 0.5rem;
}

.code {
  font-family: monospace;
  word-break: break-all;
  white-space: pre-wrap;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
</style>
