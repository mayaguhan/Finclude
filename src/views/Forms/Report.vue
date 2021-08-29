<template>
    <v-container style="width: 70%">
        <h1>Alert a legal!</h1>
        <v-row class="mb-1 mt-3">
            <v-col>
                Agent Name
                <v-text-field :placeholder="user" outlined dense disabled></v-text-field>
            </v-col>
            <v-col>
                Client Name
                <v-text-field v-model="clientName" outlined dense></v-text-field>
            </v-col>
        </v-row>

        <v-row class="mt-1">
            <v-col
                cols="12"
            >
                Description of incident
                <v-textarea
                solo
                name="input-7-4"
                class="mt-3"
                placeholder="Please explain the reason for the report clearly..."
                v-model="description"
                ></v-textarea>
            </v-col>
        </v-row>


        <v-btn @click="submitForm()" depressed color="#A300A1" class="mt-3">
            <span style="color: white">SUBMIT</span> 
        </v-btn>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Report",
    data() {
        return {
            clientName: ""
        }
    },
    methods: {
        submitForm() {
            // Function to send email

            const sgMail = require('@sendgrid/mail')
            var api = this.$store.state.SGAPIKEY;
            sgMail.setApiKey(api)

            const msg = {
            to: 'rafe.ang@gmail.com', // Change to your recipient
            from: 'enterprise.solution.management@gmail.com', // Change to your verified sender
            subject: 'Consultation regarding client',
            text: 'I want to consult something regarding my client.',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            }

            sgMail
                .send(msg)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    },
    computed: {
        ...mapState({
            user: (state) =>state.user
        })
    },
    created() {
        //
    }
}
</script>

<style>

</style>