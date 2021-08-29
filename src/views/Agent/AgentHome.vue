<template>
    <v-container>
        <v-row class="mt-5 blue lighten-5" style="border-radius: 40px">
            <v-col>
                <img src="https://tinmansachs.s3.amazonaws.com/Clients.jpg" style="height: 300px; border-radius: 20px">
            </v-col>
            <v-col>
                <div class="mt-10" id="description1">
                    <div>
                        <h2 >
                            Client Mangement
                        </h2>
                    </div>
                    <div>
                        <p>
                            Clients are of utmost importance and their well-being is priority here at Finclude. You can view and manage your clients here easily.
                            <br>
                            <br>
                            <router-link to="/clients">Click here to view your clients!</router-link>
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
                            Consult A Pro Bono Legal
                        </h2>
                    </div>
                    <div>
                        <p>
                            At Finclude, clients well being is priority. Please go the extra mile to consult a pro bono legal if your client is a victim of financial exploitation. Every little step counts.
                            <br>
                            <br>
                            <router-link to="/report">Click here to consult a legal!</router-link>
                        </p>
                    </div>
                </div>

            </v-col>
            <v-col style="float:right">
                <img src="https://tinmansachs.s3.amazonaws.com/Report.jpg" style="height: 300px; border-radius: 20px; float: right">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "AgentHome",
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

</style>