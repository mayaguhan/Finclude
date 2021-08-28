<template>
  <div>
    <v-app-bar
      color="#580057"
      dense
      dark
    >
      <v-toolbar-title v-if="login()">
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

      <span class="mr-3" style="font-weight: bold"> Welcome, {{user}}!</span>
      <router-link to="/about" id="textRouterLink" style="margin-right: 7px">About</router-link>
      <router-link to="/calculator" id="textRouterLink" style="margin-right: 7px">Calculator</router-link>
      <router-link to="/savings" id="textRouterLink">Savings</router-link>

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
          // if (this.$store.state.login == 1){
          //   // console.log("HELLO");
          //   return true;
          // }
          // else{
          //   return false;
          // }
          console.log(this.$store.state.login);
          return this.$store.state.login;
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