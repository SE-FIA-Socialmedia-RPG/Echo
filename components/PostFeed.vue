<script setup lang="ts">
import {useIntersectionObserver} from '@vueuse/core'
import type {Post} from '@prisma/client'

const posts = ref<Post[]>([]) // Array mit Posts
const page = ref(1) // auf welcher Seite befinden wir uns?
const pageSize = 10
const loading = ref(false)
const hasMore = ref(true)
const target = useTemplateRef('target') //target ist div target, unten an der Seite nach den Posts für den Intersection Observer

const fetchPosts = async (page: number) => {
    //fetch posts
    try {
        const posts = await $fetch('/api/users/feed', {
            query: {
                page,
                limit: pageSize,
            },
        })
        if (!posts) {
            throw new Error('Network response was not ok')
        }

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
    }

    return []
}

const loadMorePosts = async () => {
    //load more posts
    if (loading.value || !hasMore.value) return
    loading.value = true
    const newPosts = await fetchPosts(page.value)
    if (newPosts.length) {
        posts.value.push(...newPosts) //pushes Posts into variable
        page.value += 1
    } else {
        hasMore.value = false
    }
    loading.value = false
}

onMounted(() => {
    loadMorePosts()
})

const onPostCreated = (post: Post) => {
    posts.value.unshift(post)
}

const {stop} = useIntersectionObserver(
    //Intersection Observer benutzt mehr posts laden methode wenn div target in view
    target,
    ([entry]) => {
        if (!entry.isIntersecting) {
            return
        }

        loadMorePosts()
    }
)
</script>

<template>
    <div class="space-y-8">
        <FormPost class="mb-6" @created="onPostCreated($event)" />

        <div v-for="post in posts" :key="post.id">
            <Post :post="post" />
        </div>

        <div ref="target">Marker</div>
        <div v-if="loading" class="loading">Loading...</div>
    </div>
</template>
