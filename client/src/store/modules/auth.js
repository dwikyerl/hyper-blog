import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp from './../../firebase'
import axios from '@/axios'
import router from './../../router'

const state = {
  token: window.localStorage.getItem('hyper_token') || null
}

const getters = {
  isLoggedIn: state => state.token !== null
}

const mutations = {
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  logout ({ commit, dispatch }) {
    commit('setToken', null)
    window.localStorage.removeItem('hyper_token')
    dispatch('user/resetUserData', null, { root: true })
    commit('setIsBurgerActive', false, { root: true })
    this._vm.$toast.open({
      duration: 1000,
      message: 'Logout successfully',
      type: 'is-info'
    })
    router.push({ name: 'home' })
  },
  async login ({ commit, dispatch }, loginData) {
    try {
      const { data } = await axios.post('/login', loginData)
      commit('setToken', data.token)
      window.localStorage.setItem('hyper_token', data.token)

      await dispatch('user/getUserInfo', null, { root: true })
      router.push({ name: 'home' })
      this._vm.$toast.open({
        duration: 1000,
        message: 'Login in successfully!',
        type: 'is-info'
      })
    } catch (e) {
      console.log(e.response)
      if (e.response) {
        this._vm.$toast.open({
          duration: 1000,
          message: 'Invalid username or password',
          type: 'is-danger'
        })
      }
    }
    // commit('setIsLoginLoading', false, { root: true })
    commit('setIsBurgerActive', false, { root: true })
  },
  async oauthLogin ({ commit, dispatch }, accessToken) {
    try {
      const { data } = await axios.post('/login/oauth', { accessToken })
      commit('setToken', data.token)
      window.localStorage.setItem('hyper_token', data.token)
      await dispatch('user/getUserInfo', null, { root: true })
      this._vm.$toast.open({
        duration: 1000,
        message: 'Login in successfully!',
        type: 'is-info'
      })
      router.push({ name: 'home' })
    } catch (e) {
      if (e.response) {
        this._vm.$toast.open({
          duration: 1000,
          message: 'Can\'t login with Facebook',
          type: 'is-danger'
        })
      }
    }
  },
  authenticateFb ({ dispatch }) {
    const authProvider = new firebase.auth.FacebookAuthProvider()
    authProvider.addScope('email')
    firebaseApp.auth().signInWithPopup(authProvider)
      .then((authData) => {
        dispatch('oauthLogin', authData.credential.accessToken)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
