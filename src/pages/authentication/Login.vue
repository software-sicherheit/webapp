<template>
  <pv-card class="p-shadow-10 p-d-flex p-jc-center p-ai-center">
    <template #header>
      <div class="img-container">
        <img src="@/assets/login.png" alt="graphic-login" />
      </div>
    </template>
    <template #title>
      Login
    </template>
    <template #content>
      <div class="foo">
        <p class="p-text-light">
          Welcome back, please login to your account.
        </p>
        <form>
          <div class="p-fluid">
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
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="p-d-flex p-jc-between p-ai-center">
        <pv-button
          class="p-shadow-10"
          label="Login"
          @click="submitLogin"
          :disabled="isLoading"
        ></pv-button>
        <pv-button
          class="p-shadow-10 p-button-outlined"
          label="Register"
          @click="moveToRegister"
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
      isUsernameEmpty: false,
      isPasswordEmpty: false,
      isLoading: false
    };
  },
  methods: {
    moveToRegister() {
      this.$router.push('/register');
    },
    async submitLogin() {
      console.log(
        `Requesting to login user with username=${this.username} and password=${this.password}.`
      );
      this.isLoading = true;

      this.isUsernameEmpty = this.username === '';
      this.isPasswordEmpty = this.password === '';
      if (!this.isUsernameEmpty && !this.isPasswordEmpty) {
        try {
          console.log('Username and password are valid.');
          await this.$store.dispatch('auth/login', {
            username: this.username,
            password: this.password
          });
          await this.$store.dispatch('user/loginUser', {
            password: this.password
          });
          console.log('Successfully signed in');
          await this.$router.replace('/storage');
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
