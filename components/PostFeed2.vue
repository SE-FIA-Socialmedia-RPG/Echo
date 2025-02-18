<script setup lang="ts">
import {useIntersectionObserver} from '@vueuse/core'

const posts = ref([]) // Array mit Posts
const page = ref(1) // auf welcher Seite befinden wir uns?
const pageSize = 10
const loading = ref(false)
const hasMore = ref(true)
const target = ref(null) //target ist div target, unten an der Seite nach den Posts für den Intersection Observer
const targetIsVisible = ref(false)

const fetchPosts = async (page: number) => {
    //fetch posts
    try {
        const response = await fetch(`/api/users/feed?page=${page}&limit=${pageSize}`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
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

const {stop} = useIntersectionObserver(
    //Intersection Observer benutzt mehr posts laden methode wenn div target in view
    target,
    ([entry]) => {
        if (entry.isIntersecting) {
            loadMorePosts()
        }
    }
)
</script>

<template>
    <div class="space-y-8">
        <div v-for="post in posts" :key="post.id">
            <Post :post="post" />
        </div>

        <div ref="target">MARKER</div>

        <div v-if="loading" class="loading">Loading...</div>
    </div>
</template>
