<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Edit Article</h1>
          <h2 class="subtitle">{{ currentArticle && currentArticle.title }}</h2>
        </div>
      </div>
    </section>
    <v-app-editor v-if="currentArticle" :article="currentArticle"></v-app-editor>
  </div>
</template>

<script>
import AppEditor from '@/components/AppEditor'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: {
    'v-app-editor': AppEditor
  },
  computed: {
    ...mapGetters('article', ['currentArticle'])
  },
  methods: {
    ...mapActions('article', ['changeCurrentArticle', 'fetchArticles', 'changeCurrentArticleById'])
  },
  created () {
    const { articleId } = this.$route.params
    if (!this.currentArticle) {
      this.changeCurrentArticleById(articleId)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.changeCurrentArticle(null)
    next()
  }
}
</script>
