<script setup lang="ts">
import { defineProps } from 'vue'
import { UContainer, UCard, UAvatar } from '#components'
import ProfileAvatar from '~/components/ProfileAvatar.vue'

const props = defineProps<{
  users: User[]
}>()

const noResults = ref(false) 

watch(() => props.users, (newVal) => {
  noResults.value = newVal.length === 0
}, { immediate: true }) //noResults is True when no communites are in the array

interface User {
  id: number
  username: string
  xp: number
  profileImage?: {
    id: number
  }
  bio: string
}
</script>

<template>
  <UContainer>
    <UCard class="w-full">
      <template #header>
        <div class="h-10">
          <p class="text-xl">Users</p>
          <div class="flex justify-end items-center"></div>
        </div> 
      </template>
      <template #footer>
        <div v-if="noResults" class="text-center text-gray-500">
            No users found.
        </div>
        <div v-if="!noResults" class="space-y-4 overflow-y-auto p-2 h-96">
          <UCard
            class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
            v-for="user in users"
            :key="user.id"
            :ui="{base: 'cursor-pointer'}" @click="navigateTo(`/profiles/${user.id}`)">
          <template #header>
          <div class="text-2xl">{{ user.username }}</div>
          </template>
            <template #footer>
              <div>
                <ProfileAvatar
                  v-if="user?.profileImage"
                  :src="`/api/images/${user.profileImage.id}`"
                />
                <p>{{ user.bio }}</p>
              </div>
            </template>
          </UCard>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>