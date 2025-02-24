<script setup lang="ts">
import {type User, type Community, type Post, type Award} from '@prisma/client'
import {useRoute, useRouter} from 'vue-router'
import type {FormError, FormSubmitEvent} from '#ui/types'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const {me, isLoggedIn, deleteMe} = useAuth()

const userId = ref(Number(route.params.id))
const isAdmin = ref(isLoggedIn && me.value?.id === userId.value)

const isFollowing = ref(false)
computedAsync(async () => {
    try {
        const followingData = await $fetch<boolean>(`/api/users/${userId.value}/isfollowing`)
        isFollowing.value = followingData ?? false
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden des Benutzers',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
})

const user = reactive({} as User)
computedAsync(async () => {
    try {
        const userData = await $fetch<User>(`/api/users/${userId.value}`)
        if (userData) {
            Object.assign(user, userData)
        }
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Laden des Benutzers',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
})

const awards = ref<Award[]>([])
const communities = ref<Community[]>([])
const posts = ref<Post[]>([])
const pageAwards = ref(1)
const pageCommunities = ref(1)
const pagePosts = ref(1)
const loadingAwards = ref(false)
const loadingCommunities = ref(false)
const loadingPosts = ref(false)
const hasMoreAwards = ref(true)
const hasMoreCommunities = ref(true)
const hasMorePosts = ref(true)
const targetAwards = useTemplateRef('targetAwards')
const targetCommunities = useTemplateRef('targetCommunities')
const targetPosts = useTemplateRef('targetPosts')
const isNameDesign = ref(false)

const fetchResults = async (type: string, page: number) => {
    try {
        const response = await $fetch(`/api/users/${userId.value}/${type}`, {
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
    const loadingRef =
        type === 'awards'
            ? loadingAwards
            : type === 'communities'
              ? loadingCommunities
              : loadingPosts
    const pageRef =
        type === 'awards' ? pageAwards : type === 'communities' ? pageCommunities : pagePosts
    const dataRef = type === 'awards' ? awards : type === 'communities' ? communities : posts
    const hasMoreRef =
        type === 'awards'
            ? hasMoreAwards
            : type === 'communities'
              ? hasMoreCommunities
              : hasMorePosts

    if (loadingRef.value || !hasMoreRef.value) return

    loadingRef.value = true
    const newResults = await fetchResults(type, pageRef.value)

    if (newResults) {
        dataRef.value.push(...newResults)
        pageRef.value++
    } else {
        hasMoreRef.value = false
    }

    loadingRef.value = false
}

useIntersectionObserver(targetAwards, ([entry]) => {
    if (entry.isIntersecting && selected.value === 0) {
        loadMore('awards')
    }
})

useIntersectionObserver(targetCommunities, ([entry]) => {
    if (entry.isIntersecting && selected.value === 1) {
        loadMore('communities')
    }
})

useIntersectionObserver(targetPosts, ([entry]) => {
    if (entry.isIntersecting && selected.value === 2) {
        loadMore('posts')
    }
})

const toggleFollow = async () => {
    try {
        await $fetch(`/api/users/${userId.value}/follow`, {
            method: isFollowing.value ? 'DELETE' : 'POST',
        })
    } catch (error) {
        console.error('Error following / unfollowing user:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Folgen bzw. Entfolgen des Benutzers',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return
    }
    isFollowing.value = !isFollowing.value
}

const logout = async () => {
    try {
        await $fetch('/api/logins', {
            method: 'DELETE',
        })
    } catch (error) {
        console.error('Error logging out:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Abmelden',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return
    }
    deleteMe()
    navigateTo('/')
}

const deleteAccount = async () => {
    try {
        await $fetch(`/api/users/${userId.value}`, {
            method: 'DELETE',
        })
    } catch (error) {
        console.error('Error logging out:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Löschen des Accounts',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
        return
    }
    deleteMe()
    navigateTo('/')
}

const isEditing = ref(false)
const openEditor = () => {
    if (isLoggedIn) {
        isEditing.value = true
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

        await $fetch('/api/users', {
            method: 'POST',
            body: {
                id: userId.value,
                [`${type}ImageId`]: response.id,
            },
        })
        // @ts-ignore
        user[`${type}ImageId`] = response.id
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const items = [
    {label: 'Awards', icon: 'i-heroicons-trophy', slot: 'awards'},
    {label: 'Communities', icon: 'line-md:at', slot: 'communities'},
    {label: 'Posts', icon: 'i-heroicons-chat-bubble-left', slot: 'posts'},
]

const danger = [
    {
        label: 'Gefährliche Optionen',
        icon: 'i-heroicons-information-circle',
        defaultOpen: false,
        slot: 'danger',
    },
]

const selected = computed({
    get() {
        const index = items.findIndex((item) => item.label === route.query.tab)
        return index !== -1 ? index : 0
    },
    set(value) {
        router.replace({query: {tab: items[value].label}})
    },
})

const userEdit = reactive({
    username: computedAsync(() => user.username),
    bio: computedAsync(() => user.bio),
    email: computedAsync(() => user.email),
    password: undefined,
})

const validate = (): FormError[] => {
    const errors = []

    if (!userEdit.username) errors.push({path: 'username', message: 'Erforderlich'})
    if (!userEdit.bio) errors.push({path: 'bio', message: 'Erforderlich'})

    if (!userEdit.email?.length) {
        errors.push({path: 'email', message: 'Pflichtfeld'})
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEdit.email)) {
        errors.push({path: 'email', message: 'Ungültige E-Mail'})
    }

    if (userEdit.password && userEdit.password.length < 10) {
        errors.push({path: 'password', message: 'Muss mindestens 10 Zeichen enthalten'})
    }

    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        await $fetch('/api/users', {
            method: 'POST',
            body: {
                id: userId.value,
                username: event.data.username,
                bio: event.data.bio,
                email: event.data.email,
                password: event.data.password,
            },
        })

        user.username = event.data.username ?? user.username
        user.bio = event.data.bio ?? user.bio
        user.email = event.data.email ?? user.email

        delete event.data.password
    } catch (error) {
        console.error('Error saving user:', error)
        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Speichern des Benutzers',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    }
    isEditing.value = false
}

const colorModeSelected = ref(false)
const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
})

const showButtonUnlock = ref<boolean[]>(Array(10).fill(false))
const nameDesignId = ref(computedAsync(() => user.accentColor))
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

const saveUserColorChange = async (tempColor: number) => {
    await $fetch('/api/users', {
        method: 'POST',
        body: {
            id: userId.value,
            color: tempColor,
        },
    })
    nameDesignId.value = tempColor
    toast.add({title: 'Neues Design gespeichert', color: 'green'})
}
</script>

<template>
    <UContainer>
        <UCard class="w-full">
            <template #header>
                <div class="relative w-full h-28 rounded-lg overflow-hidden bg-gray-200 group">
                    <img
                        v-if="user?.bannerImageId"
                        :src="`/api/images/${user.bannerImageId}`"
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
                                v-if="user?.profileImageId"
                                size="xl"
                                :src="`/api/images/${user.profileImageId}`"
                                alt="Profilbild"
                            />
                            <UButton
                                v-if="isAdmin"
                                icon="line-md:edit"
                                size="2xs"
                                color="white"
                                variant="solid"
                                class="absolute bottom-1 right-1 rounded-full p-1 border"
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
                            <div>
                                <p
                                    class="text-lg font-semibold w-3/5"
                                    :class="tailwindClasses[nameDesignId ?? 0]"
                                >
                                    {{ user.username }}
                                </p>
                            </div>
                            <UMeter
                                icon="line-md:chevron-double-up"
                                :value="(((user.xp ?? 0) % 10) / 10) * 100"
                                :label="`Level: ${Math.floor((user.xp ?? 0) / 10)} Nächstes in: ${10 - ((user.xp ?? 0) % 10)} XP`"
                            />
                        </div>
                    </div>
                    <UButton
                        v-if="!isAdmin"
                        :icon="isFollowing ? 'line-md:account-add' : 'line-md:account-remove'"
                        size="sm"
                        :color="isFollowing ? 'primary' : 'red'"
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
                <UForm :validate="validate" :state="userEdit" class="space-y-4" @submit="onSubmit">
                    <UCard>
                        <template #header>
                            <div class="flex justify-center">
                                <h3 class="text-lg font-semibold">Profil bearbeiten</h3>
                            </div>
                        </template>
                        <UFormGroup label="Benutzername" name="username" class="mb-1">
                            <UInput v-model="userEdit.username" />
                        </UFormGroup>
                        <UButton
                            size="2xs"
                            color="primary"
                            variant="solid"
                            label="Design"
                            class="mt-1"
                            @click="isNameDesign = true"
                        />
                        <UModal v-model="isNameDesign">
                            <div class="grid grid-cols-3 gap-4 p-4">
                                <div
                                    v-for="(tailwindClass, index) in tailwindClasses"
                                    :key="index"
                                    class="relative flex flex-col justify-center items-center border border-gray-300 p-4 item-box"
                                    @mouseenter="showButtonUnlock[index] = true"
                                    @mouseleave="showButtonUnlock[index] = false"
                                >
                                    <div
                                        class="absolute flex flex-col justify-center items-center transition-opacity duration-200"
                                        :class="{
                                            'opacity-50': showButtonUnlock[index],
                                        }"
                                    >
                                        <p :class="tailwindClasses[index]" class="text-center">
                                            {{ userEdit.username }}
                                        </p>
                                    </div>
                                    <UButton
                                        v-if="showButtonUnlock[index]"
                                        icon="material-symbols:check"
                                        label="Apply"
                                        size="2xs"
                                        color="gray"
                                        variant="solid"
                                        class="opacity-100 cursor-pointer"
                                        :ui="{
                                            color: {
                                                gray: {
                                                    solid: 'hover:bg-white-100 dark:hover:bg-white-100',
                                                },
                                            },
                                        }"
                                        style="position: absolute; z-index: 100"
                                        @click="
                                            (saveUserColorChange(index), (isNameDesign = false))
                                        "
                                    />
                                </div>
                            </div>
                        </UModal>
                        <UFormGroup label="E-Mail" name="email" class="mb-4 mt-2">
                            <UInput v-model="userEdit.email" type="email" />
                        </UFormGroup>
                        <UFormGroup label="Bio" name="bio" class="mb-4">
                            <UInput v-model="userEdit.bio" type="textarea" />
                        </UFormGroup>
                        <UFormGroup label="Passwort" name="password" class="mb-4">
                            <UInput
                                v-model="userEdit.password"
                                type="password"
                                placeholder="**********"
                            />
                        </UFormGroup>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-white-700 mb-2"
                                >Darkmode/Lightmode</label
                            >
                            <ClientOnly>
                                <UToggle
                                    v-model="colorModeSelected"
                                    on-icon="line-md:moon-alt-to-sunny-outline-loop-transition"
                                    off-icon="line-md:moon-alt-loop"
                                    size="xl"
                                    @click="isDark = !isDark"
                                />
                            </ClientOnly>
                        </div>
                        <UAccordion :items="danger" color="red">
                            <template #danger>
                                <UButton
                                    size="sm"
                                    class="w-full flex items-center justify-center text-center"
                                    color="red"
                                    variant="solid"
                                    label="Account löschen"
                                    icon="i-heroicons-trash"
                                    @click="deleteAccount"
                                />
                            </template>
                        </UAccordion>
                        <template #footer>
                            <div class="flex justify-between items-center">
                                <UButton
                                    size="sm"
                                    color="red"
                                    variant="solid"
                                    label="Abmelden"
                                    icon="i-heroicons-arrow-right-end-on-rectangle"
                                    @click="logout"
                                />
                                <UButton
                                    size="sm"
                                    color="primary"
                                    variant="solid"
                                    label="Speichern"
                                    icon="i-heroicons-arrow-down-tray"
                                    type="submit"
                                />
                            </div>
                        </template>
                    </UCard>
                </UForm>
            </UModal>
            <UTabs v-model="selected" :items="items">
                <template #awards>
                    <div class="flex flex-col space-y-4">
                        <CardAward
                            v-for="award in awards"
                            :key="award.id"
                            :award="award"
                            class="mt-4"
                        />
                        <div ref="targetAwards"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="awards.length === 0"
                        icon="i-heroicons-information-circle"
                        color="sky"
                        variant="outline"
                        title="Keine Awards gefunden"
                        description="Es konnten awards gefunden werden."
                    />
                </template>
                <template #communities>
                    <div class="flex flex-col space-y-4">
                        <CardCommunity
                            v-for="community in communities"
                            :key="community.id"
                            :community="community"
                            class="mt-4"
                        />
                        <div ref="targetCommunities"></div>
                    </div>
                    <UAlert
                        class="mt-4"
                        v-if="communities.length === 0"
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
