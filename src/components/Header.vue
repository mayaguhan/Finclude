<template>
  <div>
    <v-app-bar
      color="cyan accent-4"
      dense
      dark
    >
      <v-toolbar-title>
        <router-link to="/" id="textRouterLink" style="text-decoration: none; color: white">
          <img src="../assets/b8520d9c105e469b92efd98de1d7772d.png" style="height: 80px; margin-top: 10px;">
        </router-link> 
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/about" id="textRouterLink" style="margin-right: 7px">About</router-link>

      <span style="margin-right: 7px">Calculator</span>

      <span>Savings</span>


      <!-- <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    data () {
      return {
        //
      }
    },
    methods: {
        //
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