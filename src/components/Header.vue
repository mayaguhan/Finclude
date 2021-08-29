<template>
  <div>
    <v-app-bar
      color="purple darken-3"
      dense
      dark
    >
      <v-toolbar-title v-if="agent()">
        <router-link to="/agenthomepage" id="textRouterLink" style="text-decoration: none; color: white">
          <img src="../../public/assets/logo.png" style="height: 80px; margin-top: 10px;">
        </router-link> 
      </v-toolbar-title>

      <v-toolbar-title v-else-if="login()">
        <router-link to="/homepage" id="textRouterLink" style="text-decoration: none; color: white">
          <img src="../../public/assets/logo.png" style="height: 80px; margin-top: 10px;">
        </router-link> 
      </v-toolbar-title>

      <v-toolbar-title v-else>
        <router-link to="/" id="textRouterLink" style="text-decoration: none; color: white">
          <img src="../../public/assets/logo.png" style="height: 80px; margin-top: 10px;">
        </router-link> 
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <span v-if="agent()" class="mr-3" style="font-weight: bold">
        Welcome, Agent {{user}}!
      </span>
      <span v-else class="mr-3" style="font-weight: bold">
        Welcome, {{user}}!
      </span>
      <button @click="logout()" v-if="login()">
        <svg style="width:24px;height:24px" class="mt-1" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
        </svg>
      </button>
      
      <!-- <router-link to="/about" id="textRouterLink" style="margin-right: 7px">About</router-link>
      <router-link to="/calculator" id="textRouterLink" style="margin-right: 7px">Calculator</router-link>
      <router-link to="/savings" id="textRouterLink">Savings</router-link> -->

    </v-app-bar>
  </div>
</template>

<script>

import { mapState } from 'vuex';

  export default {
    name: 'Header',

    data () {
      return {
        //
      }
    },
    methods: {
        login() {
          // console.log(this.$store.state.login);
          return this.$store.state.login;
        },
        logout() {
            // Update login
            this.$store.commit("setUser", "Guest");
            this.$store.commit("setLogin", 0);

            // If agent, set agent to 0
            if (this.$store.state.agent){
              this.$store.commit("setAgent", 0);
            }

            // If success, redirect
            this.$router.push('/');
        },
        agent() {
          if (this.$store.state.login && this.$store.state.agent){
            return true;
          }
          else{
            return false;
          }
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


<style scoped>

#textRouterLink {
  text-decoration: none;
  color: white;
}
  
</style>