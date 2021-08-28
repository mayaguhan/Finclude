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
                    v-bind:src="person.profilepic"
                    ></v-img>

                    <v-card-title>{{ person.name }}</v-card-title>

                    <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <v-rating
                        :value= person.value
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>

                        <div class="grey--text ms-4">
                        {{ person.value }}
                        </div>
                        
                    </v-row>

                    <div class="my-4 text-subtitle-1 text-left">
                        {{ person.company }}
                    </div>

                    <div class="black--text">"{{ person.desc }}"</div>
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
    name: "Financial Advisors",
    data() {
        return {
            team: [
                {name: 'Zane', company:"AIA", contactnum: "91234567", desc: "I specialize in saving plans. It is not the man who has too little, but the man who craves more, that is poor.", profilepic:"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=731&q=80", email: "advisor@zmail.com", value: 4.8},
                {name: 'Harry', company:"Standard Chartered", contactnum: "91234567", desc: "I love sharing about health insurance. Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.", profilepic:"https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", email: "advisor@zmail.com", value: 4.6},
                {name: 'Gary', company:"AIA", contactnum: "91234567", desc: "I help people when they are treated unfairly. Only buy something that you’d be perfectly happy to hold if the market shuts down for ten years.", profilepic:"https://images.unsplash.com/photo-1561588951-583249cd5060?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80", email: "advisor@zmail.com", value: 4.9},
                {name: 'Brandon', company:"Prudential", contactnum: "91234567", desc: "Contact me to get a headstart in your finances! Not he who has much is rich, but he who gives much.", profilepic:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", email: "advisor@zmail.com", value: 4.1},
                {name: 'Melissa', company:"AIA", contactnum: "91234567", desc: "Want to know the best techniques? Look no further. Time is more valuable than money. You can get more money, but you cannot get more time.", profilepic:"https://images.unsplash.com/photo-1552162864-987ac51d1177?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", email: "advisor@zmail.com", value: 4.6},
                {name: 'Jessie', company:"AIA", contactnum: "91234567", desc: "Growing Your Retirement Dreams. The person who doesn't know where his next dollar is coming from usually doesn't know where his last dollar went.", profilepic:"https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80", email: "advisor@zmail.com", value: 2.8},
                {name: 'Adeline', company:"AIA", contactnum: "91234567", desc: "Balanced Money * Balanced Life. It doesn’t matter about money; having it, not having it. Or having clothes, or not having them. You’re still left alone with yourself in the end.", profilepic:"https://images.unsplash.com/photo-1548142813-c348350df52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80", email: "advisor@zmail.com", value: 4.7},
                {name: 'Tim', company:"AIA", contactnum: "91234561", desc: "Building a better financial life. Money does not buy you happiness, but lack of money certainly buys you misery.", profilepic:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80", email: "advisor@zmail.com", value: 4.2},
                {name: 'Max', company:"AIA", contactnum: "91234567", desc: "Financial Dreams Delivered. Expect the best. Prepare for the worst. Capitalize on what comes.", profilepic:"https://images.unsplash.com/photo-1580639724250-5b465205a500?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80", email: "advisor@zmail.com", value: 4.4},
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