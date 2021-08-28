<template>
    <v-container style="width: 70%">
        <h1>Let's Get Started!</h1>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-3">

            <v-row class="mb-1">
                <v-col>
                    Choose Your Language
                    <v-select v-model="language" outlined dense @change="updateLang()" :items="lang"></v-select>
                </v-col>
                <v-col>
                    Choose Your Preferred Currency
                    <v-select v-model="chosenCurrencyLong" outlined dense @change="updateCurrency()" :items="currencyList"></v-select>
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

            <h2>Current Financial Information</h2>
            <v-row class="mt-1 mb-1">
                <v-col>
                    Current Salary ({{ chosenCurrency }})
                    <v-text-field v-model="salary" outlined dense @change="updateSavings()" type="number"></v-text-field>
                </v-col>
                <v-col>
                    Expected Monthly Expenditure ({{ chosenCurrency }})
                    <v-text-field v-model="estimatedMonthly" outlined @change="updateSavings()" dense type="number"></v-text-field>
                </v-col>
                <v-col>
                    Estimated Monthly Savings ({{ chosenCurrency }})
                    <v-text-field :placeholder="estimatedSavings" outlined dense disabled type="number"></v-text-field>
                </v-col>
            </v-row>

            <h2>Personal Financial Goals</h2>
            <v-row class="mt-1 mb-1">
                <v-col>
                    How much do you want to save?
                    <v-text-field v-model="savingGoal" outlined dense @change="displayMessage()" type="number"></v-text-field>
                </v-col>
                <v-col>
                    When do you want to achieve this goal? [In Years]
                    <v-text-field v-model="duration" outlined dense type="number" @change="displayMessage()"></v-text-field>
                </v-col>
            </v-row>

            <div :style="styleObject">
                You need to save {{ chosenCurrency }}{{ monthlyRecommended }} per month and {{ chosenCurrency }}{{ weeklyRecommended }} per week! With Finclude, we will help you achieve your goals and deepen your knowledge in managing your finances.
            </div>

            <v-row class="mt-3">
                <v-col
                    cols="12"
                >
                    Personal Description
                    <v-textarea
                    solo
                    name="input-7-4"
                    class="mt-3"
                    placeholder="Please tell us more about yourself and your concerns..."
                    v-model="bio"
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
            lang: [
            "English",
            "Tamil",
            "Malay",
            "Chinese",
            "Tagalog",
            "Bengali",
            "Bahasa Indonesia"
            ],
            language: "",
            chosenCurrencyLong: "",
            chosenCurrency: "$",
            currencyList: [
                "Singapore Dollars - $",
                "Malaysian Ringitt - MYR",
                "Indonesian Rupiah - Rp",
                "Indian Rupees - INR"
            ],
            firstName: "",
            lastName: "",
            salary: 0,
            estimatedMonthly: 0,
            estimatedSavings: 0,
            savingGoal: 0,
            duration: 0,
            monthlyRecommended: 0,
            weeklyRecommended: 0,
            styleObject: {
                color: "#5D35E5",
                display: "none"
            },
            bio: ""

        }
    },
    methods: {
        updateCurrency() {
            var currArray = this.chosenCurrencyLong.split("-");
            this.chosenCurrency = currArray[1].slice(1, currArray[1].length);
        },
        updateSavings() {
            this.estimatedSavings = this.salary - this.estimatedMonthly;
        },
        displayMessage() {

            if (this.duration != 0 && this.savingGoal != 0){
                var months = this.duration*12;
                var weeks = this.duration*52;
                this.monthlyRecommended = (this.savingGoal / months).toFixed(2);
                this.weeklyRecommended = (this.savingGoal / weeks).toFixed(2);
                this.styleObject.display = "block";
            }
        },
        submitForm() {
            // Function to create new user
            var id = Math.floor((Math.random()*1000000)+1).toString();

            var userObj = {
                "id": id,
                "firstName" : this.firstName,
                "prefCurrency": this.chosenCurrency,
                "monExpenditure": this.estimatedMonthly,
                "lastName": this.lastName,
                "bio": this.bio,
                "salary": this.salary,
                "goal": this.savingGoal,
                "lang": this.language,
                "yearsToGoal": this.yearsToGoal,
                "advisorId": "000000",
                "monSavings": this.monSavings,
                "tags": "newUser"
            }

            axios.put("https://vir9lpv010.execute-api.us-east-1.amazonaws.com/production/users", userObj)
                .then(response => {
                    console.log(response);
                })


            // Updat vuex store
            this.$store.commit("setUser", this.firstName);
            this.$store.commit("setLogin", 1);

            // If success, redirect
            this.$router.push('/homepage');
        }
    },
    created() {
        //
    }

}
</script>

<style>

</style>