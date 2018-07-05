import firebase from 'firebase/app'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'hyper-blog.firebaseapp.com',
  projectId: 'hyper-blog'
}

const fireabaseApp = firebase.initializeApp(config)

export default fireabaseApp
