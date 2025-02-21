<script setup lang="ts">
import ProfileAvatar from '~/components/ProfileAvatar.vue'

const props = defineProps<{
    communities: Community[]
}>()

const noResults = ref(false)

watch(
    () => props.communities,
    (newVal) => {
        noResults.value = newVal.length === 0
    },
    {immediate: true}
) //noResults is True when no communites are in the array

interface Community {
    id: number
    communityName: string
    _count: {
        users: number
    }
    bannerImage?: {
        id: number
    }
    description: string
}
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="h-10">
                    <p class="text-xl">Communities</p>
                    <div class="flex justify-end items-center"></div>
                </div>
            </template>
            <template #footer>
                <div v-if="noResults" class="text-center text-gray-500">No communities found.</div>
                <div v-if="!noResults" class="space-y-4 overflow-y-auto p-2 h-96">
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-for="community in communities"
                        :key="community.id"
                        :ui="{base: 'cursor-pointer'}"
                        @click="navigateTo(`/profiles/${community.id}`)"
                    >
                        <template #header>
                            <div class="text-2xl">{{ community.communityName }}</div>
                        </template>
                        <template #footer>
                            <div>
                                <ProfileAvatar
                                    v-if="community?.bannerImage"
                                    :src="`/api/images/${community.bannerImage.id}`"
                                />
                                <p>{{ community.description }}</p>
                            </div>
                        </template>
                    </UCard>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
