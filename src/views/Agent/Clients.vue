<template>
    <div style="text-align: center" class="mt-3">
        <h1 @click="sayHello">Clients</h1>

        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg4 v-for="person in team" :key="person.name">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                    <v-card
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
                    v-bind:src="person.avatar"
                    >
                    </v-img>

                    <v-card-title>{{ person.firstName }}</v-card-title>

                    <v-card-text>
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
                        >Contact</v-btn>
                        </template>
                        <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >{{ person.name }}'s Contact Information</v-toolbar>
                            <v-card-text>
                            <div style="padding-top:40px">Contact Number: <b>{{ person.contactnum }}</b></div>
                            <div>Email: <b>{{ person.contactnum }}</b></div>
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
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Mike",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1520560868530-7877729f8942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Evan",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1489980478712-2ab535aa775f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Chris",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Sharon",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1527423460268-0b3795a97e7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Nicole",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1610130383669-95917c70ca20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Karen",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1525077769455-287cd9d231a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Kevin",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1541855492-581f618f69a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Jason",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                {prefCurrency: "SGD",
                monExpenditure: 400,
                bio: "it's hard to get by...",
                lastName: "Ang",
                salary: 1200,
                goal: 100000,
                firstName: "Fred",
                lang: "EN",
                yearsToGoal: 20,
                advisorId: "123456",
                id: "123458",
                monSavings: 600,
                avatar:"https://images.unsplash.com/photo-1480406537807-00c0914e8d40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
            ]
        }
    },
    methods: {
        sayHello() {
            alert("Hey!");
        }
    },
    created() {
        //
    }

}
</script>


<style>

</style>