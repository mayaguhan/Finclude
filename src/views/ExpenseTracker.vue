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
                                        
                                        <v-btn color="error" @click="toggleTransaction('Expense')">
                                            <h4>Expense</h4>
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
                                        <v-select v-model="editedItem.type" :items="expenseType" 
                                        :menu-props="{ top: false, offsetY: true }" label="Transaction Type">
                                        </v-select>
                                    </v-col>

                                    <v-col v-else>
                                        <v-select v-model="editedItem.type" :items="incomeType" 
                                        :menu-props="{ top: false, offsetY: true }" label="Transaction Type">
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

        <template v-slot:[`item.transactionType`]="{ item }">
            <v-chip :color="getColor(item.transactionType)" dark>
                {{ item.transactionType }}
            </v-chip>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>


    </div >

    <div v-else>
        <!-- Dashboard Code -->






    </div>

    </div>
</template>


<script>
    export default {
        data: () => ({
        // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: '',
        toggle_exclusive: 0,
        toggle_exclusive2: 0,

        menu: false,
        modal: false,
        menu2: false,
        transactionType: "Expense",

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
            { text: 'Transaction Category', value: 'type', filterable: false},
            { text: 'Transaction Type', value: 'transactionType', filterable: false},
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        expenses: [],
        editedIndex: -1,

        editedItem: {
            name: '',
            date: 0,
            amount: '',
            type: "",
            transactionType: '',

        },
        defaultItem: {
            name: '',
            date: 0,
            amount: 0,
            type: 0,
            transactionType: '',
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

        created () {
            this.initialize()
        },

        methods: {
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
                this.editedItem.transactionType = type
                if (type == "Expense") {
                    this.incomeView = false;
                } else {
                    this.incomeView = true;
                }
            },

            getColor(transactionType) {
                if (transactionType == "Expense") return 'red'
                else return 'green'
            },

            initialize () {
                //Retrieve Data this.expense







                this.expenses = [ //Remove after retrieving from DB
                {
                    name: 'Frozen Yogurt',
                    date: "2021-08-20",
                    amount: 6.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Ice cream sandwich',
                    date: "2021-08-21",
                    amount: 8.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Eclair',
                    date: "2021-08-23",
                    amount: 4.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Cupcake',
                    date: "2021-08-24",
                    amount: 5.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Gingerbread',
                    date: "2021-08-20",
                    amount: 3.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Jelly bean',
                    date: "2021-08-20",
                    amount: 6.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Lollipop',
                    date: "2021-08-20",
                    amount: 10.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Honeycomb',
                    date: "2021-08-20",
                    amount: 16.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Donut',
                    date: "2021-08-20",
                    amount: 4.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'KitKat',
                    date: "2021-08-20",
                    amount: 3.00,
                    type: "Food",
                    transactionType: "Expense",
                },
                {
                    name: 'Win 4D',
                    date: "2021-08-20",
                    amount: 300,
                    type: "Salary",
                    transactionType: "Income",
                },
                ]


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
                //Delete from DB (D)




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
                    // Update DB (U)




                } else {
                    
                    //Insert into DB (C)
                    this.expenses.push(this.editedItem)


                }
                this.close()
            },
        },
    }
</script>