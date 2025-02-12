<script setup lang="ts">
import {UButton} from '#components'
import {resolveDirective} from 'vue'

const userId = ref(7)
const isExpanded = ref(false)
const showButton = ref(true)
const textContainer = ref<HTMLElement | null>(null)
const isEditing = ref(false)
const isSettingsOpen = ref(false)
const isNameDesign = ref(false)

const isFollowing = ref(false)
const isProfileOwner = ref(true)

const user = ref({
    name: '',
    email: '',
    bio: '',
    xp: 0,
    profileImage: '',
    backgroundImage: '',
    bannerImage: '',
    accentColor: '',
    awards: 0,
    posts: 0,
    comments: 0,
    communities: 0,
    followedBy: 0,
    following: 0,
    level: 1,
    levelPercentage: 0,
    nextLevel: 0,
    userCommunities: [] as Community[],
})

const isLoading = ref(true) // Ladezustand
const userLevel = ref(1)
const levelPercentage = ref(0)
const nextLevel = ref(0)
const tempUserName = ref('')
const tempUserBio = ref('')
const badgeAmount = ref(0)

const tempUserMail = ref('')

const showButtonUnlock = ref<boolean[]>(Array(10).fill(false))
const unlocked = ref<boolean[]>(Array(10).fill(false))
const items = [
    {name: 'Blauer Name', buttonClass: 'text-blue-500', price: 5},
    {name: 'Leuchtender Name', buttonClass: 'glow', price: 12},
    {name: 'Schattierter Name', buttonClass: 'text-shadow', price: 10},
    {name: 'Neon Name', buttonClass: 'neon', price: 15},
    {name: 'Farbverlauf Name', buttonClass: 'gradient-text', price: 40},
    {name: 'Funkelnder Name', buttonClass: 'animated-sparkle', price: 25},
    {name: 'Glühender Name', buttonClass: 'animated-glow', price: 30},
    {name: 'Blitzender Name', buttonClass: 'animated-flash', price: 18},
    {name: 'Elektrischer Name', buttonClass: 'animated-electric', price: 35},
    {name: 'Regenbogen Name', buttonClass: 'animated-mystic-rainbow', price: 20},
]

const usedBackgroundImage = ref<{imgSrc: string}>({
    imgSrc: 'https://wallpaperaccess.com/full/2446842.jpg',
})

const backgroundImages = ref([
    {
        imgSrc: 'https://wallpaperaccess.com/full/2446842.jpg',
    },
    {
        imgSrc: 'https://wallpapercave.com/wp/wp9637255.jpg',
    },
    {
        imgSrc: 'https://th.bing.com/th/id/OIP.wSrgD1U0qnA2EqT5fdc2dQHaEo?rs=1&pid=ImgDetMain',
    },
])

const changeBackgroundImage = (index: number) => {
    const backgroundImage = backgroundImages.value[index]
    usedBackgroundImage.value = backgroundImage
}

const badges = ref([
    {
        imgSrc: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA',
    },
    {
        imgSrc: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA',
    },
    {
        imgSrc: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA',
    },
])

const usedBadges = ref([
    {
        imgSrc: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA',
    },
])

const showCloseIcon = ref<number | null>(null)

interface Community {
    id: number
    communityName: string
    profileImage: string | null
    backgroundImage: string | null
    bannerImage: string | null
    adminUserId: number
    createdAt: string
    updatedAt: string
    _count: {
        posts: number
        users: number
    }
}

const addBadge = (badge: {imgSrc: string}) => {
    if (usedBadges.value.length < 3) {
        usedBadges.value.push(badge)
    }
}

const removeBadge = (index: number) => {
    usedBadges.value.splice(index, 1)
}

const profileData = ref([
    ['Johannes', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Anna', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Max', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Jonas', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Bernd', 'https://avatars.githubusercontent.com/u/739984?v=4'],
])

const searchQuery = ref('')

const filteredProfiles = computed(() => {
    return profileData.value.filter((profile) =>
        profile[0].toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const expCalculator = () => {
    let currentExp = user.value.xp
    let expNeeded = 5
    let level = 0

    while (currentExp >= expNeeded) {
        currentExp -= expNeeded
        level++
        expNeeded += 5
    }

    userLevel.value = level
    levelPercentage.value = parseFloat(((currentExp / expNeeded) * 100).toFixed(1))
    nextLevel.value = expNeeded - currentExp
}

const fetchUserData = async () => {
    try {
        const response = await fetch('/api/users')
        const users = await response.json()

        const fetchedUser = users[userId.value]

        user.value.xp = fetchedUser.xp
        user.value.name = fetchedUser.username
        user.value.email = fetchedUser.email
        user.value.bio = fetchedUser.bio || ''
        user.value.profileImage = fetchedUser.profileImage || ''
        user.value.backgroundImage = fetchedUser.backgroundImage || ''
        user.value.bannerImage = fetchedUser.bannerImage || ''
        user.value.accentColor = fetchedUser.accentColor
        user.value.awards = fetchedUser._count.awards
        user.value.posts = fetchedUser._count.posts
        user.value.comments = fetchedUser._count.comments
        user.value.communities = fetchedUser._count.communities
        user.value.followedBy = fetchedUser._count.followedBy
        user.value.following = fetchedUser._count.following
        tempUserName.value = user.value.name
        tempUserBio.value = user.value.bio
        tempUserMail.value = user.value.email

        expCalculator()
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
    }
}

const fetchUserCommunityData = async () => {
    try {
        const response = await fetch('/api/users/' + userId.value + '/communities')
        const communities: Community[] = await response.json()

        user.value.userCommunities = []

        for (let i = 0; i < Math.min(10, communities.length); i++) {
            const fetchedCommunity = communities[i]
            user.value.userCommunities.push(fetchedCommunity)
        }

        console.log(user.value.userCommunities)
    } catch (error) {
        console.error('Fehler beim Abrufen der Communitydaten:', error)
    }
}

const clampedCheck = () => {
    if (textContainer.value) {
        showButton.value = textContainer.value.scrollHeight > textContainer.value.clientHeight
    }
}

const openEditor = () => {
    if (isProfileOwner.value) {
        isEditing.value = true
    }
}

const saveUserChange = async () => {
    await $fetch('/api/users', {
        method: 'POST',
        body: {
            id: 1,
            username: tempUserName.value,
            bio: tempUserBio.value,
        },
    })
    user.value.name = tempUserName.value
    user.value.bio = tempUserBio.value
    isEditing.value = false
}

onBeforeMount(() => {
    fetchUserData()
    fetchUserCommunityData()
})

onMounted(() => {
    clampedCheck()
})

const toggleFollow = () => {
    isFollowing.value = !isFollowing.value
}

const unfollow = () => {
    isFollowing.value = false
}
</script>

<template>
    <div
        class="fixed left-0 w-full h-full bg-cover bg-center z-0"
        :style="{backgroundImage: `url(${usedBackgroundImage.imgSrc})`}"
    ></div>

    <div class="pt-16 flex flex-col items-center p-6 min-h-screen relative z-10">
        <UCard class="w-full max-w-2xl">
            <template #header>
                <div class="relative w-full h-28 rounded-lg overflow-hidden bg-gray-200 group">
                    <img
                        alt="banner"
                        src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA"
                        class="h-full w-full object-cover"
                    />

                    <UButton
                        icon="line-md:edit"
                        size="2xs"
                        color="white"
                        variant="solid"
                        class="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        v-if="isProfileOwner"
                    />
                </div>
                <div class="flex flex-row justify-between">
                    <div class="flex items-center space-x-4 mt-4">
                        <div class="flex space-x-4">
                            <ProfileAvatar frameClass="border-4 border-primary-500" />
                        </div>

                        <div class="flex flex-col">
                            <a class="text-lg font-semibold animated-glow">{{ user.name }}</a>
                            <UChip :text="userLevel" size="2xl" alt="Level" class="mt-1">
                                <UMeter
                                    icon="line-md:chevron-double-up"
                                    :value="levelPercentage"
                                    :label="'Nächstes Level in: ' + nextLevel + ' Exp'"
                                />
                            </UChip>
                        </div>
                    </div>
                    <div>
                        <UButton
                            icon="line-md:cog"
                            size="xs"
                            color="white"
                            variant="solid"
                            class="mt-4"
                            @click="isSettingsOpen = true"
                        />

                        <USlideover v-model="isSettingsOpen">
                            <UCard
                                class="flex flex-col flex-1"
                                :ui="{
                                    body: {base: 'flex-1'},
                                    ring: '',
                                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                                }"
                            >
                                <template #header>
                                    <UButton
                                        color="gray"
                                        variant="ghost"
                                        size="sm"
                                        icon="i-heroicons-x-mark-20-solid"
                                        class="flex sm:hidden absolute end-5 top-5 z-10"
                                        square
                                        padded
                                        @click="isSettingsOpen = false"
                                    />
                                    <div class="flex justify-center">
                                        <p class="text-lg font-semibold">
                                            Einstellungen & Datenschutz
                                        </p>
                                    </div>
                                </template>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white-700 mb-2"
                                        >Email</label
                                    >
                                    <UInput v-model="tempUserMail" class="mt-1" disabled />
                                    <UButton
                                        size="sm"
                                        color="primary"
                                        variant="ghost"
                                        label="Email ändern"
                                        class="mt-2 text-xs"
                                    />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white-700 mb-2"
                                        >Passwort</label
                                    >
                                    <UInput placeholder="Passwort" class="mt-1" disabled />
                                    <UButton
                                        size="sm"
                                        color="primary"
                                        variant="ghost"
                                        label="Passwort ändern"
                                        class="mt-2 text-xs"
                                    />
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white-700 mb-2"
                                        >Lightmode/Darkmode</label
                                    >
                                    <UToggle
                                        on-icon="line-md:moon-alt-loop"
                                        off-icon="line-md:moon-alt-to-sunny-outline-loop-transition"
                                        size="xl"
                                    />
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white-700 mb-2"
                                        >Primärfarbe</label
                                    >
                                </div>

                                <template #footer>
                                    <div class="flex flex-row justify-between">
                                        <UButton
                                            icon="line-md:logout"
                                            size="sm"
                                            color="red"
                                            square
                                            variant="solid"
                                            label="Abmelden"
                                        />
                                        <UButton
                                            icon="line-md:remove"
                                            size="sm"
                                            color="white"
                                            square
                                            variant="solid"
                                            label="Konto Löschen"
                                            class="mr-2"
                                        />
                                    </div>
                                </template>
                            </UCard>
                        </USlideover>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap space-x-3 mt-5 items-center" id="BtnLeiste">
                    <UBadge variant="soft" size="xs" color="white">
                        <div class="flex flex-col items-center">
                            <NuxtText class="text-primary-400 text-sm">{{
                                user.followedBy
                            }}</NuxtText>
                            <NuxtText class="text-sm">Follower</NuxtText>
                        </div>
                    </UBadge>
                    <UBadge variant="soft" size="xs" color="white">
                        <div class="flex flex-col items-center">
                            <NuxtText class="text-primary-400 text-sm">{{
                                user.following
                            }}</NuxtText>
                            <NuxtText class="text-sm">Gefolgt</NuxtText>
                        </div>
                    </UBadge>
                    <div class="relative flex items-center">
                        <div>
                            <UButton
                                v-if="isProfileOwner"
                                size="sm"
                                color="white"
                                variant="solid"
                                @click="openEditor"
                            >
                                <span class="hidden sm:block">Bearbeiten</span>
                                <span class="block sm:hidden">
                                    <UIcon name="line-md:edit" />
                                </span>
                            </UButton>
                            <UModal v-model="isEditing">
                                <div class="p-4">
                                    <UCard>
                                        <template #header>
                                            <div class="flex justify-center">
                                                <h3 class="text-lg font-semibold">
                                                    Profil bearbeiten
                                                </h3>
                                            </div>
                                        </template>

                                        <div class="p-4">
                                            <div class="flex flex-row justify-between">
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-white-700 mb-2"
                                                        >Profilbild</label
                                                    >
                                                    <UAvatar
                                                        size="3xl"
                                                        src="https://avatars.githubusercontent.com/u/739984?v=4"
                                                        alt="Profilbild"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-white-700 mb-2"
                                                        >Hintergrundbild</label
                                                    >

                                                    <img
                                                        src="https://wallpaperaccess.com/full/2446842.jpg"
                                                        class="w-40 h-24 mb-4"
                                                        alt="Abzeichen"
                                                    />
                                                </div>
                                            </div>
                                            <div class="flex flex-row justify-between mb-4">
                                                <UButton
                                                    size="2xs"
                                                    color="primary"
                                                    variant="solid"
                                                    label="Bild Ändern"
                                                    class="self-start"
                                                />

                                                <UPopover>
                                                    <UButton
                                                        size="2xs"
                                                        color="primary"
                                                        variant="solid"
                                                        label="Bild Ändern"
                                                        class="self-start"
                                                    />
                                                    <template #panel>
                                                        <div class="grid grid-cols-3 gap-4 p-4">
                                                            <div
                                                                v-for="(
                                                                    backgroundImage, index
                                                                ) in backgroundImages"
                                                                :key="index"
                                                                class="relative flex flex-col justify-center items-center p-4"
                                                                style="height: 130px; width: 200px"
                                                                @mouseenter="
                                                                    showButtonUnlock[index] = true
                                                                "
                                                                @mouseleave="
                                                                    showButtonUnlock[index] = false
                                                                "
                                                            >
                                                                <div
                                                                    class="absolute flex flex-col justify-center items-center transition-opacity duration-200 w-50 h-30 border border-gray-300"
                                                                    :class="{
                                                                        'opacity-50':
                                                                            showButtonUnlock[index],
                                                                    }"
                                                                >
                                                                    <img
                                                                        class="w-full h-full"
                                                                        :src="
                                                                            backgroundImage.imgSrc
                                                                        "
                                                                    />
                                                                </div>
                                                                <UButton
                                                                    v-if="
                                                                        showButtonUnlock[index] &&
                                                                        !unlocked[index]
                                                                    "
                                                                    icon="material-symbols:lock-open-outline"
                                                                    label="Freischalten"
                                                                    size="2xs"
                                                                    color="gray"
                                                                    variant="solid"
                                                                    class="opacity-100 cursor-pointer"
                                                                    @click="
                                                                        changeBackgroundImage(index)
                                                                    "
                                                                    :ui="{
                                                                        color: {
                                                                            gray: {
                                                                                solid: 'hover:bg-white-100 dark:hover:bg-white-100',
                                                                            },
                                                                        },
                                                                    }"
                                                                    style="
                                                                        position: absolute;
                                                                        z-index: 100;
                                                                    "
                                                                />
                                                                <UButton
                                                                    v-if="
                                                                        showButtonUnlock[index] &&
                                                                        unlocked[index]
                                                                    "
                                                                    icon="material-symbols:check"
                                                                    label="Apply"
                                                                    size="2xs"
                                                                    color="gray"
                                                                    variant="solid"
                                                                    class="opacity-100 cursor-pointer"
                                                                    @click="
                                                                        changeBackgroundImage(index)
                                                                    "
                                                                    :ui="{
                                                                        color: {
                                                                            gray: {
                                                                                solid: 'hover:bg-white-100 dark:hover:bg-white-100',
                                                                            },
                                                                        },
                                                                    }"
                                                                    style="
                                                                        position: absolute;
                                                                        z-index: 100;
                                                                    "
                                                                />
                                                            </div>
                                                        </div>
                                                    </template>
                                                </UPopover>
                                            </div>

                                            <div class="mb-4">
                                                <label
                                                    class="block text-sm font-medium text-white-700 mb-2"
                                                    >Benutzername</label
                                                >
                                                <UInput v-model="tempUserName" class="mt-1" />
                                                <UPopover>
                                                    <UButton
                                                        size="2xs"
                                                        color="primary"
                                                        variant="solid"
                                                        label="Design"
                                                        class="mt-1"
                                                    />
                                                    <template #panel>
                                                        <div class="grid grid-cols-3 gap-4 p-4">
                                                            <div
                                                                v-for="(item, index) in items"
                                                                :key="index"
                                                                class="relative flex flex-col justify-center items-center border border-gray-300 p-4 item-box"
                                                                @mouseenter="
                                                                    showButtonUnlock[index] = true
                                                                "
                                                                @mouseleave="
                                                                    showButtonUnlock[index] = false
                                                                "
                                                            >
                                                                <div
                                                                    class="absolute flex flex-col justify-center items-center transition-opacity duration-200"
                                                                    :class="{
                                                                        'opacity-50':
                                                                            showButtonUnlock[index],
                                                                    }"
                                                                >
                                                                    <p
                                                                        :class="item.buttonClass"
                                                                        class="text-center"
                                                                    >
                                                                        {{ tempUserName }}
                                                                    </p>
                                                                </div>
                                                                <UButton
                                                                    v-if="
                                                                        showButtonUnlock[index] &&
                                                                        !unlocked[index]
                                                                    "
                                                                    icon="material-symbols:lock-open-outline"
                                                                    :label="`Level: ${item.price}`"
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
                                                                    style="
                                                                        position: absolute;
                                                                        z-index: 100;
                                                                    "
                                                                />
                                                                <UButton
                                                                    v-if="
                                                                        showButtonUnlock[index] &&
                                                                        unlocked[index]
                                                                    "
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
                                                                    style="
                                                                        position: absolute;
                                                                        z-index: 100;
                                                                    "
                                                                />
                                                            </div>
                                                        </div>
                                                    </template>
                                                </UPopover>
                                            </div>

                                            <div class="mb-4">
                                                <label
                                                    class="block text-sm font-medium text-white-700 mb-2"
                                                    >Bio</label
                                                >
                                                <UInput
                                                    v-model="tempUserBio"
                                                    placeholder="Gib deine Bio ein"
                                                    class="mt-1"
                                                    type="textarea"
                                                />
                                            </div>
                                        </div>

                                        <template #footer>
                                            <div class="flex justify-end p-4">
                                                <UButton
                                                    size="sm"
                                                    color="primary"
                                                    variant="solid"
                                                    label="Speichern"
                                                    @click="saveUserChange"
                                                />
                                            </div>
                                        </template>
                                    </UCard>
                                </div>
                            </UModal>
                        </div>
                        <UButton
                            v-if="!isProfileOwner && !isFollowing"
                            icon="line-md:account-add"
                            size="sm"
                            color="primary"
                            square
                            variant="solid"
                            @click="toggleFollow"
                            class="transition duration-200 ease-in-out"
                        />
                        <UButton
                            v-if="!isProfileOwner && isFollowing"
                            icon="material-symbols:person-check-outline"
                            size="sm"
                            color="white"
                            square
                            variant="solid"
                            @click="toggleFollow"
                            class="transition duration-200 ease-in-out"
                        />
                        <UButton
                            v-if="!isProfileOwner && isFollowing"
                            icon="line-md:account-delete"
                            size="sm"
                            color="red"
                            square
                            variant="solid"
                            @click="unfollow"
                            class="absolute left-0 transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100"
                        />
                    </div>

                    <UPopover>
                        <UButton
                            icon="material-symbols:groups"
                            size="xs"
                            color="primary"
                            variant="solid"
                            label="Communities"
                            :trailing="false"
                        />
                        <template #panel>
                            <div class="p-3">
                                <UInput
                                    v-model="searchQuery"
                                    :padded="false"
                                    placeholder="Search..."
                                    variant="none"
                                    class="w-full mb-5"
                                />
                                <div
                                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5 overflow-x-auto no-scrollbar pb-2 pr-2 pl-2"
                                >
                                    <SmallProfileView
                                        v-for="(profile, index) in filteredProfiles"
                                        :key="index"
                                        :profilename="profile[0]"
                                        :profilepicture="profile[1]"
                                    />
                                </div>
                            </div>
                        </template>
                    </UPopover>
                </div>
            </template>

            <div class="flex flex-row mt-4">
                <div class="flex flex-col items-center w-24 border-r pr-4">
                    <div
                        v-for="(badge, index) in usedBadges"
                        :key="index"
                        class="relative mb-4 group"
                        @mouseenter="showCloseIcon = index"
                        @mouseleave="showCloseIcon = null"
                    >
                        <img :src="badge.imgSrc" class="w-16 h-12" alt="Abzeichen" />
                        <div
                            v-if="showCloseIcon === index"
                            class="absolute top-0 right-0 text-white rounded-full h-4 w-4 flex items-center justify-center cursor-pointer"
                            @click="removeBadge(index)"
                        >
                            <UIcon name="line-md:remove" class="w-5 h-5" />
                        </div>
                    </div>
                    <UPopover v-if="isProfileOwner && usedBadges.length < 3">
                        <UButton
                            icon="material-symbols:add-circle-outline"
                            color="white"
                            variant="solid"
                        />

                        <template v-slot:panel>
                            <div class="grid grid-cols-3 gap-2 p-4">
                                <div
                                    v-for="(badge, index) in badges"
                                    :key="index"
                                    class="relative flex flex-col justify-center items-center hover:border-4 hover:border-gray-300 p-4 cursor-pointer"
                                    style="height: 60px; width: 60px"
                                    @click="addBadge(badge)"
                                >
                                    <img
                                        :src="badge.imgSrc"
                                        alt="Dynamic Image"
                                        class="object-cover h-full w-full"
                                    />
                                </div>
                            </div>
                        </template>
                    </UPopover>
                </div>
                <div class="ml-5 w-72">
                    <a
                        ref="textContainer"
                        :class="[!isExpanded ? 'line-clamp-6' : 'line-clamp-none']"
                        class="text-md"
                    >
                        {{ user.bio }}
                    </a>
                    <Ubutton
                        class="text-gray-500 cursor-pointer"
                        v-if="showButton"
                        @click="isExpanded = !isExpanded"
                    >
                        {{ isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen' }}</Ubutton
                    >
                </div>
            </div>

            <template #footer>
                <div class="flex flex-row justify-between">
                    <UButton
                        icon="material-symbols:add-2"
                        size="xs"
                        color="primary"
                        variant="solid"
                        label="Neuer Post"
                        :trailing="false"
                        v-if="isProfileOwner"
                        @click="expCalculator"
                    />
                    <UBadge color="gray" variant="solid">Posts: {{ user.posts }}</UBadge>
                </div>
            </template>
        </UCard>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
</template>

<style>
.text-gold {
    color: gold;
    font-weight: bold;
}

.text-blue-500 {
    color: #3b82f6; /* Tailwind's blue-500 */
}

.animated-sparkle {
    color: #ffcc00;
    animation: sparkle-animation 1.5s infinite;
}

@keyframes sparkle-animation {
    0%,
    100% {
        text-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00;
    }
    50% {
        text-shadow: 0 0 20px #ffcc00, 0 0 30px #ffcc00;
    }
}

/* Glühender Name */
.animated-glow {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
    animation: glow-animation 1.5s infinite alternate;
}

@keyframes glow-animation {
    0% {
        text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
    }
    100% {
        text-shadow: 0 0 20px #00ffcc, 0 0 30px #00ffcc, 0 0 40px #00ffcc;
    }
}

/* Wellen Name */
.animated-wave {
    color: #ff6347;
    animation: wave-animation 1.5s infinite;
}

@keyframes wave-animation {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}

/* Blitzender Name */
.animated-flash {
    color: #ffcc00;
    animation: flash-animation 1s infinite;
}

@keyframes flash-animation {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

/* Leuchtender Name mit Schatten */
.glow {
    color: #ffffff;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
}

/* Schattierter Name */
.text-shadow {
    color: #4a5568; /* Tailwind's gray-700 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Neon Name */
.neon {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
}

/* Farbverlauf Name */
.gradient-text {
    background: linear-gradient(90deg, #ff0080, #ff8c00, #ffd700);

    -webkit-text-fill-color: transparent;
}

.gradient-text {
    background: linear-gradient(
        45deg,
        #ff0000,
        #ff9900,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff
    );
    background-size: 200% 200%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradient-animation 3s ease infinite;
}

@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animated-electric {
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    animation: electric-animation 1.5s infinite alternate;
}

@keyframes electric-animation {
    0% {
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    }
    100% {
        text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    }
}

.animated-mystic-rainbow {
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ff69b4);
    -webkit-text-fill-color: transparent;
    animation: mystic-rainbow-animation 3s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
}

@keyframes mystic-rainbow-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.item-box {
    height: 60px;
    width: 150px;
}

@media (max-width: 600px) {
    .item-box {
        height: 45px;
        width: 112px;
    }
}
</style>
