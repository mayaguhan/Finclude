<template>
    <div class="text-center">

    <v-btn-toggle v-model="toggle_exclusive" tile color="deep-purple dark-2" group>
        <v-btn @click="toggleView('Transaction')">
            <h3>Transaction</h3>
        </v-btn>

        
        <v-btn @click="toggleView('Dashboard')">
            <h3>Dashboard</h3>
        </v-btn>
    </v-btn-toggle>

    <div v-if="!dashboardView">
    <v-data-table :headers="headers" :items="expenses" :search="search" sort-by="date" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-card-title>
                    <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="purple darken-2" dark class="mb-2" v-bind="attrs" v-on="on">
                            New Transaction
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-btn-toggle v-model="toggle_exclusive2">
                                        <v-btn color="success" @click="toggleTransaction('Income')">
                                            <h4>Income</h4>
                                        </v-btn>
                                        
                                        <v-btn color="error" @click="toggleTransaction('Expenses')">
                                            <h4>Expenses</h4>
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field  v-model="editedItem.name" label="Transaction Name"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="date" label="Transaction Date" append-icon="mdi-calendar" 
                                                readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" color="purple darken-2" @input="onDateChange"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="editedItem.amount" label="Amount ($)" type="number"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col v-if="!incomeView">
                                        <v-select v-model="editedItem.category" :items="expenseType" 
                                        :menu-props="{ top: false, offsetY: true }" label="Transaction Category">
                                        </v-select>
                                    </v-col>

                                    <v-col v-else>
                                        <v-select v-model="editedItem.category" :items="incomeType" 
                                        :menu-props="{ top: false, offsetY: true }" label="Transaction Category">
                                        </v-select>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close" >
                                Cancel
                            </v-btn>

                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this expense?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)" color="purple">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)" color="red">
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:[`item.type`]="{ item }">
            <v-chip :color="getColor(item.type)" dark>
                {{ item.type }}
            </v-chip>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>


    </div >

    <template v-else>
        <div>
            <v-container>
                <h1 style="text-align: center">My Expenses </h1>
                <v-row class="mt-6">
                    <v-col style="padding-right: 50px">
                        <ChartDoughnut :expenses="expenses" :key="componentKey" />
                    </v-col>
                    <v-col style="padding-left: 50px">
                        <ChartLine :expenses="expenses" :key="comopnentKey" />
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

    </div>
</template>


<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)
import ChartDoughnut from "@/components/ChartDoughnut";
import ChartLine from "@/components/ChartLine";

    export default {
        components: {
            ChartDoughnut,
            ChartLine
        },
        data: () => ({
        // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: '',
        toggle_exclusive: 0,
        toggle_exclusive2: 0,
        userData: [],
        componentKey: 0,
        menu: false,
        modal: false,
        menu2: false,
        type: "Expense",
        userId: "123450",

        dashboardView: false,
        incomeView: true,

        expenseType: ['Food', 'Transportation', 'Household', 'Education', 'Beauty', 'Health', 'Gift', 'Other'],
        incomeType: ['Salary', 'Allowance', 'Bonus', 'Petty Cash', 'Other'],

        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [
            { text: 'Transaction Name', align: 'start', sortable: false, value: 'name'},
            { text: 'Date', value: 'date', filterable: false, sortable: true},
            { text: 'Amount', value: 'amount', filterable: false},
            { text: 'Transaction Category', value: 'category', filterable: false},
            { text: 'Transaction Type', value: 'type', filterable: false},
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        expenses: [],
        editedIndex: -1,

        editedItem: {
            userId: 0,
            name: '',
            date: 0,
            amount: 0,
            category: '',
            type: '',

        },
        defaultItem: {
            userId: 0,
            name: '',
            date: 0,
            amount: 0,
            category: '',
            type: '',
        },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Transaction' : 'Edit Transaction'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        created() {
            this.retrieveLatest();
        },

        methods: {
            retrieveLatest(){
                const axios = require('axios');
                axios.get('https://30kjo8lvo2.execute-api.us-east-1.amazonaws.com/production/expenses/123450')
                    .then((response) => {
                        //Success
                        this.expenses = response.data.Items;

                        this.expenses.sort(function(a, b) {
                            return new Date(a.date) - new Date(b.date);
                        });
                        console.log(this.expenses);
                    })

                    .catch(function (error) {
                        //error
                        console.log(error);
                    })

                    .then(function () {
                        // console.log(response);
                        // console.log("GET Request complete")
                    });

                axios.get(`https://vir9lpv010.execute-api.us-east-1.amazonaws.com/production/users/${this.userId}`)
                .then((response) => {
                    //Success
                    this.userData = response.data.Items;
                    // this.salary = this.userData[0].salary;
                    // console.log(this.userData[0]);

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
            
            onDateChange() {
                this.editedItem.date = this.date
                this.defaultItem.date = this.date
                this.menu2 = false
            },

            toggleView(page) {
                if (page == "Transaction") {
                    this.dashboardView = false;
                } else {
                    this.dashboardView = true;
                }
            },

            toggleTransaction(type) {
                this.editedItem.type = type
                if (type == "Expenses") {
                    this.incomeView = false;
                } else {
                    this.incomeView = true;
                }
            },

            getColor(type) {
                if (type == "Expenses") return 'red'
                else return 'green'
            },

            editItem (item) {
                this.editedIndex = this.expenses.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.expenses.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.expenses.splice(this.editedIndex, 1)
                this.closeDelete()

                //Delete Expense
                axios.delete(`https://30kjo8lvo2.execute-api.us-east-1.amazonaws.com/production/expenses?userId=${this.userId}&name=${this.editedItem.name}`)
                .then(response => {
                    console.log(response);
                    this.retrieveLatest();
                    this.componentKey += 1;
                })
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.expenses[this.editedIndex], this.editedItem)
                    
                    console.log(this.editedItem);
                    //Update

                } else {
                    //Insert into DB (C)
                    this.editedItem.userId = this.userId;
                    this.expenses.push(this.editedItem);
                    console.log(this.editedItem);

                    axios.put("https://30kjo8lvo2.execute-api.us-east-1.amazonaws.com/production/expenses", this.editedItem)
                    .then(response => {
                        console.log(response);
                        this.retrieveLatest();
                        this.componentKey += 1;
                    })
                }
                this.close()
            },
        },
    }
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