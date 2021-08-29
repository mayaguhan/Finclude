<template>
  <v-app>
    <div id="app">
      <Header />
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </v-app>

</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>

.footer {
  text-align: center;
    clear: both;
    position: relative;
    bottom: 0;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
