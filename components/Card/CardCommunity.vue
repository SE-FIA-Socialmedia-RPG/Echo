<script setup lang="ts">
import type {Community} from '@prisma/client'

type Props = {
    community: Community & {
        bannerImage?: {
            id: number
        }
    }
}

defineProps<Props>()
</script>

<template>
    <UCard
        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
        :key="community.id"
        :ui="{base: 'cursor-pointer'}"
        @click="navigateTo(`/communities/${community.id}`)"
    >
        <template #header>
            <div class="text-2xl">{{ community.communityName }}</div>
        </template>

        <template #footer>
            <div class="flex gap-4">
                <ProfileAvatar
                    v-if="community?.bannerImage"
                    :src="`/api/images/${community.bannerImage.id}`"
                />

                <p class="grow">{{ community.description }}</p>
            </div>
        </template>
    </UCard>
</template>
