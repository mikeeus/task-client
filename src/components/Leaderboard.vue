<template>
  <div class="container">
    <v-list subheader>
      <v-subheader>Today's Leaderboard</v-subheader>
      <v-progress-linear :indeterminate="true" v-if="loading">
      </v-progress-linear>
      <v-list-tile avatar v-for="(item, index) in items" v-bind:key="item.id" @click="clicked">
        <v-list-tile-action>
          <div class="rank">{{ index + 1 }}</div>
        </v-list-tile-action>
        <v-list-tile-avatar>
          <img :src="item.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.name">{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action class="score">
          {{ item.daily_score }}
        </v-list-tile-action>
        <v-list-tile-action>
          <v-layout row>
            <v-icon v-if="item.latest_change < 0"
              :color="'red'">
              arrow_downward
            </v-icon>
            <v-icon v-if="item.latest_change > 0"
              :color="'green'">
              arrow_upward
            </v-icon>
            <span>{{ item.latest_change }}</span>
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
    fetchData () {
      axios.get(this.apiUrl)
        .then(res => {
          this.items = res.data
          this.loading = false
        }, err => {
          this.err = err
          this.loading = false
        })
    },
    clicked () {
      console.log('clicked')
    }
  },
  created () {
    this.loading = true
    this.fetchData()
  },
  data () {
    return {
      apiUrl: 'https://saleskick-task-server.herokuapp.com/scores',
      items: [],
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
