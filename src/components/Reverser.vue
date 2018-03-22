<template>
  <div class="container">
    <h1>Reverser</h1>
    <input v-model="message">
    <h4>{{ reversed }}</h4>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reverser',
  data () {
    return {
      message: 'Reverse This...',
      reversed: 'output',
      apiUrl: 'https://saleskick-task-server.herokuapp.com/reverser'
    }
  },
  methods: {
    reverse () {
      axios.post(this)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>