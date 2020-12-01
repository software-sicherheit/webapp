<template>
  <base-error-card>
    <template #header>
      <img src="@/assets/notAuthorized.png" alt="graphic-not-authorized" />
    </template>
    <template #title>
      You are not authorized!
    </template>
    <template #content>
      Try a different attack - then you might be successful
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
