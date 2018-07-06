<template>
  <nav
    class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" :to="{ name: 'home' }">
          <b-icon icon="note-text"></b-icon>
          <span class="is-size-4">HyperBlog</span>
        </router-link>

        <a
          role="button"
          class="navbar-burger"
          @click="toggleBurger"
          :class="{ 'is-active': isBurgerActive }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        class="navbar-menu"
        :class="{ 'is-active': isBurgerActive }">

        <div v-if="!isLoggedIn" class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link :to="{ name: 'login' }" class="button is-light">
                  <b-icon icon="login-variant"></b-icon>
                  <span>Login</span>
                </router-link>
              </p>
              <p class="control">
                <router-link :to="{ name: 'signup' }" class="button is-info">
                  <b-icon icon="account-plus"></b-icon>
                  <span>Sign Up</span>
                </router-link>
              </p>
            </div>
          </div>
        </div>

        <div v-else class="navbar-end">
          <router-link
          v-if="username"
          :to="{ name: 'user-articles', params: { username } }"
          class="navbar-item">
            <b-icon icon="view-list"></b-icon>
            <span>My Articles</span>
          </router-link>
          <router-link :to="{ name: 'post' }" class="navbar-item">
            <b-icon icon="message-text"></b-icon>
            <span>Post</span>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Account
            </a>
            <div class="navbar-dropdown is-right">
              <div class="navbar-item">
                <p>Signed in as <strong>{{ username}}</strong></p>
              </div>
              <hr class="navbar-divider">
              <a @click.prevent="logout" class="navbar-item">
                <b-icon icon="logout"></b-icon>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('user', ['username']),
    ...mapGetters(['isBurgerActive'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['toggleBurger'])
  }
}
</script>

<style lang="scss">
.navbar.is-white {
  background: #f0f2f4;
}
.navbar-brand .brand-text {
  font-size: .8rem;
  font-weight: bold;
}
</style>
