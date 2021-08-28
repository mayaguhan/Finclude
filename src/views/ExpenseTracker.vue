<template>
    <div class="text-center">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum, quos velit quo temporibus unde perspiciatis, accusamus deleniti soluta deserunt delectus omnis eligendi similique asperiores tempora quis odio quidem vitae.
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, dolorem? Dignissimos, adipisci! Eius provident esse est soluta quia aliquid iure officiis facilis, quos at suscipit culpa ab commodi autem sequi.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et porro repellat, nulla esse impedit nostrum! Quia placeat, suscipit velit possimus tenetur sit ea assumenda saepe deleniti molestias unde ex quasi?
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia dicta ipsum nesciunt voluptates harum totam soluta rerum nihil corporis eveniet dolorem, quasi minus dolores dolor est velit iusto saepe quod.
    <br>

    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="date" class="elevation-1">
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
                            New Expense
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-text-field  v-model="editedItem.name" label="Expense Name"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="date" label="Expense Date" append-icon="mdi-calendar" 
                                                readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" color="purple darken-2" @input="onDateChange"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="editedItem.amount" label="Amount" type="number"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-select v-model="editedItem.type" :items="expenseType" 
                                        :menu-props="{ top: false, offsetY: true }" label="Expense Type">
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
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
    </div>
</template>


<script>
    export default {
        data: () => ({
        // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: '',
        menu: false,
        modal: false,
        menu2: false,

        expenseType: ['Food', 'Transportation', 'Household', 'Education', 'Beauty', 'Health', 'Gift', 'Other'],

        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [
            { text: 'Expense Name', align: 'start', sortable: false, value: 'name'},
            { text: 'Date', value: 'date', filterable: false, sortable: true},
            { text: 'Amount', value: 'amount', filterable: false},
            { text: 'Expense Type', value: 'type', filterable: false},
            // { text: 'Remarks', value: 'remarks', filterable: false},
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,

        editedItem: {
            name: '',
            date: 0,
            amount: '',
            type: "",
            remarks: "",
        },
        defaultItem: {
            name: '',
            date: 0,
            amount: 0,
            type: 0,
            remarks: 0,
        },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Expense' : 'Edit Expense'
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

            initialize () {
                //Retrieve Data
                this.desserts = [
                {
                    name: 'Frozen Yogurt',
                    date: "2021-08-20",
                    amount: 6.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Ice cream sandwich',
                    date: "2021-08-21",
                    amount: 8.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Eclair',
                    date: "2021-08-23",
                    amount: 4.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Cupcake',
                    date: "2021-08-24",
                    amount: 5.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Gingerbread',
                    date: "2021-08-20",
                    amount: 3.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Jelly bean',
                    date: "2021-08-20",
                    amount: 6.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Lollipop',
                    date: "2021-08-20",
                    amount: 10.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Honeycomb',
                    date: "2021-08-20",
                    amount: 16.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'Donut',
                    date: "2021-08-20",
                    amount: 4.00,
                    type: "Food",
                    remarks: "",
                },
                {
                    name: 'KitKat',
                    date: "2021-08-20",
                    amount: 3.00,
                    type: "Food",
                    remarks: "",
                },
                ]
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)
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
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    // Update DB (U)




                } else {
                    
                    //Insert into DB (C)
                    this.desserts.push(this.editedItem)


                }
                this.close()
            },
        },
    }
</script>

<style>

</style>