<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      class="grey lighten-4"
      app
      v-model="drawer">
      <v-list
        dense
        class="grey lighten-4">
        <v-list-tile>
          <v-list-tile-content>
            <router-link to="/">Leaderboard</router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <router-link to="/reverser">Reverser</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <img src="./assets/logo.png" width="100px">
      <span class="title ml-3 mr-5">Mikias Abera</span>
      <v-spacer></v-spacer>
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
.application .theme--light.list, .theme--light .list {
  background: rgba(25, 118, 210, 0.87);
}
.application .theme--light.list .list__tile:not(.list__tile--active), .theme--light .list .list__tile:not(.list__tile--active) {
  border-bottom: 2px solid rgba(255, 255, 255, 0.25);
  color: white;
  @include gt-xs {
    padding: 15px;
    height: 90px;
  }
}
ul.application .theme--light.list, .theme--light .list {
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
}
</style>
