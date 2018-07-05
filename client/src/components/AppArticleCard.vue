<template>
  <div class="card article">
    <div class="card-header">
      <p class="card-header-title"></p>
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <a @click.prevent v-if="isArticleOwner" href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <b-icon icon="chevron-down"></b-icon>
            </span>
          </a>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <router-link
            :to="{ name: 'edit-article', params: { articleId: article._id }}"
            class="dropdown-item">
              <div class="control">
                <b-icon icon="pencil" type="is-info"></b-icon>
                <span>Edit</span>
              </div>
            </router-link>
            <a @click.prevent="submitDeleteArticle" class="dropdown-item">
              <div class="control">
                <b-icon icon="delete" type="is-danger"></b-icon>
                <span>Delete</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content has-text-centered">
          <p class="title article-title">{{ article.title }}</p>
          <div class="tags has-addons level-item">
            <span class="tag is-rounded is-info">
              <router-link
                :to="{name: 'user-articles',
                  params: { username: article.author.username }}"
                  class="author-username">
                {{ article.author.username }}
              </router-link>
            </span>
            <span class="tag is-rounded">{{ formattedCreatedDate }}</span>
          </div>
        </div>
      </div>
      <div v-html="article.content" style="white-space: pre-wrap" class="article-content">
      </div>
    </div>
    <div class="card-footer">
      <p class="article-edited">Last edited at {{ formattedEditedDate }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeArticleCard',
  props: {
    article: Object
  },
  computed: {
    ...mapGetters('user', ['userId']),
    isArticleOwner () {
      return this.article.author._id === this.userId
    },
    formattedCreatedDate () {
      return moment(this.article.createdAt).format('DD MMM YYYY')
    },
    formattedEditedDate () {
      return moment(this.article.updatedAt).format('DD MMM YYYY, h:mm:ss a')
    }
  },
  methods: {
    ...mapActions('article', ['deleteArticle']),
    submitDeleteArticle () {
      this.$dialog.confirm({
        title: 'Deleting Article',
        message: 'Are you sure you want to <b>delete</b> this article? This action cannot be undone.',
        confirmText: 'Delete Article',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteArticle(this.article._id)
      })
    }
  }
}
</script>

<style lang="scss">
.articles {
  min-width: 80vw;
  margin-top: -200px;
  &:not(:last-child) {
    margin: 5rem 0;
  }
}

.author-username {
  color: #fff;
}

.article, .promo-block {
  margin-top: 6rem;
}

.article-title {
  font-size: 2rem;
  font-weight: dwikyer;
  line-height: 2;
}
.article-subtitle {
  color: #909AA0;
  margin-bottom: 3rem;
}
.article-content {
  margin: 0 1rem;
}

.article-edited {
  padding: .5rem;
  font-weight: lighter;
  font-size: .8rem;
}
</style>
