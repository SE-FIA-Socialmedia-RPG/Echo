<script setup lang="ts">
import type {User} from '@prisma/client'

type Props = {
    user: User & {
        profileImageId?: {
            id: number
        }
    }
}

defineProps<Props>()
</script>

<template>
    <UCard
        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
        :key="user.id"
        :ui="{base: 'cursor-pointer'}"
        @click="navigateTo(`/profiles/${user.id}`)"
    >
        <template #header>
            <div class="text-2xl">{{ user.username }}</div>
        </template>

        <div class="flex gap-4">
            <ProfileAvatar
                v-if="user?.profileImageId"
                :src="`/api/images/${user.profileImageId}`"
            />

            <p class="grow">{{ user.bio }}</p>
        </div>
    </UCard>
</template>
