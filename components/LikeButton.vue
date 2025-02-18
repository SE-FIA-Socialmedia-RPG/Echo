<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    postId: {
      type: Number,
      required: true
    },
    initialLikeCount: {
      type: Number,
      required: true
    },
    initiallyLiked: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const likePressed = ref(props.initiallyLiked)
    const likeCount = ref(props.initialLikeCount)

    const toggleLike = async () => {
      try {
        if (likePressed.value) {
          // Dislike
          await $fetch(`/api/posts/${props.postId}/like`, {
            method: 'DELETE',
          }).catch((error) => {
            console.error('Error disliking post:', error)
            throw error
          })
          likePressed.value = false
          likeCount.value -= 1
        } else {
          // Like
          await $fetch(`/api/posts/${props.postId}/like`, {
            method: 'POST',
          }).catch((error) => {
            console.error('Error liking post:', error)
            throw error
          })
          likePressed.value = true
          likeCount.value += 1
        }
      } catch (error) {
        console.error('Error toggling like:', error)
      }
    }

    return {
      likePressed,
      likeCount,
      toggleLike
    }
  }
})
</script>

<template>
  <div class="flex items-center space-x-2">
    <UButton
      :icon="likePressed ? 'line-md:heart-filled' : 'line-md:heart'"
      size="xl"
      color="gray"
      :padded="false"
      variant="ghost"
      @click="toggleLike"
    />
    <a class="text-lg font-semibold">{{ likeCount }}</a>
  </div>
</template>