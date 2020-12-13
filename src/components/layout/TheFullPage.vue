<template>
  <div class="p-d-flex p-jc-center p-ai-center container">
    <the-git-hub-ribbon></the-git-hub-ribbon>
    <router-view></router-view>
  </div>
</template>

<script>
import TheGitHubRibbon from './TheGitHubRibbon.vue';

export default {
  components: {
    TheGitHubRibbon
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  text-align: center;
}
</style>
