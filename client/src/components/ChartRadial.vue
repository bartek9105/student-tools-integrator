<template>
   <div id="chart">
      <apexchart type="radialBar" height="300" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'ChartRadial',
  components: {
    apexchart: VueApexCharts
  },
  props: ['labels', 'series'],
  data () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: 'Total',
                formatter: () => {
                  const avg = this.series.reduce((a, b) => a + b)
                  const avgResult = avg / this.labels.length
                  if (isNaN(avgResult)) {
                    return 'No data'
                  }
                  return avgResult.toFixed(2)
                }
              }
            }
          }
        },
        labels: this.labels
      }
    }
  }
}
</script>

<style>

</style>
