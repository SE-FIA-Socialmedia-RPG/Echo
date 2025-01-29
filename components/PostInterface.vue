<script setup lang="ts">
const selected = ref(false)
const originalPoster = ref(true)
const loggedIn = ref(true)
const newComment = ref('')
const comments = ref<comment[]>([])
const post = ref<post | null>(null)

interface post {
    id: number
    title: string
    content: string
    image: {
        path: string
    } | null
}

interface comment {
    id: number
    text: string
    postId: number
}

const fetchPostAndComments = async () => {
    try {
        const postResponse = await fetch(`/api/posts/id`)
        if (!postResponse.ok) {
            throw new Error('Failed to fetch post')
        }
        post.value = await postResponse.json()

        const commentsResponse = await fetch(`/api/posts/id/comments`)
        if (!commentsResponse.ok) {
            throw new Error('Failed to fetch comments')
        }
        comments.value = await commentsResponse.json()
    } catch (error) {
        console.error(error)
    }
}
const submitComment = async () => {
    if (newComment.value.trim() === '') {
        return
    }

    try {
        const response = await fetch(`/api/posts/id/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: newComment.value,
                postId: post,
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to submit comment')
        }

        const addedComment: comment = await response.json()
        comments.value.push(addedComment)
        newComment.value = ''
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    fetchPostAndComments()
    fetchRandomPost()
})

const fetchRandomPost = async () => {
    try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        const posts: post[] = await response.json()

        const randomIndex = Math.floor(Math.random() * posts.length)
        post.value = posts[randomIndex]
    } catch (error) {
        console.error(error)
    }
}
</script>
<template>
    <UContainer class="items-center">
        <UCard class="max-w-sm mx-auto">
            <template #header>
                <div>
                    <UButton
                        class="mt-5 mb-5"
                        size="sm"
                        icon="i-heroicons-arrow-uturn-left"
                        alt="return"
                    ></UButton>
                </div>
                <div class="mb-10 p-5">
                    <div
                        class="w-full aspect-w-16 aspect-h-9 overflow-hidden flex justify-center"
                        v-if="post && post.image"
                    >
                        <img class="w-full h-full object-contain" :src="post.image.path" alt="" />
                    </div>
                    <h1 v-else-if="post && post.content">{{ post.content }}</h1>
                </div>
            </template>

            <div class="flex justify-end">
                <UToggle
                    v-model="selected"
                    size="lg"
                    class="mb-3 mr-3"
                    on-icon="i-heroicons-heart"
                    off-icon="i-heroicons-x-mark-20-solid"
                    alt="like/dislike"
                />
            </div>
            <UTextarea
                v-model="newComment"
                class="mb-4"
                placeholder="Schreibe einen Kommentar..."
            ></UTextarea>
            <div class="flex justify-end" alt="send comment">
                <UButton
                    icon="i-heroicons-chat-bubble-oval-left-ellipsis"
                    @click="submitComment"
                ></UButton>
            </div>

            <template #footer>
                <div class="flex justify-end mb-5">
                    <UButton
                        class="mr-3"
                        icon="i-heroicons-pencil"
                        alt="edit comment"
                        v-if="originalPoster && loggedIn"
                    ></UButton>
                    <UButton
                        icon="i-heroicons-trash"
                        alt="delete comment"
                        v-if="originalPoster && loggedIn"
                    ></UButton>
                </div>
                <div>
                    <h3>Kommentare</h3>
                    <ul>
                        <li v-for="(comment, index) in comments" :key="index">
                            {{ comment.text }}
                        </li>
                    </ul>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
