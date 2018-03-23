<template>
  <div class="container">
    <h1>Reverser</h1>
    <v-layout row>
      <v-text-field
        name="reverser"
        label="Type something"
        v-model="message"
        id="reverser"
        @keyup.enter="reverse"
        :disabled="loading">
      </v-text-field>
      <v-btn @click="reverse" :loading="loading">
        Reverse!
      </v-btn>
    </v-layout>
    <!-- <v-btn @click="reverse">Reverse!</v-btn> -->
    <v-layout row class="result">
      <h3>Reversed</h3>
      <div>{{ reversed.message }}</div>
    </v-layout>
    <v-layout row class="result">
      <h3>Raw</h3>
      <div>{{ reversed }}</div>
    </v-layout>
    <v-layout column>
      <ul>
        <li v-for="item in history" v-bind:key="item">{{ item }}</li>
      </ul>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reverser',
  data () {
    return {
      message: 'Reverse This...',
      reversed: '',
      error: null,
      apiUrl: 'https://saleskick-task-server.herokuapp.com/reverse',
      loading: false,
      history: []
    }
  },
  methods: {
    reverse () {
      this.loading = true
      axios.post(this.apiUrl, { message: this.message })
        .then(res => {
          this.reversed = res.data
          this.history = [this.reversed.original.data, ...this.history]
          this.loading = false
        }, err => {
          this.error = err
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    background: white;
    border-radius: 5px;
    margin-bottom: 15px;
    h3 {
      background: #BDBDBD;
      padding: 10px;
      width: 100px;
    }
    div {
      margin-left: 15px;
      line-height: 44px;
    }
  }
</style>
