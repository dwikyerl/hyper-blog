<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Write Anything You Like</h1>
          <h2 class="subtitle">Explore yourself</h2>
        </div>
      </div>
    </section>
    <v-app-editor></v-app-editor>
  </div>
</template>

<script>
import AppEditor from '@/components/AppEditor'

export default {
  name: 'Post',
  components: {
    'v-app-editor': AppEditor
  }
}
</script>
