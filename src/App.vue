<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      fixed
      clipped
      class="grey darken-3"
      app
      v-model="drawer">
      <v-list
        dense
        class="grey darken-3">
        <v-list-tile to="/leaderboard">
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">
              Leaderboard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/reverser">
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">
              Reverser
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" app fixed clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <img src="./assets/logo.png" width="100px">
      <span class="title ml-3 mr-5">Mikias Abera</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey darken-3">
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
.application .theme--dark.list, .theme--dark .list {
  background: rgba(25, 118, 210, 0.87);
}
.application .theme--dark.list .list__tile:not(.list__tile--active), .theme--dark .list .list__tile:not(.list__tile--active) {
  color: white;
}
.application .theme--dark.list .list__tile:not(.list__tile--active), .theme--dark .list .list__tile:not(.list__tile--active) {
  border-bottom: 2px solid rgba(255, 255, 255, 0.25);
  color: white;
  @include gt-xs {
    padding: 15px;
    height: 90px;
  }
}
ul.application .theme--dark.list, .theme--dark .list {
  padding: 0;
  border: 0;
  border-radius: 5px;
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
  @include xs {
    margin: 4px 0 0 5px !important;
    font-size: 20px !important;
  }
}
</style>
