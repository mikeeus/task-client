<template>
  <v-app id="inspire">
    <v-toolbar color="primary" app absolute clipped-left>
      <img src="./assets/logo.png" width="100px">
      <span class="title ml-3 mr-5">Mikias Abera</span>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn>Leaderboard</v-btn>
      </router-link>
      <router-link to="/reverser">
        <v-btn>Reverser</v-btn>
      </router-link>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout>
          <v-flex shrink>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: []
    }
  },
  methods: {
    clicked () {
      console.log('clicked')
    }
  }
}
</script>

<style lang="scss">
@import "styles/variables.scss";
@import "styles/fonts.scss";
@import "../node_modules/material-design-icons/iconfont/material-icons.css";

.application {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  color: white;
  font-weight: 900;
}
</style>
