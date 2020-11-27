<template>
  <base-error-card>
    <template #header>
      <img src="@/assets/serverError.png" alt="graphic-server-error" />
    </template>
    <template #title>
      Internal Server Error!
    </template>
    <template #content>
      Our server is on a break
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
