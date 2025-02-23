<script setup lang="ts">
import {useIntersectionObserver} from '@vueuse/core'
import type {Post} from '@prisma/client'

const toast = useToast()
const posts = ref<Post[]>([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const target = useTemplateRef('target')
const {isLoggedIn} = useAuth()


const fetchPosts = async (page: number) => {
    try {
        const posts = await $fetch('/api/users/feed', {
            query: {
                page,
                limit: 10,
            },
        })
        if (!posts) {
            throw new Error('Network response was not ok')
        }

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden neuer Posts',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
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

useIntersectionObserver(
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
        <FormPost class="mb-6" @created="onPostCreated($event)" v-if="isLoggedIn"/>

        <div v-for="post in posts" :key="post.id">
            <CardPost :post="post" />
        </div>

        <div ref="target"></div>
    </div>
</template>
