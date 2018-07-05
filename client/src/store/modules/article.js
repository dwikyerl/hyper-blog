import axios from '@/axios'
import cloneDeep from 'lodash.clonedeep'
import router from '../../router'

const state = {
  articles: [],
  currentArticle: JSON.parse(window.localStorage.getItem('hyper_article') || null)
}

const getters = {
  articles: state => [...state.articles],
  userArticles: (state, getters, rootState) => {
    const { id } = rootState.user
    return state.articles.filter((article) => {
      return article.author._id === id
    })
  },
  currentArticle: state => cloneDeep(state.currentArticle)
}

const mutations = {
  setArticles (state, articles) {
    state.articles = articles
  },
  addArticle (state, article) {
    state.articles = [...state.articles, article]
  },
  updateArticle (state, addedArticle) {
    state.articles = state.articles.map((article) => {
      if (article._id === addedArticle._id) return addedArticle
      return article
    })
  },
  deleteArticle (state, articleId) {
    state.articles = state.articles.filter((article) => {
      return article._id !== articleId
    })
  },
  setCurrentArticle (state, article) {
    state.currentArticle = article
  }
}

const actions = {
  async fetchArticles ({ commit }) {
    try {
      const { data } = await axios.get('/articles')
      commit('setArticles', data.articles)
    } catch (e) {
      console.log(e.response)
    }
  },
  async fetchArticleById ({ commit }, articleId) {
    try {
      const { data } = await axios.get(`/articles/${articleId}`)
      if (data.article) {
        commit('setCurrentArticle', data.article)
      } else {
        this._vm.$toast.open({
          duration: 1000,
          message: 'Article not found',
          type: 'is-danger'
        })
        router.push({ name: 'home' })
      }
    } catch (e) {
      console.log(e.response)
    }
  },
  changeCurrentArticle ({ commit }, article) {
    commit('setCurrentArticle', article)
    window.localStorage.setItem('hyper_article', JSON.stringify(article))
  },
  async changeCurrentArticleById ({ commit, getters }, articleId) {
    const { articles } = getters
    const targetArticle = articles.filter((article) => {
      return article._id === articleId
    })[0]
    if (targetArticle) {
      commit('setCurrentArticle', targetArticle)
      window.localStorage.setItem('hyper_article', JSON.stringify(targetArticle))
    } else {
      this._vm.$toast.open({
        duration: 1000,
        message: 'Article not found',
        type: 'is-danger'
      })
      router.push({ name: 'home' })
    }
  },
  async postArticle ({ commit, rootState }, articleData) {
    try {
      const { data } = await axios.post('/articles', articleData)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Article created successfully',
        type: 'is-success'
      })
      commit('updateArticle', data.article)
      router.push({ name: 'home' })
    } catch (e) {
      console.log(e.response)
    }
  },
  async editArticle ({ commit }, { updateData, articleId }) {
    try {
      const { data } = await axios.put(`/articles/${articleId}`, updateData)
      commit('updateArticle', data.article)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Article updated successfully',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to update article',
        type: 'is-danger'
      })
    }
    router.push({ name: 'home' })
  },
  async deleteArticle ({ commit }, articleId) {
    try {
      const { data } = await axios.delete(`/articles/${articleId}`)
      commit('deleteArticle', data.deletedArticle._id)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Article Deleted successfully',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to delete article',
        type: 'is-danger'
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
