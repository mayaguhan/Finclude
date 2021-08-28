<template>
    <v-container>
        <v-row>
            <v-col>
                <img src="../../public/assets/amy-hirschi-JaoVGh5aJ3E-unsplash.jpg" style="height: 500px; border-radius: 10px">
            </v-col>
            <v-col>
                <v-row id="user">
                    <v-col class="mt-4">
                        <img src="../../public/assets/businessman.png" style="height: 175px">
                        <router-link to="/probonoform" style="text-decoration: none">
                            <v-btn text>
                                I want to be a pro-bono advisor!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row id="user">
                    <v-col class="mt-2">
                        <img src="../../public/assets/thinking.jpg" style="height: 175px">

                        <router-link to="/userform" style="text-decoration: none">
                            <v-btn text>
                                I want financial advice!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- <v-row class="mt-4">
            <v-col>
                <div style="margin: auto; text-align: center" class="blue lighten-5 typewriter">
                    <span style="font-size: 100px">About Us</span>
                    <div class="mt-2">
                       <h2> <span style="font-style: italic"></span> Finclude is a</h2> 
                    </div>
                </div>

            </v-col>
        </v-row> -->
    </v-container>
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
    computed: {
        //
    },
    created() {
        //
    }

}
</script>

<style>
#user {
    text-align: center;
    align-content: center;
    margin: auto;
}
</style>