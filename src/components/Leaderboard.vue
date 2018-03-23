<template>
  <div class="container">
    <v-progress-linear :indeterminate="true" v-if="loading">
    </v-progress-linear>

    <v-layout row>
      <v-btn @click="fetchLeaderboard">Leaderboard</v-btn>
      <v-btn @click="fetchUsers">All Users</v-btn>
      <v-btn @click="fetchScoreless">Scoreless</v-btn>
    </v-layout>

    <v-card color="primary darken-2"
      v-if="user" class="user-detail white--text">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <img :src="user.avatar" alt="Profile picture"
            height="125px"
            width="125px">
          <v-flex>
            <div>
              <v-layout row>
                <div class="headline">{{ user.name }}</div>
                <div>{{ user.daily_score }}</div>
              </v-layout>
              <v-layout column>
                <ul class="user-score">
                  <li v-for="score in user.scores" v-bind:key="score.id">
                    <v-layout row>
                      <v-icon v-if="score.value < 0"
                        :color="'red'">
                        arrow_downward
                      </v-icon>
                      <v-icon v-if="score.value > 0"
                        :color="'green'">
                        arrow_upward
                      </v-icon>
                      <strong>{{ score.value }}</strong>
                      <span>{{ score.created_at | moment('from', 'now') }}</span>
                    </v-layout>
                  </li>
                </ul>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-list subheader>
      <v-subheader>{{ viewed }}</v-subheader>
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
            <v-icon v-if="user.latest_score < 0"
              :color="'red'">
              arrow_downward
            </v-icon>
            <v-icon v-if="user.latest_score > 0"
              :color="'green'">
              arrow_upward
            </v-icon>
            <span>{{ user.latest_score }}</span>
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
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
    handleError(err) {
      this.err = err
      this.stopLoading()
    },
    fetchLeaderboard () {
      this.startLoading()
      axios.get(this.apiUrl + 'scores')
        .then(res => {
          this.leaderboard = res.data
          this.items = this.leaderboard
          this.viewed = 'Leaderboard'
          this.stopLoading()
        }, err => {
          this.handleError(err)
        })
    },
    fetchUsers () {
      this.startLoading()
      axios.get(this.apiUrl + 'users')
        .then(res => {
          this.users = res.data
          this.items = this.users
          this.viewed = 'All Users'
          this.stopLoading()
        }, err => {
          this.handleError(err)
        })
    },
    fetchScoreless () {
      this.startLoading()
      axios.get(this.apiUrl + 'scoreless')
        .then(res => {
          this.scoreless = res.data
          this.items = this.scoreless
          this.viewed = 'Scoreless'
          this.stopLoading()
        }, err => {
          this.handleError(err)
        })
    },
    selectUser (user) {
      this.user = user
      axios.get(this.apiUrl + 'users/' + user.id)
        .then(res => {
          this.user = res.data.user
          this.user.scores = res.data.scores
          this.stopLoading()
        }, err => {
          this.handleError(err)
        })
    }
  },
  created () {
    this.fetchLeaderboard()
  },
  data () {
    return {
      // apiUrl: 'https://saleskick-task-server.herokuapp.com/',
      apiUrl: 'http://localhost:3000/',
      items: [],
      leaderboard: [],
      users: [],
      scoreless: [],
      user: null,
      viewed: '',
      err: null
      // id, name, avatar, daily_score, daily_score_count, latest_score
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
.user-detail {
  margin-bottom: 15px;
  img {
    border-radius: 50%;
    margin: 15px 30px;
    padding: 1px;
    border: 2px solid;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
  }
}
.headline {
  font-weight: bold;
}
.user-score {
  list-style: none;
  li {
    padding: 10px;
    strong {
      padding: 0 5px;
      width: 50px;
    }
  }
}
</style>
