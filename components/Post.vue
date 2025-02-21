<script setup lang="ts">
import type {Community, Image, Post, User, Comment} from '@prisma/client'
import CommentPreview from '~/components/CommentPreview.vue'

type Props = {
    post: Post & {
        user: User
        community: Community
        image: Image
        _count: {likes: number; comments: number}
    }
}

const props = defineProps<Props>()

let comments = ref<Comment[]>([])

const pressComment = async () => {
    try {
        const commentResponse = await $fetch<Comment[]>(`/api/posts/${props.post.id}/comments`, {
            method: 'GET',
        })
        //comments.value.push(...commentResponse)
        comments.value = commentResponse
        console.log(comments)
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
</script>

<template>
    <UCard :ui="{base: 'cursor-pointer'}" @click="navigateTo(`/posts/${post.id}`)">
        <template #header>
            <!--Autor (Profil, etc), Metadaten (Datum, etc.):src="`/api/images/${post.user.profileImageId}`"-->
            <div class="flex items-center space-x-4 -z-50">
                <UAvatar
                    size="xl"
                    :src="`/api/images/${post.user.profileImageId}`"
                    alt="Profilbild"
                />
                <div class="flex flex-col">
                    <a class="text-lg font-semibold" :class="post.user.accentColor">{{
                        post.user.username
                    }}</a>
                </div>
                <div class="flex flex-col">
                    <span v-if="post.community" class="text-sm text-gray-500"
                        >in {{ post.community.communityName }}</span
                    >
                    <span v-if="post.ad" class="text-sm text-red-500">Advertisment</span>
                </div>
            </div>
        </template>
        <!--Inhalt vom Post-->
        <div class="flex flex-col">
            <a class="text-lg font-semibold">{{ post.text }}</a>
        </div>
        <br />
        <div class="flex flex-col">
            <img
                v-if="post.image?.id"
                :src="`/api/images/${post.image.id}`"
                class="outlined-image"
                alt="Beispielbild"
            />
        </div>
        <template #footer>
            <!--Interaktions-Menü (Like, Reply, Share)-->
            <div class="rightAlign flex items-center space-x-2">
                <LikeButton
                    :postId="post.id"
                    :initialLikeCount="post._count.likes"
                    :initiallyLiked="false"
                />
                l
                <UPopover class="w-xs ...">
                    <UButton
                        icon="line-md:chat-bubble"
                        size="xl"
                        color="gray"
                        :padded="false"
                        variant="ghost"
                        @click="pressComment"
                    />
                    <template #panel>
                        <div v-for="comment in comments.slice(0, 3)" :key="comment.id">
                                <CommentPreview :comment="comment" />
                        </div>
                    </template>
                </UPopover>

                <a class="text-lg font-semibold">{{ post._count.comments }}</a>

                <UButton
                    icon="line-md:link"
                    size="xl"
                    color="gray"
                    :padded="false"
                    variant="ghost"
                />
                <a class="text-lg font-semibold">#</a>
            </div>
        </template>
    </UCard>
</template>
