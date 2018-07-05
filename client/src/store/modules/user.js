import axios from '@/axios'

const state = {
  userId: '',
  username: '',
  email: ''
}

const getters = {
  username: state => state.username,
  email: state => state.email,
  userId: state => state.userId
}

const mutations = {
  setId (state, userId) {
    state.userId = userId
  },
  setUsername (state, username) {
    state.username = username
  },
  setEmail (state, email) {
    state.email = email
  }
}

const actions = {
  async signup ({ dispatch }, signupData) {
    try {
      const { data } = await axios.post('/users/signup', signupData)

      const userData = {
        username: signupData.username,
        password: signupData.password
      }

      this._vm.$toast.open({
        duration: 1000,
        message: data.message,
        type: 'is-info'
      })

      dispatch('auth/login', userData, { root: true })
    } catch (e) {
      console.log(e)
      if (e.response) {
        console.log(e.response)
        e.response.data.errors.forEach(error => {
          this._vm.toast.open({
            duration: 1000,
            message: error.msg,
            type: 'is-danger'
          })
        })
      }
    }
  },
  async getUserInfo ({ commit }) {
    const { data } = await axios.get('/users/me')

    commit('setId', data.user.id)
    commit('setUsername', data.user.username)
    commit('setEmail', data.user.email)
  },
  resetUserData ({ commit }) {
    commit('setId', '')
    commit('setUsername', '')
    commit('setEmail', '')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
