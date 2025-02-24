<script setup lang="ts">
import type {Award} from '@prisma/client'

type Props = {
    award: Award
}

defineProps<Props>()
</script>

<template>
    <UCard
        :key="award.id"
        :ui="{base: 'cursor-pointer'}"
    >
        <template #header>
            <div class="text-2xl">{{ award.awardName }}</div>
        </template>

        <template #footer>
            <div class="flex gap-4 items-center">
                <UAvatar
                    size="xl"
                    :src="(award?.awardImageId) ? `/api/images/${award?.awardImageId}` : undefined"
                    alt="Profilbild"
                />
                <p class="grow">Erstellt am {{ new Date(award.createdAt).toDateString() }}</p>
            </div>
        </template>
    </UCard>
</template>
