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
          backgroundColor: '#556ee6',
          data: [40, 20, 15, 32, 12, 15]
        },
        {
          label: 'All tasks',
          backgroundColor: '#34c38f',
          data: [10, 30, 140, 20, 15, 96]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      display: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    }

  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>

</style>
