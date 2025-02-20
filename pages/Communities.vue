<script setup lang="ts">
import CommunitySearchResults from '~/components/SearchResults/CommunitySearchResults.vue'
const searchInput = ref('')
const users = ref([])
const posts = ref([])
const selectedTab = ref(1)
const isOpen = ref(false)
const member = ref(false)
const communities = ref<Community[]>([])
const query = ref('')

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

const items = [
    {
        label: 'Communities',
        icon: 'i-heroicons-arrow-down-tray',
        key: 1,
    },
]

const handleSearchClick = async () => {
    try {
        const [communitiesResponse] = await Promise.all([
            $fetch(`/api/communities/search`, {
                method: 'POST',
                body: {
                    query: searchInput.value,
                },
            }),
        ])

        console.log('Communities:', communitiesResponse)

        communities.value = communitiesResponse

        return {communitiesResponse}
    } catch (error) {
        console.error('Error fetching search:', error)
        throw error
    }
}

const selectedContent = computed(() => {
    const selectedItem = items.find((item) => item.key === selectedTab.value)
    console.log('Selected Tab:', selectedTab.value) // Überprüfe die Änderungen der selectedTab-Variable
    console.log('Selected Item:', selectedItem) // Überprüfe das ausgewählte Item
    return selectedItem ? selectedItem.key : ''
})
// Überwache die Änderungen der selectedTab-Variable
watch(selectedTab, (newVal, oldVal) => {
    console.log(`Tab changed from ${oldVal} to ${newVal}`)
})
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="h-24">
                    <p class="text-2xl">Communities</p>
                    <div class="flex justify-end items-center">
                        <div class="flex justify-end items-center">
                            <input
                                class="border-green-600"
                                v-model="searchInput"
                                placeholder="Search for keyword"
                            />
                            <UButton
                                icon="i-heroicons-magnifying-glass"
                                @click="handleSearchClick"
                                class="mr-5 ml-5"
                            />
                        </div>
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
                        <UTabs v-model="selectedTab" :items="items">
                            <template #item="{item}" class="w-full">
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
                    </UCard>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
