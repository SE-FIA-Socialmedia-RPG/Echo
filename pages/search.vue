<script setup lang="ts">
import type {Community, Post, User} from '@prisma/client'

const searchInput = ref('')
const selectedTab = ref(1)
const hasSearched = ref(false)

const communities = ref<Community[]>([])
const users = ref<User[]>([])
const posts = ref<Post[]>([])

const items = computed(() => [
    {
        label: 'Benutzer' + (hasSearched.value ? ` (${users.value.length})` : ''),
        icon: 'i-heroicons-information-circle',
        slot: 'users',
    },
    {
        label: 'Communities' + (hasSearched.value ? ` (${communities.value.length})` : ''),
        icon: 'i-heroicons-arrow-down-tray',
        slot: 'communities',
    },
    {
        label: 'Posts' + (hasSearched.value ? ` (${posts.value.length})` : ''),
        icon: 'i-heroicons-chat-bubble-left-right',
        slot: 'posts',
    },
])

const onSearchClicked = async () => {
    try {
        const [postsResponse, usersResponse, communitiesResponse] = await Promise.all([
            $fetch(`/api/posts/search`, {
                method: 'POST',
                body: {
                    query: searchInput.value,
                },
            }),
            $fetch(`/api/users/search`, {
                method: 'POST',
                body: {
                    query: searchInput.value,
                },
            }),
            $fetch(`/api/communities/search`, {
                method: 'POST',
                body: {
                    query: searchInput.value,
                },
            }),
        ])

        console.log('Posts:', postsResponse)
        console.log('Users:', usersResponse)
        console.log('Communities:', communitiesResponse)

        communities.value = communitiesResponse //hahaa warum bist du rot unterstrichen T___T
        users.value = usersResponse
        posts.value = postsResponse

        hasSearched.value = true
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
        <UCard class="w-full">
            <template #header>
                <div class="space-y-4">
                    <p class="text-2xl">Suche</p>

                    <div class="flex justify-end space-x-4 items-center">
                        <UInput
                            v-model="searchInput"
                            class="grow"
                            placeholder="Suche..."
                            @keyup.enter="onSearchClicked"
                        />

                        <UButton icon="i-heroicons-magnifying-glass" @click="onSearchClicked" />
                    </div>
                </div>
            </template>

            <UTabs :items="items">
                <template #users="{item}">
                    <div class="flex flex-col space-y-4">
                        <CardUser
                            v-for="user in users"
                            :key="user.id"
                            :user="user as any"
                            class="mt-4"
                        />

                        <UAlert
                            v-if="hasSearched && users.length === 0"
                            icon="i-heroicons-information-circle"
                            color="sky"
                            variant="outline"
                            title="Keine Benutzer gefunden"
                            description="Es konnten keine Benutzer gefunden werden."
                        />
                    </div>
                </template>

                <template #communities="{item}">
                    <div class="flex flex-col space-y-4">
                        <CardCommunity
                            v-for="community in communities"
                            :key="community.id"
                            :community="community"
                            class="mt-4"
                        />

                        <UAlert
                            v-if="hasSearched && communities.length === 0"
                            icon="i-heroicons-information-circle"
                            color="sky"
                            variant="outline"
                            title="Keine Communities gefunden"
                            description="Es konnten keine Communities gefunden werden."
                        />
                    </div>
                </template>

                <template #posts="{item}">
                    <div class="flex flex-col space-y-4">
                        <CardPost v-for="post in posts" :key="post.id" :post="post" class="mt-4" />

                        <UAlert
                            v-if="hasSearched && users.length === 0"
                            icon="i-heroicons-information-circle"
                            color="sky"
                            variant="outline"
                            title="Keine Posts gefunden"
                            description="Es konnten keine Posts gefunden werden."
                        />
                    </div>
                </template>

                <!--                <div v-if="selectedContent === 1">-->
                <!--                    <CardCommunity-->
                <!--                        v-for="community in communities"-->
                <!--                        :key="community.id"-->
                <!--                        :community="community"-->
                <!--                    />-->
                <!--                </div>-->
                <!--                <div v-if="selectedContent === 2">-->
                <!--                    <PostSearchResults :posts="posts" />-->
                <!--                </div>-->
            </UTabs>
        </UCard>
    </UContainer>
</template>
