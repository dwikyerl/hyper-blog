<template>
  <div id="app">
    <v-appheader></v-appheader>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    'v-appheader': AppHeader
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('user', ['getUserInfo'])
  },
  created () {
    if (this.isLoggedIn) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="scss">
span.icon {
  margin-right: .25rem;
  margin-left: 0;
}
</style>
