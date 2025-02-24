<script setup lang="ts">
import type {User} from '@prisma/client'

type Props = {
    user: User & {
        profileImage?: {
            id: number
        }
    }
}

defineProps<Props>()
</script>

<template>
    <UCard
        :key="user.id"
        :ui="{base: 'cursor-pointer'}"
        @click="navigateTo(`/profiles/${user.id}`)"
    >
        <template #header>
            <div class="text-2xl">{{ user.username }}</div>
        </template>

        <div class="flex gap-4 items-center">
            <UAvatar
                size="xl"
                :src="(user.profileImageId) ? `/api/images/${user.profileImageId}` : undefined"
                alt="Profilbild"
            />
            <p class="grow">{{ user.bio }}</p>
        </div>
    </UCard>
</template>
