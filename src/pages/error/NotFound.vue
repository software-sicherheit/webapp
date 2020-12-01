<template>
  <base-error-card>
    <template #header>
      <img src="@/assets/notFound.png" alt="graphic-not-found" />
    </template>
    <template #title>
      Whoops, 404!
    </template>
    <template #content>
      The page you were looking for does not exist
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
