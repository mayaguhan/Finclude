<template>
    <v-container style="width: 70%">
        <h1>Let's Get Started!</h1>
        <v-form
            ref="form"
            class="mt-3">
            <v-row class="mb-1">
                <v-col>
                    Language
                    <v-select
                        v-model="selectedLang"
                        :items="languages"
                        label="Language"
                        multiple
                        outlined dense
                        >
                        <template v-slot:prepend-item>
                            <v-list-item
                            ripple
                            
                            >
                            <v-list-item-content>
                                <v-list-item-title>
                                Select All
                                </v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                        </v-select>
                </v-col>
                <v-col>
                    Select Your Company
                    <v-select v-model="chosenCompany" label="Company" outlined dense :items="companyList"></v-select>
                </v-col>
            </v-row>

            <h2>Personal Information</h2>
            <v-row class="mt-1 mb-1">
                <v-col>
                    First Name
                    <v-text-field v-model="firstName" placeholder="First Name" outlined dense required></v-text-field>
                </v-col>
                <v-col>
                    Last Name
                    <v-text-field v-model="lastName" placeholder="First Name" outlined dense required></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-1 mb-1">
                <v-col>
                    Contact Number
                    <v-text-field v-model="contactNumber" outlined dense type="number" required placeholder="e.g. 9123 4567"></v-text-field>
                </v-col>
                <v-col>
                    Email
                    <v-text-field v-model="email" outlined dense required placeholder="example@gmail.com"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    Telegram Handle
                    <v-text-field v-model="telegramHandle" placeholder="Telegram ID" outlined dense required></v-text-field>
                </v-col>
                <v-col>
                    LinkedIn URL
                    <v-text-field v-model="linkedIn" placeholder="LinkedIn URL" outlined dense required></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-1 mb-1">
                <v-col
                    cols="12"
                >
                    Personal Description
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder="Write a description about yourself and what you specialize in..."
                    v-model="description"
                    ></v-textarea>
                </v-col>
            </v-row>
            
            <v-btn @click="submitForm()" depressed color="#A300A1" class="mt-3">
                <span style="color: white">SUBMIT</span> 
            </v-btn>
            
        </v-form>
    </v-container>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import axios from 'axios'

  Vue.use(VueRouter)

export default {
    name: "UserForm",
    data() {
        return {
            languages: [
            "English",
            "Tamil",
            "Malay",
            "Chinese",
            "Tagalog",
            "Bengali",
            "Bahasa Indonesia"
            ],
            selectedLang: [],
            checkedLanguages: [],
            chosenCompany: "",
            companyList: [
                "AIA",
                "Prudential",
                "Great Eastern",
            ],
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            styleObject: {
                color: "#5D35E5",
                display: "none"
            },
            description: "",
            telegramHandle: "",
            linkedIn: ""

        }
    },
    methods: {
        submitForm() {
            // Function to create new user

            var id = Math.floor((Math.random()*1000000)+1).toString();

            var proBonoObj = {
                "id" : id,
                "firstName": this.firstName,
                "lastName": this.lastName,
                "rating": 0,
                "experience": this.description,
                "linkedinUrl": this.linkedIn,
                "teleHandle": this.telegramHandle,
                "contactNumber": this.contactNumber,
                "email": this.email,
                "languages": this.selectedLang.toString(),
                "tags": "newAgent"
            }

            axios.put("https://sg7f8ajqok.execute-api.us-east-1.amazonaws.com/production/agents", proBonoObj)
                .then(response => {
                    console.log(response);
                })


            // Update vuex store
            this.$store.commit("setUser", this.firstName);
            this.$store.commit("setAgent", 1);
            this.$store.commit("setLogin", 1);
            

            // If success, redirect
            this.$router.push('/homepage');
        }
    },
    computed: {
        //
    },
    created() {
        //
    }

}
</script>

<style>

</style>