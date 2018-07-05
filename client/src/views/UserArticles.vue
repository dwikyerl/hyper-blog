<template>
  <div class="user-articles">
    <section class="hero is-info is-medium is-bold">
      <div class="user-hero hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ username }}'s articles</h1>
        </div>
      </div>
    </section>

    <div v-if="articles" class="container">
      <div class="articles">
        <div class="column is-8 is-offset-2">
          <v-article-card
            v-for="article in userArticles"
            :key="article._id"
            :article="article">
          </v-article-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppArticleCard from '@/components/AppArticleCard'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'user-articles',
  components: {
    'v-article-card': AppArticleCard
  },
  computed: {
    ...mapGetters('article', ['articles']),
    userArticles () {
      const { username } = this.$route.params
      return this.articles.filter((article) => {
        return article.author.username === username
      })
    },
    username () {
      return this.$route.params.username
    }
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
.user-articles {
  background: #F0F2F4;
  min-height: 100vh;
  padding-bottom: 5rem;
}

.user-hero {
  height: 350px;
}

div.column.is-8:first-child {
  padding-top: 0;
  margin-top: 0;
}
</style>
