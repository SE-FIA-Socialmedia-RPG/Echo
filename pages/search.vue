<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { Community, Post, User } from '@prisma/client'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')
const hasSearched = ref(false)
const communities = ref<Community[]>([])
const users = ref<User[]>([])
const posts = ref<Post[]>([])
const pageUsers = ref(1)
const pageCommunities = ref(1)
const pagePosts = ref(1)
const loadingUsers = ref(false)
const loadingCommunities = ref(false)
const loadingPosts = ref(false)
const hasMoreUsers = ref(true)
const hasMoreCommunities = ref(true)
const hasMorePosts = ref(true)
const targetUsers = useTemplateRef('targetUsers')
const targetCommunities = useTemplateRef('targetCommunities')
const targetPosts = useTemplateRef('targetPosts')

const items = [
    { label: 'Benutzer', icon: 'i-heroicons-user', slot: 'users' },
    { label: 'Communities', icon: 'line-md:at', slot: 'communities' },
    { label: 'Posts', icon: 'i-heroicons-chat-bubble-left', slot: 'posts' },
]

const selected = computed({
    get() {
        const index = items.findIndex(item => item.label === route.query.tab)
        return index !== -1 ? index : 0
    },
    set(value) {
        router.replace({ query: { tab: items[value].label }})
    }
})

const fetchResults = async (type: string, page: number) => {
    try {
        const response = await $fetch(`/api/${type}/search`, {
            method: 'POST',
            query: {page, limit: 10},
            body: { query: searchInput.value},
        })
        return response ?? []
    } catch (error) {
        console.error(`Error fetching ${type}:`, error)
        toast.add({
            title: 'Fehler',
            description: `Fehler beim Laden neuer ${type}`,
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return []
    }
}

const loadMore = async (type: string) => {
    const loadingRef = type === 'users' ? loadingUsers : type === 'communities' ? loadingCommunities : loadingPosts
    const pageRef = type === 'users' ? pageUsers : type === 'communities' ? pageCommunities : pagePosts
    const dataRef = type === 'users' ? users : type === 'communities' ? communities : posts
    const hasMoreRef = type === 'users' ? hasMoreUsers : type === 'communities' ? hasMoreCommunities : hasMorePosts

    if (loadingRef.value || !hasMoreRef.value || !searchInput.value.length) return

    loadingRef.value = true
    const newResults = await fetchResults(type, pageRef.value)

    if (newResults) {
        dataRef.value.push(...newResults)
        pageRef.value++
    }
    else {
        hasMoreRef.value = false
    }

    loadingRef.value = false
}

const onSearchClicked = async () => {
    hasSearched.value = false

    users.value = []
    communities.value = []
    posts.value = []
    pageUsers.value = 1
    pageCommunities.value = 1
    pagePosts.value = 1
    hasMoreUsers.value = true
    hasMoreCommunities.value = true
    hasMorePosts.value = true

    await Promise.all([
        loadMore('users'),
        loadMore('communities'),
        loadMore('posts')
    ]);

    hasSearched.value = true
}

watch(selected, () => {
    hasSearched.value = false
})

useIntersectionObserver(targetUsers, ([entry]) => {
    if (entry.isIntersecting && selected.value === 0) {
        loadMore('users')
    }
})

useIntersectionObserver(targetCommunities, ([entry]) => {
    if (entry.isIntersecting && selected.value === 1) {
        loadMore('communities')
    }
})

useIntersectionObserver(targetPosts, ([entry]) => {
    if (entry.isIntersecting) {
        loadMore('posts')
    }
})

</script>

<template>
    <UContainer>
        <UCard class="w-full">
            <template #header>
                <div class="space-y-4">
                    <p class="text-2xl">Suche</p>

                    <div class="flex justify-end space-x-4 items-center">
                        <UInput v-model="searchInput" class="grow" placeholder="Suche..." @keyup.enter="onSearchClicked" />
                        <UButton icon="i-heroicons-magnifying-glass" @click="onSearchClicked" />
                    </div>
                </div>
            </template>

            <UTabs v-model="selected" :items="items">
                <template #users>
                    <div class="flex flex-col space-y-4">
                        <CardUser v-for="user in users" :key="user.id" :user="user" class="mt-4" />
                        <div ref="targetUsers"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="hasSearched && users.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Benutzer gefunden"
                        description="Es konnten keine Benutzer gefunden werden."
                    />
                </template>

                <template #communities>
                    <div class="flex flex-col space-y-4">
                        <CardCommunity v-for="community in communities" :key="community.id" :community="community" class="mt-4" />
                        <div ref="targetCommunities"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="hasSearched && communities.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Communities gefunden"
                        description="Es konnten keine Communities gefunden werden."
                    />
                </template>

                <template #posts>
                    <div class="flex flex-col space-y-4">
                        <CardPost v-for="post in posts" :key="post.id" :post="post" class="mt-4" />
                        <div ref="targetPosts"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="hasSearched && posts.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Posts gefunden"
                        description="Es konnten keine Posts gefunden werden."
                    />
                </template>
            </UTabs>
            <UAlert
                class="mt-4"
                v-if="!hasSearched && posts.length === 0"
                icon="i-heroicons-information-circle"
                color="sky"
                variant="outline"
                title="Suche Leer"
                description="Bitte gib etwas in das Suchfeld ein."
            />
        </UCard>

    </UContainer>
</template>
