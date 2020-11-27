<template>
  <div class="p-grid p-jc-center p-ai-center">
    <div class="p-col-8">
      <pv-card class="p-shadow-10 p-mt-4">
        <template class="title" #title>
          <p class="title">Dashboard</p>
        </template>
        <template #content>
          <chart type="radar" :data="getChartData()"></chart>
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
  methods: {
    getChartData() {
      console.log('Get chart data...');
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
            data: [28, 48, 40, 90, 45, 50]
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
