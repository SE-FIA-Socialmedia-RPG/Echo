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
        :key="community.id"
        :ui="{base: 'cursor-pointer'}"
        @click="navigateTo(`/communities/${community.id}`)"
    >
        <template #header>
            <div class="text-2xl">{{ community.communityName }}</div>
        </template>

        <template #footer>
            <div class="flex gap-4 items-center">
                <UAvatar
                    size="xl"
                    :src="(community?.bannerImageId) ? `/api/images/${community.bannerImageId}` : undefined"
                    alt="Profilbild"
                />
                <p class="grow">{{ community.description }}</p>
            </div>
        </template>
    </UCard>
</template>
