<template>
  <b-card title="Salary after expenses">
    <b-form-group>
      <b-form-radio
        v-for="(item, index) in btn"
        :key="index"
        v-model="radio"
        :name="item.label"
        :value="item.value"
        @change="updateChart"
      >
        {{ item.label }}
      </b-form-radio>
    </b-form-group>

    <b-card img-bottom>
      <ChartLineBase :chart-data="chartData" />
    </b-card>
  </b-card>
</template>

<script>
import ChartLineBase from "@/components/ChartLineBase";

export default {
  components: {
    ChartLineBase
  },
  props: [
    "expenses"
  ],
  data() {
    return {
      userData: [],
      userId: "123450",
      chartExpense: JSON.parse(JSON.stringify(this.expenses)),
      salary: 0,
      totalExpense: 0,
      totalIncome: 0,
      expenseData: {},
      lineData: [],

      btn: [
        { label: "Salary Left ($)", value: "leftover" },
        { label: "This Month", value: "leftover" }
      ],

      chartData: null,
      // data: {
      //   // expenditure: [20, 600, 40, 60, 80],
      //   leftover: [this.salary, 180, 140, 80, 0]
      // },
      // labels: {
      //   // expenditure: [1, 6, 11, 16, 21, 26, 31],
      //   leftover: [1, 6, 11, 16, 21, 26, 31]
      // },
      // radio: "leftover"
    };
  },
  created() {
    const axios = require('axios');
    axios.get(`https://vir9lpv010.execute-api.us-east-1.amazonaws.com/production/users/${this.userId}`)
      .then((response) => {
        //Success
        this.userData = response.data.Items;
        // this.salary = this.userData[0].salary;

        let leftoverAmt = this.userData[0].salary;
        let leftoverValue = [];
        let leftoverDay = [];
    
        for (let expense in this.chartExpense) {
          if ((this.chartExpense[expense].date.split("-")[1] == (new Date().getMonth() + 1))
          &&  (this.chartExpense[expense].date.split("-")[0] == (new Date().getFullYear()))) {
            
            leftoverValue.push(leftoverAmt);
            leftoverDay.push(this.chartExpense[expense].date.split("-")[2]);

            if (this.chartExpense[expense].type == "Expenses") { //Expense
              this.totalExpense += parseFloat(this.chartExpense[expense].amount);

              if (this.expenseData[this.chartExpense[expense].category]) { //Category exists
                this.expenseData[this.chartExpense[expense].category] += parseFloat(this.chartExpense[expense].amount);
              } else { //Category does not exist
                this.expenseData[this.chartExpense[expense].category] = 0
                this.expenseData[this.chartExpense[expense].category] += parseFloat(this.chartExpense[expense].amount);
              }
              leftoverAmt -= parseFloat(this.chartExpense[expense].amount);

            } else { //Income
              this.totalIncome += parseFloat(this.chartExpense[expense].amount);
              leftoverAmt += parseFloat(this.chartExpense[expense].amount);
            }

          }
        }
        console.log(this.chartExpense);
        console.log("Final Leftover: ", leftoverAmt);
        console.log(this.lineData);



        this.fillData(leftoverDay, leftoverValue);
      })

      .catch(function (error) {
        //error
        console.log(error);
      })

      .then(function () {
        // console.log(response);
        // console.log("GET Request complete")
      });
  },

  mounted() {



  },
  methods: {
    fillData(leftoverDay, leftoverValue) {
      this.chartData = {
        labels: leftoverDay,
        datasets: [
          {
            borderColor: "#81894e",
            data: leftoverValue,
            label: "Salary Remaining"
          },

          // {
          //   borderColor: "#C80000",
          //   data:this.data[this.leftover],
          //   label: "Salary remaining"
          // }
        ]
      };
    },
    updateChart() {
      this.$nextTick(() => {
        this.fillData();
      });
    }
  }
};
</script>