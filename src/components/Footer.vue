<template>
    <v-footer
      padless
      class="mt-10"
    >
      <v-card
        flat
        tile
        width="100%"
        class="purple darken-3 text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
            Join us in taking steps towards the greater good! Use Finclude!
            <br>
            <v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }} — <strong>Tinman Sachs</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>


<script>
export default {
    name: "Footer",
    data() {
        return {
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
                'mdi-github'
            ],
        }
    }
}
</script>