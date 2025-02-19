<script setup lang="ts">
const isOpen = ref(false)
const member = ref(false)
const communities = ref<Community[]>([])
const query = ref('')

async function getCommunities() {
    try {
        const response = await fetch('/api/communities')
        const data: Community[] = await response.json()
        communities.value = data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getCommunities()
})

interface Community {
    id: number
    communityName: string
    _count: {
        users: number
    }
    bannerImage: {
        path: string
    }
    description: string
}
</script>

<template>
    <UContainer class="my-8">
        <UCard>
            <template #header>
                <div class="h-24">
                    <p class="text-2xl">Communities</p>
                    <div class="flex justify-end items-center">
                        <UToggle size="lg" v-model="member" on-icon="i-heroicons-check-badge">
                        </UToggle>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="space-y-4 overflow-y-auto p-2 h-96">
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-if="member"
                        v-for="community in communities"
                        :key="community.id"
                    >
                        <template #header>
                            <div class="text-2xl">{{ community.communityName }}</div>
                        </template>

                        <template #footer>
                            <div>
                                <UAvatar
                                    size="2xl"
                                    chip-color="green"
                                    :chip-text="community._count.users"
                                    chip-position="top-right"
                                    v-if="community?.bannerImage"
                                    :src="community.bannerImage.path"
                                >
                                </UAvatar>
                                <p>
                                    {{ community.description }}
                                </p>
                            </div>
                        </template>
                    </UCard>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
