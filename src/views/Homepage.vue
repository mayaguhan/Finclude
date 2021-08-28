<template>
    <v-container>
        <v-row class="mt-5 blue lighten-5" style="border-radius: 40px">
            <v-col>
                <img src="../../public/assets/financialadvisors.jpg" style="height: 300px; border-radius: 20px">
            </v-col>
            <v-col>
                <div class="mt-10" id="description1">
                    <div>
                        <h2 >
                            Meet our friendly advisors...
                        </h2>
                    </div>
                    <div>
                        <p>
                            We have friendly and competent financial advisors willing to advise you regarding your finances. With a heart to serve you and the knowledge in finance, we hope to make your lives better through one step at a time.
                            <br>
                            <br>
                            <router-link to="/financialadvisors">Click here to find your advisor!</router-link>
                        </p>
                    </div>
                </div>

            </v-col>
        </v-row>

        <v-row class="mt-10 blue lighten-5" style="border-radius: 40px">
            <v-col>
                <div class="mt-10 ml-10" id="description1">
                    <div>
                        <h2 >
                            Learn how to manage your finances...
                        </h2>
                    </div>
                    <div>
                        <p>
                            At Finclude, we believe that knowledge is power. We have a specially curated list of articles for you to learn how to better manage your finances and get to know about the latest financial developments. 
                            <br>
                            <br>
                            <router-link to="/financialadvisors">Click here to start learning!</router-link>
                        </p>
                    </div>
                </div>

            </v-col>
            <v-col style="float:right">
                <img src="../../public/assets/articles.jpg" style="height: 300px; border-radius: 20px; float: right">
            </v-col>
        </v-row>


        <v-row class="mt-10 blue lighten-5" style="border-radius: 40px">
            <v-col>
                <img src="../../public/assets/Dashboard.jpg" style="height: 300px; border-radius: 20px">
            </v-col>
            <v-col>
                <div class="mt-10" id="description1">
                    <div>
                        <h2 >
                            Track your expenses with Finclude...
                        </h2>
                    </div>
                    <div>
                        <p>
                            Set goals for yourself and manage your expenses. View comprehensive dashboards about your spending habits. Your financial advisor can analyze your spending habits to advise you better.
                            <br>
                            <br>
                            <router-link to="/financialadvisors">Click here to view your personalized dashboards!</router-link>
                        </p>
                    </div>
                </div>

            </v-col>
        </v-row>
    </v-container>
    <!-- <div>
        <div class="ml-10 mt-10">
            <div style="width: 100%">
                <div>
                    <img src="../assets/financialadvisors.jpg" style="height: 300px; border-radius: 20px">
                </div>
                <div style="margin-left: 50px">
                    <h3>Hello Everyone!</h3>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: "Homepage",
    data() {
        return {
            //
        }
    },
    methods: {
        //
    },
    created() {
        //
    }
}
</script>

<style>

#description1 {
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
}

</style>