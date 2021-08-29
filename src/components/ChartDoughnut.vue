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
  props: [
    "expenses"
  ],
  data() {
    return {
      chartData: null,
      chartExpense: JSON.parse(JSON.stringify(this.expenses)),
      totalExpense: 0,
      totalIncome: 0,
      expenseData: {}
    };
  },
  mounted() {
    
    for (let expense in this.chartExpense) {
      if (this.chartExpense[expense].type == "Expenses") {
        this.totalExpense += parseFloat(this.chartExpense[expense].amount);

        if (this.expenseData[this.chartExpense[expense].category]) { //Category exists
          this.expenseData[this.chartExpense[expense].category] += parseFloat(this.chartExpense[expense].amount);
        } else { //Category does not exist
          this.expenseData[this.chartExpense[expense].category] = 0
          this.expenseData[this.chartExpense[expense].category] += parseFloat(this.chartExpense[expense].amount);
        }
      } else {
        this.totalIncome += parseFloat(this.chartExpense[expense].amount);
      }
    }
    let chartLabel = [];
    let chartValue = [];


    for (let data in this.expenseData) {
      chartLabel.push(data);
      chartValue.push(((this.expenseData[data] / this.totalExpense) * 100).toFixed(2));
    }
    // console.log(chartLabel);
    // console.log(chartValue);

    this.fillData(chartLabel, chartValue);


  },
  methods: {
    fillData(chartLabel, chartValue) {
      this.chartData = {
        datasets: [
          {
            backgroundColor: ["#f36e60", "#ffdb3b", "#185190"],
            hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7"],
            data: chartValue
          }
        ],
        labels: chartLabel,
      };
    }
  }
};
</script>
