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
console.log(me)
const isLiked = ref(props.post.likes.some(likedUser => likedUser.id === me.value?.id))

const toggleLike = async () => {
    const toast = useToast()

    if (isLiked.value) {
        try {
            await $fetch(`/api/posts/${props.post.id}/like`, {
                method: 'delete',
            })
        }
        catch (error) {
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
    }
    else {
        try {
            await $fetch(`/api/posts/${props.post.id}/like`, {
                method: 'post',
            })
        }
        catch (error) {
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
    isLiked.value = !isLiked.value;
}
</script>

<template>
    <UCard>
        <template #header class="flex items-center gap-4">
            <div class="flex items-center gap-4 w-full">
                <div class="flex items-center gap-4">
                    <UAvatar
                        size="xl"
                        :src="`/api/images/${post.user.profileImageId}`"
                        alt="Profilbild"
                    />
                    <NuxtLink :to="`/profiles/${post.user.id}`"
                              class="text-lg font-semibold hover:underline"
                              :class="post.user.accentColor">
                        {{ post.user.username }}
                    </NuxtLink>
                </div>
                <UButton :to="`/communities/${post.community.id}`"
                         v-if="post.community?.id"
                         color="primary"
                         variant="solid">
                    {{ post.community.communityName }}
                </UButton>
                <p v-if="post.ad" class="text-sm text-red-500 ml-auto">Werbung</p>
            </div>
        </template>
        <p class="text-2xl font-semibold mb-6 mx-2">{{ post.title }}</p>
        <div class="flex flex-col">
            <img
                v-if="post.image?.id"
                :src="`/api/images/${post.image.id}`"
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
                <UButton class="ml-auto" :to="`/posts/${post.id}`"
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
