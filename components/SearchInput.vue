<script setup lang="ts">
import { ref, computed } from 'vue'
import { UContainer, UCard, UButton, UDropdown } from '#components'
import CommunitySearchResults from '~/components/SearchResults/CommunitySearchResults.vue'
import UserSearchResults from '~/components/SearchResults/UserSearchResults.vue'
import PostSearchResults from '~/components/SearchResults/PostSearchResults.vue'

const searchInput = ref('')
const communities = ref([])
const users = ref([])
const posts = ref([])
const selectedTab = ref(1)

const items = [{
  label: 'Users',
  icon: 'i-heroicons-information-circle',
  key: 0
}, {
  label: 'Communities',
  icon: 'i-heroicons-arrow-down-tray',
  key: 1
}, {
  label: 'Posts',
  icon: 'i-heroicons-eye-dropper',
  key: 2
}]

const handleSearchClick = async () => {
 
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

const selectedContent = computed(() => {
  const selectedItem = items.find(item => item.key === selectedTab.value)
  console.log('Selected Tab:', selectedTab.value)  // Überprüfe die Änderungen der selectedTab-Variable
  console.log('Selected Item:', selectedItem)  // Überprüfe das ausgewählte Item
  return selectedItem ? selectedItem.key : ''
})
// Überwache die Änderungen der selectedTab-Variable
watch(selectedTab, (newVal, oldVal) => {
  console.log(`Tab changed from ${oldVal} to ${newVal}`)
})
</script>

<template>
  <UContainer>
    <UCard class="w-full">
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
          </div>   
        </div>
      </template> 
    </UCard>
    <UTabs v-model="selectedTab" :items="items">
      <template #item="{ item }" class="w-full">
        <div v-if="selectedContent === 0">
        <UserSearchResults :users="users" />
        </div>
        <div v-if="selectedContent === 1">
        <CommunitySearchResults :communities="communities" />
        </div>
        <div v-if="selectedContent === 2">
        <PostSearchResults :posts="posts" />
        </div>
      </template>
    </UTabs>
  </UContainer>
</template>