<template>
    <div>
        <v-container>
            <h1 style="text-align: center">My Expenses </h1>
            <v-row class="mt-6">
                <v-col style="padding-right: 50px">
                    <ChartDoughnut />
                </v-col>
                <v-col style="padding-left: 50px">
                    <ChartLine />
                </v-col>
            </v-row>
        </v-container>

        <div style="margin:auto; text-align:center; padding-top: 50px">
            <h1><i>Weekly Goals to Achieve</i></h1>
                To hit your goal, you should only spend ______ weekly.
                <br>
                You have to save _____ more to hit your goal this week.
        </div>

        <div style="margin:auto; text-align:center; padding-top: 50px">
            <h1><i>Monthly Goals to Achieve</i></h1>
                To hit your goal, you should only spend ______ monthly.
                <br>
                You have to save _____ more to hit your goal this month.

        </div>

        <div style="margin:auto; text-align: center; padding-top: 50px">
            <h1><i>Final Goal</i></h1>
                You have to save _____ more to hit your goal.

        </div>

    </div>
</template>

<script>
// import { generateChart } from 'vue-chartjs';
import ChartDoughnut from "@/components/ChartDoughnut";
import ChartLine from "@/components/ChartLine";

export default {
    components: {
        ChartDoughnut,
        ChartLine
    }
};

</script>

<style lang='scss' scoped>
.grid {
    display: grid;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
}
</style>