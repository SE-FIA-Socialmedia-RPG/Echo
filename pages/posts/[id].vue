<script setup lang="ts">
import type {Post, Comment, User} from '@prisma/client'
import {useIntersectionObserver} from '@vueuse/core'

const route = useRoute()
const {isLoggedIn, me} = useAuth()
const toast = useToast()

const {data: post, error} = useFetch<Post & {user: User}>(`/api/posts/${route.params.id as string}`)

watch(error, (err) => {
    if (err) {
        console.error(err)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden des Posts',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        navigateTo('/')
    }
})


const comments = ref<(Comment & {user: User})[]>([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const target = useTemplateRef('target')
const newComment = ref('')

const submitComment = async (event: KeyboardEvent) => {
    if (newComment.value.trim() === '' || event.shiftKey) {
        return
    }

    try {
        const response = await $fetch(`/api/comments`, {
            method: 'POST',
            body: {
                text: newComment.value,
                postId: post.value?.id,
            },
        })

        comments.value.unshift(response)
        newComment.value = ''
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Erstellen des Kommentars',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
}

const deleteComment = async (commentId: number) => {
    try {
        await $fetch(`/api/comments/${commentId}`, {
            method: 'delete',
        })
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Löschen des Kommentars',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return
    }

    comments.value.splice(
        comments.value.findIndex((comment) => comment.id === commentId),
        1
    )
}

const fetchComments = async (page: number) => {
    try {
        const comments = await $fetch(`/api/posts/${route.params.id as string}/comments`, {
            query: {
                page,
                limit: 10,
            },
        })
        if (!comments) {
            throw new Error('Network response was not ok')
        }

        return comments
    } catch (error) {
        console.error('Error fetching posts:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden neuer Kommentare',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }

    return []
}

const loadMoreComments = async () => {
    //load more posts
    if (loading.value || !hasMore.value) return
    loading.value = true
    const newComments = await fetchComments(page.value)
    if (newComments.length) {
        comments.value.push(...newComments) //pushes Posts into variable
        page.value += 1
    } else {
        hasMore.value = false
    }
    loading.value = false
}

onMounted(() => {
    loadMoreComments()
})

useIntersectionObserver(target, ([entry]) => {
    if (entry.isIntersecting) {
        loadMoreComments()
    }
})

const tailwindClasses: string[] = [
    '',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-gradient-to-t from-[#f70066] to-[#a200c6] filter drop-shadow-[0_0_5px_rgba(255,0,89,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-gradient-to-r from-[#fff700] via-[#ffc400] via-[#ff8438] via-[#ff1f77] via-[#ff00bb] to-[#ee00ff] filter drop-shadow-[0_0_0.1px_rgba(238,0,255,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[radial-gradient(circle,_#fff700_15%,_#ff9500_30%,_#db1d0f_100%)] dark:filter dark:drop-shadow-[0_0_4px_rgba(224,15,0,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[linear-gradient(90deg,_#ff5c5c_15%,_#ffac38_30%,_#fef97c_45%,_#82ff80_60%,_#52bdff_75%,_#cc80ff_90%)] dark:filter dark:drop-shadow-[0_0_0.1px_rgba(227,74,74,1)] dark:drop-shadow-[0_0_4px_rgba(195,85,85,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[linear-gradient(270deg,_#ff00d9_12%,_#00ddff_100%)] filter drop-shadow-[0_0_0.1px_rgba(215,15,255,1)] dark:drop-shadow-[1px_1px_0.1px_rgba(64,0,77,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[url(https://cdn.7tv.app/paint/01JEDE45FTB7XTQGRFXP0BA2PT/layer/01JF06XNCYM98WZAGNT0D51SQ3/1x.webp)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[url(https://cdn.7tv.app/paint/01JG7HNY3EXYD9ANZ3HFAC6STJ/layer/01JGC1199ZD3HQQWJ91RM1ZAHQ/1x.webp)]',
]
</script>

<template>
    <UContainer class="items-center">
        <UCard class="flex flex-col">
            <div class="flex items-start gap-4 my-3">
                <UButton
                    size="sm"
                    icon="i-heroicons-arrow-uturn-left"
                    alt="return"
                    variant="ghost"
                    @click="$router.back()"
                />

                <p class="text-2xl font-bold">{{ post?.title }}</p>
            </div>

            <div class="p-4 ml-8">
                <div class="w-full overflow-hidden flex justify-center" v-if="post?.imageId">
                    <img
                        class="w-full h-full object-contain"
                        :src="`/api/images/${post.imageId}`"
                        alt=""
                    />
                </div>

                <p v-if="post?.text" class="mt-2">{{ post?.text }}</p>
            </div>

            <UTextarea
                v-model="newComment"
                v-if="isLoggedIn"
                class="mt-4 mb-4 ml-12"
                placeholder="Schreibe einen Kommentar..."
                @keydown.enter="submitComment($event)"
            />

            <template #footer>
                <h3 class="font-bold space-y-4 mb-4">Kommentare</h3>

                <div class="space-y-4">
                    <UCard v-for="(comment, i) in comments" :key="comment.id">
                        <p class="font-bold" :class="tailwindClasses[comment.user.accentColor]">
                            {{ comment.user.username }}:
                        </p>
                        <p>{{ comment.text }}</p>
                        <div
                            v-if="isLoggedIn && me?.id === comment.user.id"
                            class="flex justify-end mt-1 space-x-2"
                        >
                            <UButton
                                @click="deleteComment(comment.id)"
                                icon="i-heroicons-trash"
                                alt="delete comment"
                                variant="ghost"
                                color="red"
                            />
                        </div>
                    </UCard>
                </div>
                <div ref="target"></div>
            </template>
        </UCard>
    </UContainer>
</template>
