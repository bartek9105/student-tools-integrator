<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'Chart',
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Completed tasks',
          backgroundColor: '#f87979',
          data: [40, 20, 15, 32, 12, 15]
        },
        {
          label: 'All tasks',
          backgroundColor: '#efd321',
          data: [10, 30, 140, 20, 15, 96]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>

</style>
