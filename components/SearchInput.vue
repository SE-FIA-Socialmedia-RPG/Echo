<script setup lang="ts">
import { ref } from 'vue'
import { UContainer, UCard, UButton, UDropdown } from '#components'
import CommunitySearchResults from '~/components/SearchResults/CommunitySearchResults.vue'
import UserSearchResults from '~/components/SearchResults/UserSearchResults.vue'
import PostSearchResults from '~/components/SearchResults/PostSearchResults.vue'

const searchGo = ref(false)
const searchInput = ref('')
const communities = ref([])
const users = ref([])
const posts = ref([])

const items = [
  [{
    label: 'Option1',
    icon: 'i-heroicons-arrow-right',
    click: () => {
      console.log('Option1')
    }
  }], 
  [{
    label: 'Option2',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      console.log('Option2')
    }
  }]
]

const handleSearchClick = async () => {
  searchGo.value = true
  
  try {
    const [postsResponse, usersResponse, communitiesResponse] = await Promise.all([
      $fetch(`/api/posts/search`, {
        method: 'POST',
        body: {
          query: searchInput.value
        }
      }),
      $fetch(`/api/users/search`, {
        method: 'POST',
        body: {
          query: searchInput.value
        }
      }),
      $fetch(`/api/communities/search`, {
        method: 'POST',
        body: {
          query: searchInput.value
        }
      })
    ])

    console.log('Posts:', postsResponse)
    console.log('Users:', usersResponse)
    console.log('Communities:', communitiesResponse)

    communities.value = communitiesResponse   //hahaa warum bist du rot unterstrichen T___T
    users.value = usersResponse
    posts.value = postsResponse
    return { posts: postsResponse, users: usersResponse, communities: communitiesResponse }
  } catch (error) {
    console.error('Error fetching search:', error)
    throw error
  }
}
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="h-20">
          <p class="text-2xl">Search</p>
          <div class="flex justify-end items-center">
            <input 
              class="border-green-600"
              v-model="searchInput" 
              placeholder="Search for keyword" />
            <UButton
              icon="i-heroicons-magnifying-glass"
              @click="handleSearchClick"
              class="mr-5 ml-5"/>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <UButton color="green" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
            </UDropdown>
          </div>   
        </div>
      </template> 
    </UCard>
    <CommunitySearchResults :communities="communities" />
    <UserSearchResults :users="users" />
    <PostSearchResults :posts="posts" />
  </UContainer>
</template>