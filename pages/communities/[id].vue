<script setup lang="ts">
import {type User, type Community, type Post, type Award} from '@prisma/client'
import {useRoute, useRouter} from 'vue-router'
import type {FormError, FormSubmitEvent} from '#ui/types'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const {me, isLoggedIn} = useAuth()

const communityId = ref(Number(route.params.id))

const isFollowing = ref(false)
computedAsync(async () => {
    if (!isLoggedIn.value) return
    try {
        const followingData = await $fetch<boolean>(`/api/communities/${communityId.value}/isfollowing`)
        isFollowing.value = followingData ?? false
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden der Community',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
})

const community = reactive({} as Community)
const isAdmin = ref(computedAsync( () => isLoggedIn && me.value?.id === community.adminUserId))
computedAsync(async () => {
    try {
        const communityData = await $fetch<Community>(`/api/communities/${communityId.value}`)
        if (communityData) {
            Object.assign(community, communityData)
        }
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden der Community',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        navigateTo("/communities")
    }
})

const awards = ref<Award[]>([])
const users = ref<User[]>([])
const posts = ref<Post[]>([])
const pageAwards = ref(1)
const pageUsers = ref(1)
const pagePosts = ref(1)
const loadingAwards = ref(false)
const loadingUsers = ref(false)
const loadingPosts = ref(false)
const hasMoreAwards = ref(true)
const hasMoreUsers = ref(true)
const hasMorePosts = ref(true)
const targetAwards = useTemplateRef('targetAwards')
const targetUsers = useTemplateRef('targetUsers')
const targetPosts = useTemplateRef('targetPosts')

const fetchResults = async (type: string, page: number) => {
    try {
        const response = await $fetch(`/api/communities/${communityId.value}/${type}`, {
            method: 'GET',
            query: {page, limit: 10},
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
    const loadingRef = type === 'awards' ? loadingAwards : type === 'users' ? loadingUsers : loadingPosts
    const pageRef = type === 'awards' ? pageAwards : type === 'users' ? pageUsers : pagePosts
    const dataRef = type === 'awards' ? awards : type === 'users' ? users : posts
    const hasMoreRef = type === 'awards' ? hasMoreAwards : type === 'users' ? hasMoreUsers : hasMorePosts

    if (loadingRef.value || !hasMoreRef.value) return

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

useIntersectionObserver(targetAwards, ([entry]) => {
    if (entry.isIntersecting && selected.value === 0) {
        loadMore('awards')
    }
})

useIntersectionObserver(targetUsers, ([entry]) => {
    if (entry.isIntersecting && selected.value === 1) {
        loadMore('users')
    }
})

useIntersectionObserver(targetPosts, ([entry]) => {
    if (entry.isIntersecting && selected.value === 2) {
        loadMore('posts')
    }
})

const toggleFollow = async () => {
    try {
        await $fetch(`/api/users/${communityId.value}/join`, {
            method: (isFollowing.value) ? 'DELETE' : 'POST',
        })
    }
    catch (error) {
        console.error('Error join / leave Community:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim betreten bzw. verlassen der Community',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return
    }
    isFollowing.value = !isFollowing.value
}

const deleteCommunity = async () => {
    try {
        await $fetch(`/api/communities/${communityId.value}`, {
            method: 'DELETE',
        })
    }
    catch (error) {
        console.error('Error deleting Community:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Löschen des Accounts',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
}

const uploadImage = async (event: Event, type: 'profile' | 'banner') => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0]
    if (!file) {
        console.error('No file selected.')
        return
    }

    const validFormats = ['image/png', 'image/jpeg']
    if (!validFormats.includes(file.type)) {
        console.error('Invalid file format. Please upload a PNG or JPEG image.')
        return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
        const response = await $fetch<{id: number}>(`/api/images/${type}`, {
            method: 'POST',
            body: formData,
        })

        await $fetch('/api/communities', {
            method: 'POST',
            body: {
                id: communityId.value,
                [`${type}ImageId`]: response.id,
            },
        })
        // @ts-ignore
        community[`${type}ImageId`] = response.id
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const isEditing = ref(false)
const openEditor = () => {
    if (isLoggedIn) {
        isEditing.value = true
    }
}

const items = [
    { label: 'Awards', icon: 'i-heroicons-trophy', slot: 'awards' },
    { label: 'Benutzer', icon: 'i-heroicons-users', slot: 'users' },
    { label: 'Posts', icon: 'i-heroicons-chat-bubble-left', slot: 'posts' },
]

const danger = [{
    label: 'Gefährliche Optionen',
    icon: 'i-heroicons-information-circle',
    defaultOpen: false,
    slot: 'danger'
}]

const selected = computed({
    get() {
        const index = items.findIndex(item => item.label === route.query.tab)
        return index !== -1 ? index : 0
    },
    set(value) {
        router.replace({ query: { tab: items[value].label }})
    }
})

const communityEdit = reactive({
    communityName: computedAsync(() => community.communityName),
    description: computedAsync(() => community.description)
})

const validate = (): FormError[] => {
    const errors = []

    if (!communityEdit.communityName) {
        errors.push({path: 'username', message: 'Erforderlich'})
    } else if (communityEdit.communityName.length > 15) {
        errors.push({path: 'username', message: 'Maximal 15 Zeichen'})
    }

    if (!communityEdit.description) {
        errors.push({path: 'username', message: 'Erforderlich'})
    } else if (communityEdit.description.length > 100) {
        errors.push({path: 'username', message: 'Maximal 100 Zeichen'})
    }

    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        await $fetch('/api/communities', {
            method: 'POST',
            body: {
                id: communityId.value,
                communityName: event.data.communityName,
                description: event.data.description
            },
        })

        community.communityName = event.data.communityName ?? community.communityName
        community.description = event.data.description ?? community.description
    }
    catch (error) {
        console.error('Error saving community:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Speichern der Community',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
    isEditing.value = false
}

const onPostCreated = (post: Post) => {
    posts.value.unshift(post)
}

</script>

<template>
    <UContainer>
        <UCard class="w-full">
            <template #header>
                <div class="relative w-full h-28 rounded-lg overflow-hidden bg-gray-200 group">
                    <img
                        v-if="community?.bannerImageId"
                        :src="`/api/images/${community.bannerImageId}`"
                        alt="Banner"
                        class="h-full w-full object-cover"
                    />
                    <UButton
                        v-if="isAdmin"
                        icon="line-md:edit"
                        size="2xs"
                        color="white"
                        variant="solid"
                        class="absolute top-2 right-2 cursor-pointer"
                    >
                        <input
                            type="file"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            @change="(event) => uploadImage(event, 'banner')"
                            accept=".png, .jpg, .jpeg"
                        />
                    </UButton>
                </div>
                <div class="flex flex-row justify-between mt-4">
                    <div class="flex items-center space-x-4">
                        <div class="relative inline-block">
                            <UAvatar
                                size="xl"
                                :src="(community?.profileImageId) ? `/api/images/${community?.profileImageId}` : undefined"
                                alt="Profilbild"
                            />
                            <UButton
                                v-if="isAdmin"
                                icon="line-md:edit"
                                size="2xs"
                                color="white"
                                variant="solid"
                                class="absolute bottom-1 right-1 rounded-full p-1 border "
                            >
                                <input
                                    type="file"
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    @change="(event) => uploadImage(event, 'profile')"
                                    accept=".png, .jpg, .jpeg"
                                />
                            </UButton>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-lg font-semibold ">{{ community.communityName }}</p>
                            <p>{{ community.description }}</p>
                        </div>
                    </div>
                    <UButton
                        v-if="!isAdmin"
                        icon="i-heroicons-user-circle"
                        size="sm"
                        :color="isFollowing ? 'black' : 'white'"
                        class="m-4"
                        variant="solid"
                        @click="toggleFollow"
                    />
                    <UButton
                        icon="line-md:cog"
                        size="sm"
                        color="white"
                        variant="solid"
                        class="m-4"
                        @click="openEditor"
                        v-if="isAdmin"
                    />
                </div>
            </template>
            <UModal v-model="isEditing">
                <UForm :validate="validate" :state="communityEdit" class="space-y-4" @submit="onSubmit">
                    <UCard>
                        <template #header>
                            <div class="flex justify-center">
                                <h3 class="text-lg font-semibold">Community bearbeiten</h3>
                            </div>
                        </template>
                        <UFormGroup label="Community Name" name="communityName" class="mb-4">
                            <UInput v-model="communityEdit.communityName" />
                        </UFormGroup>
                        <UFormGroup label="Beschreibung" name="description" class="mb-4">
                            <UInput v-model="communityEdit.description" />
                        </UFormGroup>
                        <UAccordion :items="danger" color="red">
                            <template #danger>
                                <UButton
                                    size="sm"
                                    class="w-full flex items-center justify-center text-center"
                                    color="red"
                                    variant="solid"
                                    label="Community löschen"
                                    icon="i-heroicons-trash"
                                    @click="deleteCommunity"
                                />
                            </template>
                        </UAccordion>
                        <template #footer>
                            <UButton
                                class="w-full flex items-center justify-center text-center"
                                size="sm"
                                color="primary"
                                variant="solid"
                                label="Speichern"
                                icon="i-heroicons-arrow-down-tray"
                                type="submit"
                            />
                        </template>
                    </UCard>
                </UForm>
            </UModal>
            <UTabs v-model="selected" :items="items">
                <template #awards>
                    <div class="flex flex-col space-y-4">
                        <CardAward v-for="award in awards" :key="award.id" :award="award" class="mt-4" />
                        <div ref="targetAwards"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="awards.length ===  0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Awards gefunden"
                        description="Es konnten awards gefunden werden."
                    />
                </template>
                <template #users>
                    <div class="flex flex-col space-y-4">
                        <CardUser v-for="user in users" :key="user.id" :user="user" class="mt-4" />
                        <div ref="targetUsers"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="users.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Communities gefunden"
                        description="Es konnten keine Communities gefunden werden."
                    />
                </template>
                <template #posts>
                    <div class="flex flex-col space-y-4">
                        <FormPost class="mt-4" @created="onPostCreated($event)" :communityId="community.id" v-if="isLoggedIn && community.id"/>
                        <CardPost v-for="post in posts" :key="post.id" :post="post" class="mt-4" />
                        <div ref="targetPosts"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="posts.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Posts gefunden"
                        description="Es konnten keine Posts gefunden werden."
                    />
                </template>
            </UTabs>
        </UCard>
    </UContainer>
</template>