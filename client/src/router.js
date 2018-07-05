import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => {
  require.ensure(['./views/Home.vue'], () => {
    resolve(require('./views/Home.vue'))
  }, 'home')
}

const Signup = resolve => {
  require.ensure(['./views/Signup.vue'], () => {
    resolve(require('./views/Signup.vue'))
  }, 'signup')
}

const Login = resolve => {
  require.ensure(['./views/Login.vue'], () => {
    resolve(require('./views/Login.vue'))
  }, 'login')
}

const Post = resolve => {
  require.ensure(['./views/Post.vue'], () => {
    resolve(require('./views/Post.vue'))
  }, 'post')
}

const UserArticles = resolve => {
  require.ensure(['./views/UserArticles.vue'], () => {
    resolve(require('./views/UserArticles.vue'))
  }, 'user-articles')
}

const CategoryArticles = resolve => {
  require.ensure(['./views/CategoryArticles.vue'], () => {
    resolve(require('./views/CategoryArticles.vue'))
  }, 'category-articles')
}

const Edit = resolve => {
  require.ensure(['./views/Edit.vue'], () => {
    resolve(require('./views/Edit.vue'))
  }, 'edit')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('hyper_token')) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('hyper_token')) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('hyper_token')) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/users/:username',
      name: 'user-articles',
      component: UserArticles
    },
    {
      path: '/:category/articles',
      name: 'category-articles',
      component: CategoryArticles
    },
    {
      path: '/articles/:articleId/edit',
      name: 'edit-article',
      component: Edit,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('hyper_token')) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    }
  ],
  linkExactActiveClass: 'is-active'
})
