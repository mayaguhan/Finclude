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