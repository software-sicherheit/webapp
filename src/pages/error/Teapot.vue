<template>
  <base-error-card>
    <template #header>
      <img src="@/assets/teapot.png" alt="graphic-teapot" />
    </template>
    <template #title>
      I'm a teapot!
    </template>
    <template #content>
      You've attempt to brew coffee with a teapot
    </template>
  </base-error-card>
</template>

<script>
import BaseErrorCard from '../../components/ui/BaseErrorCard.vue';

export default {
  components: {
    BaseErrorCard
  }
};
</script>
