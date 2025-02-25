<script setup lang="ts">
import type {Community, Image, Post, User} from '@prisma/client'

type Props = {
    post: Post & {
        user: User
        community: Community
        image: Image
        likes: User[]
        _count: {likes: number; comments: number}
    }
}

const props = defineProps<Props>()
const {isLoggedIn, me} = useAuth()
const isLiked = ref(props.post.likes.some((likedUser) => likedUser.id === me.value?.id))

const toggleLike = async () => {
    const toast = useToast()

    if (isLiked.value) {
        try {
            await $fetch(`/api/posts/${props.post.id}/like`, {
                method: 'delete',
            })
        } catch (error) {
            console.error(error)
            toast.add({
                title: 'Fehler',
                description: 'Fehler beim Liken',
                icon: 'i-heroicons-exclamation-circle',
                color: 'red',
            })
            return
        }
        props.post._count.likes -= 1
    } else {
        try {
            await $fetch(`/api/posts/${props.post.id}/like`, {
                method: 'post',
            })
        } catch (error) {
            console.error(error)
            toast.add({
                title: 'Fehler',
                description: 'Fehler beim Disliken',
                icon: 'i-heroicons-exclamation-circle',
                color: 'red',
            })
            return
        }
        props.post._count.likes += 1
    }
    isLiked.value = !isLiked.value
}

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
    <UCard>
        <template #header class="flex items-center gap-4">
            <div class="flex items-center gap-4 w-full">
                <div class="flex items-center gap-4">
                    <UAvatar
                        size="xl"
                        :src="
                            post.user?.profileImageId
                                ? `/api/images/${post.user.profileImageId}`
                                : undefined
                        "
                        alt="Profilbild"
                    />
                    <NuxtLink
                        :to="`/profiles/${post.user.id}`"
                        class="text-lg font-semibold hover:underline"
                        :class="tailwindClasses[post.user.accentColor]"
                    >
                        {{ post.user.username }}
                    </NuxtLink>
                </div>
                <UButton
                    :to="`/communities/${post.community.id}`"
                    v-if="post.community?.id"
                    color="primary"
                    variant="solid"
                    class="text-wrap"
                >
                    {{ post.community.communityName }}
                </UButton>
                <p v-if="post.ad" class="text-sm text-red-500 ml-auto">Werbung</p>
            </div>
        </template>
        <p class="text-2xl font-semibold mb-6 mx-2">{{ post.title }}</p>
        <div class="flex flex-col">
            <img
                v-if="post?.imageId"
                :src="`/api/images/${post.imageId}`"
                class="outlined-image"
                alt="Beispielbild"
            />
        </div>
        <p class="m-2">{{ post.text }}</p>
        <template #footer>
            <div class="flex gap-1">
                <div class="flex gap-2">
                    <UButton
                        :disabled="!isLoggedIn"
                        :icon="isLiked ? 'line-md:heart-filled' : 'line-md:heart'"
                        size="xl"
                        color="gray"
                        :padded="false"
                        variant="ghost"
                        @click="toggleLike"
                    />
                    <p class="text-lg font-semibold">{{ post._count.likes }}</p>
                </div>
                <UButton
                    class="ml-auto"
                    :to="`/posts/${post.id}`"
                    icon="i-heroicons-chat-bubble-left-right"
                    size="sm"
                    color="primary"
                    variant="solid"
                    label="Kommentare"
                    :trailing="false"
                />
            </div>
        </template>
    </UCard>
</template>
