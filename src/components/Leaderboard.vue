<template>
  <div class="container">
    <v-progress-linear :indeterminate="true" v-if="loading"
      class="progress">
    </v-progress-linear>

    <v-layout row>
      <v-menu offset-y>
        <v-btn color="primary" dark slot="activator">{{viewed}}</v-btn>
        <v-list>
          <v-list-tile v-for="item in views" :key="item.label" @click="item.clicked()">
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn :loading="loading === 'generate'" @click="generate">Generate New Data</v-btn>
    </v-layout>

    <v-card color="primary darken-2"
      v-if="user" class="user-detail white--text">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <img :src="user.avatar" alt="Profile picture">
          <v-flex>
            <div>
              <v-layout row>
                <div class="headline">{{ user.name }}</div>
                <div class="headline-score">{{ user.daily_score }}</div>
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

    <v-list class="primary white--text" subheader>
      <v-subheader>{{ viewed }}</v-subheader>
      <v-list-tile class="primary white--text" avatar v-for="(user, index) in items" v-bind:key="user.id" @click="selectUser(user)">
        <v-list-tile-action>
          <div class="rank">{{ index + 1 }}</div>
        </v-list-tile-action>
        <v-layout>
          <!-- <v-layout row> -->
            <v-list-tile-avatar>
              <v-tooltip bottom>
                <span>{{ user.name }}</span>
                <img class="score-image" slot="activator" :src="user.avatar">
              </v-tooltip>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="name" v-html="user.name">{{ user.name }}</v-list-tile-title>
            </v-list-tile-content>
          <!-- </v-layout> -->
          <!-- <v-layout row> -->
            <v-list-tile-action class="score">
              {{ user.daily_score }}
              <sup>SEK</sup>
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
          </v-layout>
        <!-- </v-layout> -->
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Leaderboard',
  methods: {
    startLoading (value) {
      this.loading = value || true
    },
    stopLoading () {
      this.loading = false
    },
    handleError (err) {
      this.err = err
      this.stopLoading()
    },
    fetchLeaderboard () {
      this.startLoading('leaderboard')
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
      this.startLoading('users')
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
      this.startLoading('scoreless')
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
      this.startLoading('user')
      axios.get(this.apiUrl + 'users/' + user.id)
        .then(res => {
          this.user = res.data.user
          this.user.scores = res.data.scores
          this.stopLoading()
        }, err => {
          this.handleError(err)
        })
    },
    generate () {
      this.startLoading('generate')
      axios.post(this.apiUrl + 'regenerate_scores', { score_count: this.score_count })
        .then(res => {
          this.leaderboard = res.data
          this.items = this.leaderboard
          this.viewed = 'Leaderboard'
          this.user = null
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
      apiUrl: 'https://saleskick-task-server.herokuapp.com/',
      items: [],
      leaderboard: [],
      users: [],
      scoreless: [],
      user: null,
      views: [
        { label: 'Leaderboard', clicked: this.fetchLeaderboard },
        { label: 'Scoreless', clicked: this.fetchScoreless },
        { label: 'All Users', clicked: this.fetchUsers }
      ],
      viewed: '',
      score_count: 50,
      err: null,
      loading: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.container {
  @include xs {
    padding: 0;
  }
}
.progress {
  position: absolute;
  @include gt-xs {
    top: 50px;
  }
  @include xs {
    top: 42px;
  }
  left: 0;
  width: 100%;
}
.rank {
  text-align: center;
  width: 100%;
  @include gt-xs {
    font-size: 28px;
    margin-right: 10px;
  }
}
.score {
  @include gt-xs {
    font-size: 48px;
    margin-right: 35px;
    sup {
      font-size: 15px;
      top: -3.5em;
      left: 2em;
    }
  }
}
.name {
  @include gt-xs {
    font-weight: bold;
    font-size: 24px;
  }
  @include xs {
    display: none;
  }
}
.user-detail {
  padding: 15px;
  margin-bottom: 15px;
  img {
    border-radius: 50%;
    padding: 1px;
    border: 2px solid;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
    @include gt-xs {
      margin: 15px 30px;
      height: 125px;
      width: 125px;
    }
    @include xs {
      height: 50px;
      width: 50px;
      margin-right: 15px;
    }
  }
}
.headline {
  font-weight: bold;
  margin-right: 15px;
}
.headline-score {
  font-weight: bold;
  line-height: 30px;
  @include gt-xs {
    margin-left: 20px;
    font-size: 45px;
  }
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
.score-image {
  @include xs {
    margin-top: 15px;
  }
}
</style>
