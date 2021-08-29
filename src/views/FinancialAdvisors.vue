<template>
    <div style="text-align: center" class="mt-3">
        <h1 @click="sayHello">Financial Advisors</h1>

        <v-container class="" grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg4 v-for="person in team" :key="person.name">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                    <v-card
                    :loading="loading"
                    class="mx-auto my-12"
                    max-width="374"
                    :elevation="hover ? 24 : 6"
                >
                    <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                    </template>

                    <v-img
                    height="250"
                    v-bind:src="person.imgUrl"
                    ></v-img>

                    <v-card-title>{{ person.firstName }}</v-card-title>

                    <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <v-rating
                        :value= person.rating
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>

                        <div class="grey--text ms-4">
                        {{ person.rating }}
                        </div>
                        
                    </v-row>

                    <div class="my-4 text-subtitle-1 text-left">
                        {{ person.company }}
                    </div>

                    <div class="black--text">"{{ person.experience }}"</div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>


                    <v-card-actions class="justify-center">
                    <v-dialog
                        transition="dialog-top-transition"
                        max-width="600"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >Contact</v-btn>
                        </template>
                        <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >{{ person.firstName }}'s Contact Information</v-toolbar>
                            <v-card-text>
                                <div style="padding-top:40px">
                                    Contact Number: <b>{{ person.contactNum }}</b>
                                </div>
                                <div>
                                    Telegram Handle: <b>{{ person.teleHandle }}</b>
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                            >Close</v-btn>
                            </v-card-actions>
                        </v-card>
                        </template>
                    </v-dialog>
                    </v-card-actions>
                </v-card>
                </template>
                </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Financial Advisors",
    data() {
        return {
            team: [
                
            ]
        }
    },
    methods: {
        sayHello() {
            alert("Hey!");
        }
    },
    created() {
            const axios = require('axios');
            axios.get('https://sg7f8ajqok.execute-api.us-east-1.amazonaws.com/production/agents')
                .then((response) => {
                    //Success
                    this.expenses = response.data.Items;
                    console.log(response.data.Items);
                    let advisorArray = response.data.Items;
                    for (let index = 0; index < advisorArray.length; index++) {
                        const advisorData = advisorArray[index];
                        this.team.push(advisorData);
                    }
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

}
</script>


<style>

</style>