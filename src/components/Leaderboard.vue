<template>
  <div class="container">
    <v-progress-linear :indeterminate="true" v-if="loading">
    </v-progress-linear>
    <v-layout row>
      <v-btn @click="fetchLeaderboard">Leaderboard</v-btn>
      <v-btn @click="fetchUsers">All Users</v-btn>
      <v-btn @click="fetchScoreless">Scoreless</v-btn>
    </v-layout>
    <!-- Sorting?? -->
    <v-list subheader>
      <v-subheader>Today's Leaderboard</v-subheader>

      <v-list-tile avatar v-for="(user, index) in items" v-bind:key="user.id" @click="selectUser(user)">
        <v-list-tile-action>
          <div class="rank">{{ index + 1 }}</div>
        </v-list-tile-action>
        <v-list-tile-avatar>
          <img :src="user.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.name">{{ user.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action class="score">
          {{ user.daily_score }}
        </v-list-tile-action>
        <v-list-tile-action>
          <v-layout row>
            <v-icon v-if="user.latest_change < 0"
              :color="'red'">
              arrow_downward
            </v-icon>
            <v-icon v-if="user.latest_change > 0"
              :color="'green'">
              arrow_upward
            </v-icon>
            <span>{{ user.latest_change }}</span>
          </v-layout>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Leaderboard',
  methods: {
    fetchLeaderboard () {
      this.loading = true
      axios.get(this.apiUrl + 'scores')
        .then(res => {
          this.leaderboard = res.data
          this.items = this.leaderboard
          this.loading = false
        }, err => {
          this.err = err
          this.loading = false
        })
    },
    fetchUsers () {
      this.loading = true
      axios.get(this.apiUrl + 'users')
        .then(res => {
          this.users = res.data
          this.loading = false
          this.items = this.users
        }, err => {
          this.err = err
          this.loading = false
        })
    },
    fetchScoreless () {
      this.loading = true
      axios.get(this.apiUrl + 'scoreless')
        .then(res => {
          this.scoreless = res.data
          this.loading = false
          this.items = this.scoreless
        }, err => {
          this.err = err
          this.loading = false
        })
    },
    selectUser (user) {
      this.user = user
    }
  },
  created () {
    this.fetchLeaderboard()
  },
  data () {
    return {
      apiUrl: 'https://saleskick-task-server.herokuapp.com/',
      items: [],
      leaderboard: [],
      users: [],
      scoreless: [],
      user: null,
      err: null
      // id, name, avatar, daily_score, daily_score_count, latest_change
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
  text-align: center;
  width: 100%;
  font-size: 28px;
  margin-right: 10px;
}
.score {
  font-size: 48px;
}
</style>
