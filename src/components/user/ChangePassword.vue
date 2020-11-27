<template>
  <pv-dialog pv-dialog header="Change Password" v-model:visible="isVisible">
    <template #default>
      <div class="description">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>To change your password, please enter your new password?</span>
      </div>
      <form @submit.prevent="submitRegistration">
        <div class="p-fluid">
          <div class="p-field">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-lock" />
              <input-text
                type="password"
                id="password"
                placeholder="Password"
                :class="{ 'p-invalid': isPasswordGood }"
                v-model.trim="password"
              ></input-text>
            </span>
          </div>
          <div class="p-field">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-lock" />
              <input-text
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                :class="{ 'p-invalid': IsPasswordMatching }"
                v-model.trim="confirmPassword"
              ></input-text>
            </span>
          </div>
        </div>
      </form>
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
import InputText from 'primevue/inputtext';

export default {
  components: {
    InputText
  },
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
      isLoading: false,
      isPasswordGood: false,
      IsPasswordMatching: false,
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    async confirmDialog() {
      this.isLoading = true;
      console.log('Now changing password...');
      try {
        await this.$store.dispatch('user/changePassword', {
          password: this.password
        });
        await this.$store.dispatch('auth/changePassword', {
          password: this.password
        });
        console.log('Successfully changed password');
        this.$emit('close-dialog');
        this.$router.replace('/login');
      } catch (err) {
        console.error(err);
      }
      this.password = '';
      this.confirmPassword = '';
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
