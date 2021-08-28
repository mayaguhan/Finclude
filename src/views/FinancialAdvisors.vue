<template>
    <div style="text-align: center" class="mt-3">
        <h1 @click="sayHello">Advisors</h1>

        <v-container class="my-5" grid-list-md>
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
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-title>{{ person.name }}</v-card-title>

                    <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>

                        <div class="grey--text ms-4">
                        4.5 (413)
                        </div>
                        
                    </v-row>

                    <div class="my-4 text-subtitle-1 text-left">
                        {{ person.company }}
                    </div>

                    <div class="black--text">{{ person.desc }}</div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>


                    <v-card-actions class="justify-center">
                    <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="reserve"
                    >
                        Contact
                    </v-btn>
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
                {name: 'Tom', company:"AIA", contactnum: "91234567", desc: "I specialize in saving plans", profilepic:"../assets/kind1.jpg"},
                {name: 'Harry', company:"Standard Chartered", contactnum: "91234567", desc: "I love sharing about health insurance", profilepic:"../assets/kind2.jpg"},
                {name: 'Gary', company:"AIA", contactnum: "91234567", desc: "I help people when they are treated unfairly", profilepic:"../assets/kind3.jpg"},
                {name: 'Brandon', company:"Prudential", contactnum: "91234567", desc: "Contact me to get a headstart in your finances!", profilepic:"../assets/kind4.jpg"},
                {name: 'Max', company:"AIA", contactnum: "91234567", desc: "Want to know the best techniques? Look no further", profilepic:"../assets/kind5.jpg"},
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