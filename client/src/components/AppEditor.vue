<template>
  <section class="section">
    <div class="container">
      <form @submit.prevent="submitArticle">
        <b-field label="Title">
            <b-input
              v-model="title"
              required>
            </b-input>
        </b-field>

        <b-field label="Category">
            <b-input
              v-model="category"
              required>
            </b-input>
        </b-field>

        <b-field :label="`${article ? 'Update' : '' } Image`">
          <b-upload
            native
            v-model="files"
            type="is-primary"
            accept="image/*"
            drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p v-if="files[0]">{{ files[0].name }}</p>
                <div v-else>
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </div>
            </section>
          </b-upload>
        </b-field>

        <b-field label="Content">
          <vue-editor v-model="content"></vue-editor>
        </b-field>

        <b-field>
          <button
            class="button is-primary is-fullwidth">
            {{ mode }} Article
          </button>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'AppEditor',
  components: {
    VueEditor
  },
  data () {
    return {
      title: '',
      content: '',
      files: [],
      category: ''
    }
  },
  computed: {
    ...mapGetters('article', {
      article: 'currentArticle'
    }),
    mode () {
      return this.article ? 'Edit' : 'Post'
    }
  },
  methods: {
    ...mapActions('article', ['postArticle', 'editArticle', 'fetchArticles']),
    submitArticle () {
      if (this.title.trim() === '' || this.content.trim() === '') {
        return this._vm.$toast.open({
          duration: 1000,
          message: 'Title or Content cannot be empty',
          type: 'is-danger'
        })
      }

      const articleData = new FormData()

      articleData.append('title', this.title)
      articleData.append('content', this.content)
      articleData.append('category', this.category)
      if (this.files.length > 0) {
        articleData.append('image', this.files[0])
      }

      if (this.article) {
        articleData.append('imageUrl', this.article.imageUrl)
        this.submitEditArticle(articleData)
      } else {
        this.submitPostArticle(articleData)
      }
    },
    submitPostArticle (articleData) {
      this.$dialog.confirm({
        title: 'Post Article',
        message: 'Do you want <b>post</b> this article?',
        confirmText: 'Yes',
        type: 'is-primary',
        hasIcon: true,
        onConfirm: () => this.postArticle(articleData)
      })
    },
    submitEditArticle (articleData) {
      this.$dialog.confirm({
        title: 'Updating Article',
        message: 'Are you finished <b>updating</b> this article?',
        confirmText: 'Yes',
        type: 'is-info',
        hasIcon: true,
        onConfirm: () => this.editArticle({
          updateData: articleData,
          articleId: this.article._id
        })
      })
    }
  },
  created () {
    if (this.article) {
      this.title = this.article.title
      this.content = this.article.content
      this.category = this.article.category.description
    }
  }
}
</script>
