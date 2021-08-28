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
  data() {
    return {
      btn: [
        { label: "Salary Left ($)", value: "leftover" },
        { label: "This Month", value: "leftover" }
      ],

      chartData: null,
      data: {
        expenditure: [20, 600, 40, 60, 80],
        leftover: [780, 180, 140, 80, 0]
      },
      labels: {
        expenditure: [1, 12, 17, 20, 28],
        leftover: [1, 12, 17, 20, 28]
      },
      radio: "leftover"
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.labels[this.radio],
        datasets: [
          {
            borderColor: "#81894e",
            data: this.data[this.radio],
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