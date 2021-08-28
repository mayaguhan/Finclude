<template>
  <b-card title="Expenses breakdown">
    <b-card img-bottom>
      <ChartDoughnutBase :chart-data="chartData" />
    </b-card>
  </b-card>
  <!-- <ChartDoughnutBase :chart-data="chartData" /> -->
</template>

<script>
import ChartDoughnutBase from "@/components/ChartDoughnutBase";

export default {
  components: {
    ChartDoughnutBase
  },
  data() {
    return {
      chartData: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        datasets: [
          {
            backgroundColor: ["#f36e60", "#ffdb3b", "#185190"],
            hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7"],
            data: [10, 20, 40, 30]
          }
        ],
        labels: ["Food", "Transport", "Extra", "Remaining"],

      };
    }
  }
};
</script>
