<template>
  <div class="p-grid p-jc-center p-ai-center">
    <div class="p-col-8">
      <pv-card class="p-shadow-10 p-mt-4">
        <template class="title" #title>
          <p class="title">Dashboard</p>
        </template>
        <template #content>
          <p v-if="isLoading">Loading...</p>
          <chart v-else type="radar" :data="chartData"></chart>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
  components: {
    Chart
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    data() {
      const data = this.$store.getters['statistics/statistics'];
      return [
        data.cpuUsage,
        data.ramUsage,
        data.diskUsage,
        data.swapUsage,
        data.inboundTraffic,
        data.outboundTraffic
      ];
    },
    chartData() {
      return {
        labels: [
          'CPU Usage',
          'RAM Usage',
          'Disk Usage',
          'Swap Usage',
          'Inbound Traffic',
          'Outbound Traffic'
        ],
        datasets: [
          {
            label: 'Current Statistics',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: this.data
          }
        ]
      };
    }
  },
  created() {
    this.loadStatistics();
  },
  methods: {
    async loadStatistics() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('statistics/fetchStatistics');
        console.log('Successfully fetched statistics');
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
