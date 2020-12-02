<template>
  <pv-card class="p-shadow-10 p-d-flex p-jc-center p-ai-center">
    <template #header>
      <div class="img-container">
        <img src="@/assets/register.jpg" alt="graphic-register" />
      </div>
    </template>
    <template #title>
      Sign Up
    </template>
    <template #content>
      <div class="foo">
        <p class="p-text-light">
          Fill the below form to create a new account.
        </p>
        <form>
          <div class="p-fluid form">
            <div class="p-field">
              <span class="p-float-label p-input-icon-left">
                <i class="pi pi-user" />
                <input-text
                  class="p-shadow-1"
                  type="text"
                  id="username"
                  placeholder="Username"
                  aria-describedby="username-help"
                  :class="{ 'p-invalid': isUsernameEmpty }"
                  v-model.trim="username"
                ></input-text>
              </span>
              <small
                v-if="isUsernameEmpty"
                id="username-help help"
                class="p-invalid"
              >
                Please enter your username.
              </small>
            </div>
            <div class="p-field">
              <span class="p-float-label p-input-icon-left">
                <i class="pi pi-lock" />
                <input-text
                  class="p-shadow-1"
                  type="password"
                  id="password"
                  placeholder="Password"
                  aria-describedby="password-help"
                  :class="{ 'p-invalid': isPasswordEmpty }"
                  v-model.trim="password"
                ></input-text>
              </span>
              <small
                v-if="isPasswordEmpty"
                id="password-help help"
                class="p-invalid"
              >
                Please enter your password.
              </small>
            </div>
            <div class="p-field">
              <span class="p-float-label p-input-icon-left">
                <i class="pi pi-lock" />
                <input-text
                  class="p-shadow-1"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  aria-describedby="password-confirm-help"
                  :class="{ 'p-invalid': !isPasswordMatching }"
                  v-model.trim="confirmPassword"
                ></input-text>
              </span>
              <small
                v-if="!isPasswordMatching"
                id="password-confirm-help help"
                class="p-invalid"
              >
                The given passwords doesn't match.
              </small>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="p-d-flex p-jc-between p-ai-center">
        <pv-button
          class="p-shadow-10"
          label="Register"
          :disabled="isLoading"
          @click="submitRegistration"
        ></pv-button>
        <pv-button
          class="p-shadow-10 p-button-outlined"
          label="Login"
          @click="moveToLogin"
          :disabled="isLoading"
        ></pv-button>
      </div>
    </template>
  </pv-card>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  components: {
    InputText
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      isUsernameEmpty: false,
      isPasswordEmpty: false,
      isPasswordMatching: true,
      isLoading: false
    };
  },
  methods: {
    moveToLogin() {
      this.$router.push('/login');
    },
    async submitRegistration() {
      console.log(
        `Requesting to register new user with username=${this.username} and password=${this.password}.`
      );
      this.isLoading = true;

      this.isUsernameEmpty = this.username === '';
      this.isPasswordEmpty = this.password === '';
      this.isPasswordMatching =
        !this.isPasswordEmpty && this.password === this.confirmPassword;
      if (
        !this.isUsernameEmpty &&
        !this.isPasswordEmpty &&
        this.isPasswordMatching
      ) {
        try {
          console.log('Username and password are valid.');
          await this.$store.dispatch('auth/signup', {
            username: this.username,
            password: this.password
          });
          await this.$store.dispatch('user/registerUser', {
            password: this.password
          });
          await this.$store.dispatch('auth/logout');
          this.$router.replace('/login');
          console.log('Successfully signed up');
        } catch (err) {
          console.error(err);
        }
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.img-container {
  padding: 2rem;
}

.form {
  text-align: start;
}
</style>
