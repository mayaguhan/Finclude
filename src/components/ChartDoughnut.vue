<template>
  <b-card title="Expenses breakdown">
    <b-card img-bottom>
      <ChartDoughnutBase :chart-data="chartData" />
    </b-card>
    <span>{{chartExpense}}</span>
  </b-card>
  <!-- <ChartDoughnutBase :chart-data="chartData" /> -->
</template>

<script>
console.log("A");
import ChartDoughnutBase from "@/components/ChartDoughnutBase";

export default {
  components: {
    ChartDoughnutBase
  },
  props: [
    "expenses"
  ],
  data() {
    return {
      chartData: null,
      chartExpense: JSON.parse(JSON.stringify(this.expenses)),
      totalExpense: 0,
    };
  },
  mounted() {
    this.fillData();
    console.log(this.chartExpense);
    for (let expense in this.chartExpense) {
      this.totalExpense += parseFloat(this.chartExpense[expense].amount);
      // console.log(this.chartExpense[expense]);
    }
    console.log(this.totalExpense);

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
