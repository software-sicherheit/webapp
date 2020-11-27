<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './TheHeader';

export default {
  components: {
    TheHeader
  }
};
</script>
