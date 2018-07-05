<template>
  <div class="home">
    <section class="hero is-info is-medium is-bold">
      <div class="home-hero hero-body">
        <div class="container has-text-centered">
           <div class="has-text-centered">
              <b-icon icon="note-text" custom-size="mdi-48px"></b-icon>
              <span class="home-hero__logo is-size-2">HyperBlog</span>
            </div>
          <h1 class="title">
            Read All Articles From Our Users or Share Your Stories
          </h1>
          <h2 class="subtitle">Find anything you like</h2>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="articles">
        <div class="column is-8 is-offset-2">
          <v-article-card
            v-for="article in articles"
            :key="article._id"
            :article="article">
          </v-article-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import AppArticleCard from '@/components/AppArticleCard'

export default {
  name: 'home',
  components: {
    'v-article-card': AppArticleCard
  },
  computed: {
    ...mapGetters('article', ['articles'])
  },
  methods: {
    ...mapActions('article', ['fetchArticles'])
  },
  created () {
    this.fetchArticles()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.home {
  background: #F0F2F4;
  min-height: 100vh;
  padding-bottom: 5rem;
}

.home-hero {
  background: linear-gradient(
    to right bottom,
    rgba($primary, .9),
    rgba($primary-invert, .5)),
  url('../assets/images/digital-nomad.jpg');
  background-size: cover;
  background-position: center;
  height: 500px;

  &__logo {
    margin-left: .5rem;
  }
}

div.column.is-8:first-child {
  padding-top: 0;
  margin-top: 0;
}
</style>
