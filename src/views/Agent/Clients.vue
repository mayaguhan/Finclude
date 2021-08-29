<template>
    <div style="text-align: center" class="mt-3">
        <h1 @click="sayHello">Clients</h1>

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
                    >
                    </v-img>

                    <v-card-title>{{ person.firstName }}</v-card-title>

                    <v-card-text>
                        <div class="text-subtitle-1 text-left">Bio: <b>"{{ person.bio }}"</b></div>
                        <div class="text-subtitle-1 text-left">Monthly Salary: ${{ person.salary }}</div>
                        <div class="text-subtitle-1 text-left">Monthly Expenditure: ${{ person.monExpenditure }}</div>
                        <div class="text-subtitle-1 text-left">Goal: {{ person.goal }} (Within {{ person.yearsToGoal }} Years)</div>
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
                        >Details</v-btn>
                        </template>
                        <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >{{ person.firstName }}'s Expenditure Details</v-toolbar>
                            <v-card-text>
                                <div id="test">
                                    <table class="pt-4">
                                        <tr style="color: #580057">
                                            <td>
                                               <b>Title</b> 
                                            </td>
                                            <td>
                                               <b>Currency ($)</b> 
                                            </td>
                                        </tr>

                                        <tr v-for="(value, key) in person.expObject" :key=key style="text-align: left">
                                            <th class="pr-3">
                                                {{ key }}
                                            </th>
                                            <td>
                                                {{ value.toFixed(2) }}
                                            </td>
                                        </tr>
                                            <!-- {{ key }}: <b>${{ value.toFixed(2) }}</b> -->
                                    </table>
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
    name: "Clients",
    data() {
        return {
            team: [
                
            ]
        }
    },
    methods: {
        sayHello() {
            alert("Hey!");
        },
        loadExpense(userid) {
            //console.log(userid);
            const axios = require('axios');
            axios.get(`https://30kjo8lvo2.execute-api.us-east-1.amazonaws.com/production/expenses/${userid}`)
                .then((response) => {
                    //Success
                    console.log(userid);
                    console.log(response);
                    this.expenses = response.data.Items;
                    let expenseObject = {"Food":0, "Transportation":0, "Household":0, "Education":0, "Beauty":0, "Health":0, "Gift":0, "Other":0, "Total":0};
                    for (let index = 0; index < this.expenses.length; index++) {
                        let myPrice = this.expenses[index].amount;
                        myPrice = parseFloat(myPrice);
                        let myCategory = this.expenses[index].category;
                        if (myCategory in expenseObject) {
                            expenseObject[myCategory] += myPrice;
                            expenseObject["Total"] += myPrice;
                        }
                    }
                    console.log(expenseObject);
                    if (expenseObject["Total"] !== 0) {
                        for (let index = 0; index < this.team.length; index++) {
                            const clientObject = this.team[index];
                            console.log(clientObject);
                            if (clientObject["id"] == userid) {
                                this.team[index]["expObject"] = expenseObject;
                            }
                        }
                    }
                    console.log(this.team);

                    this.expenses.sort(function(a, b) {
                        return new Date(a.date) - new Date(b.date);
                    });
                })

                .catch(function (error) {
                    //error
                    console.log(error);
                })

                .then(function () {
                    // console.log(response);
                    // console.log("GET Request complete")
                });
        }
    },
    created() {
            const axios = require('axios');
            axios.get('https://vir9lpv010.execute-api.us-east-1.amazonaws.com/production/users')
                .then((response) => {
                    //Success
                    this.expenses = response.data.Items;
                    console.log(response.data.Items);
                    let clientArray = response.data.Items;
                    for (let index = 0; index < clientArray.length; index++) {
                        const clientData = clientArray[index];
                        this.team.push(clientData);
                        console.log(clientData);
                        console.log(clientData.id)
                        console.log(this.team);
                        let clientID = clientData.id;

                        this.loadExpense(clientID);
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

#test {
    width:100%;
    height:100%;
}
table {
    margin: 0 auto; /* or margin: 0 auto 0 auto */
    border: none;
    
}

tr:nth-child(even) {
    background-color: #f7e1fa;
    border: 1px solid black;
}

td, th {
    border: none;
}
</style>