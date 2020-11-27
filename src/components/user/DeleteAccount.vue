<template>
  <pv-dialog
    pv-dialog
    header="Delete Account"
    v-model:visible="isVisible"
    :closeOnEscape="true"
  >
    <template #default>
      <div class="description">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Are you sure to delete your own account?</span>
      </div>
    </template>
    <template #footer>
      <pv-button
        label="No"
        icon="pi pi-times"
        :disabled="isLoading"
        @click="closeDialog"
        class="p-button-text"
      ></pv-button>
      <pv-button
        label="Yes"
        icon="pi pi-check"
        :disabled="isLoading"
        @click="confirmDialog"
        class="p-button-text"
        autofocus
      ></pv-button>
    </template>
  </pv-dialog>
</template>

<script>
export default {
  watch: {
    shallDialogBeOpen(value) {
      this.isVisible = value;
    }
  },
  props: {
    shallDialogBeOpen: {
      type: Boolean,
      required: true,
      sync: true
    }
  },
  emits: ['close-dialog'],
  data() {
    return {
      isVisible: false,
      isLoading: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    async confirmDialog() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('user/deleteAccount');
        await this.$store.dispatch('auth/deleteAccount');
        console.log('Successfully deleted the account.');
        this.$emit('close-dialog');
        this.$router.replace('/login');
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
