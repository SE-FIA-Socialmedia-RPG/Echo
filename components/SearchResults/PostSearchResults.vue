<script setup lang="ts">
import { defineProps } from 'vue'
import { UContainer, UCard, UAvatar } from '#components'
import ProfileAvatar from '~/components/ProfileAvatar.vue'
import LikeButton from '~/components/LikeButton.vue'

const props = defineProps<{
  posts: Post[]
}>()

const noResults = ref(false) 

watch(() => props.posts, (newVal) => {
  noResults.value = newVal.length === 0
}, { immediate: true }) //noResults is True when no communites are in the array

interface Post {
  id: number
  text: string
  title: string
  _count: {
    likes: number
  }
  Image?: {
    path: string
  }
}
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="h-10">
          <p class="text-xl">Posts</p>
          <div class="flex justify-end items-center"></div>
        </div> 
      </template>
      <template #footer>
        <div v-if="noResults" class="text-center text-gray-500">
            No posts found.
        </div>
        <div v-if="!noResults" class="space-y-4 overflow-y-auto p-2 h-96">
          <UCard
            class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
            v-for="post in posts"
            :key="post.id">
          <template #header>
          <div class="text-2xl">{{ post.title }}</div>
          </template>
            <template #footer>
              <div>
                <ProfileAvatar
                  v-if="post?.Image"
                  :src="post.Image.path"
                />
                <p>{{ post.text }}</p>
                <LikeButton
                    :postId="post.id"
                    :initialLikeCount="post._count.likes"
                    :initiallyLiked="false"
                />
              </div>
            </template>
          </UCard>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>