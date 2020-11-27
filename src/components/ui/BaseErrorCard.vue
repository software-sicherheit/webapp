<template>
  <pv-card class="p-shadow-10">
    <template #header>
      <div class="img-container">
        <slot name="header"></slot>
      </div>
    </template>
    <template #title>
      <slot class="p-text-bold" name="title"></slot>
    </template>
    <template #content>
      <slot class="p-text-light" name="content"></slot>
    </template>
    <template #footer>
      <pv-button
        class="p-shadow-10"
        label="Get me out of there!"
        @click="redirect('/')"
      ></pv-button>
    </template>
  </pv-card>
</template>

<script>
export default {
  methods: {
    redirect(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-container {
  padding: 2rem;
}
</style>
