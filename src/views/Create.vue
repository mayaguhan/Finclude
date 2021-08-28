<template>
    <v-container>
        <v-row>
            <v-col>
                <img src="../assets/amy-hirschi-JaoVGh5aJ3E-unsplash.jpg" style="height: 500px; border-radius: 10px">
            </v-col>
            <v-col>
                <v-row id="user">
                    <v-col class="mt-4">
                        <img src="../assets/businessman.png" style="height: 175px">
                        <router-link to="/probonoform" style="text-decoration: none">
                            <v-btn text>
                                I want to be a pro-bono advisor!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row id="user">
                    <v-col class="mt-2">
                        <img src="../assets/thinking.jpg" style="height: 175px">

                        <router-link to="/userform" style="text-decoration: none">
                            <v-btn text>
                                I want financial advice!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
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