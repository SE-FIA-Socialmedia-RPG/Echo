<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Post from '~/components/Post.vue'

export default defineComponent({
  components: {
    Post
  },
  setup() {
    const posts = ref([])

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/users/feed') 
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        posts.value = data
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    onMounted(() => {
      fetchPosts()
    })

    return {
      posts
    }
  }
})
</script>

<template>
  <UContainer>
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
      <br>
      <br>
    </div>
  </UContainer>
</template>

<style>
img {
  width: 100%;
  max-width: 100%;
  height: auto;
}

.rightAlign {
  text-align: right;
}

.outlined-image {
  outline-style: outset;
  outline-color: #cccccc;
  outline-width: 3px;
  outline-offset: 0px;
}
</style>