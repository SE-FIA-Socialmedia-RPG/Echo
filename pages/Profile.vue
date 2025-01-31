<script setup lang="ts">
import {UButton} from '#components'

const isFollowing = ref(false)
const isExpanded = ref(false)
const showButton = ref(false)
const isProfileOwner = ref(true)
const textContainer = ref<HTMLElement | null>(null)
const isEditing = ref(false)
const isNameDesign = ref(false)
const userExp = ref(20000)
const userLevel = ref(1)
const levelPercentage = ref(0)
const nextLevel = ref(0)

const showButtonUnlock = ref<boolean[]>(Array(10).fill(false)) // Array für die Sichtbarkeit der Buttons
const unlocked = ref<boolean[]>(Array(10).fill(true))
const items = [
    {name: 'Blauer Name', buttonClass: 'text-blue-500'},
    {name: 'Leuchtender Name', buttonClass: 'glow'},
    {name: 'Schattierter Name', buttonClass: 'text-shadow'},
    {name: 'Neon Name', buttonClass: 'neon'},
    {name: 'Farbverlauf Name', buttonClass: 'gradient-text'},
    {name: 'Funkelnder Name', buttonClass: 'animated-sparkle'},
    {name: 'Glühender Name', buttonClass: 'animated-glow'},
    {name: 'Blitzender Name', buttonClass: 'animated-flash'},
    {name: 'Elektrischer Name', buttonClass: 'animated-electric'},
    {name: 'Regenbogen Name', buttonClass: 'animated-mystic-rainbow'},
]

const profileData = ref([
    ['Johannes', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Anna', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Max', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Jonas', 'https://avatars.githubusercontent.com/u/739984?v=4'],
    ['Bernd', 'https://avatars.githubusercontent.com/u/739984?v=4'],
])

const searchQuery = ref('')

const expCalculator = () => {
    let currentExp = userExp.value
    let expNeeded = 10
    let level = 0

    while (currentExp >= expNeeded) {
        currentExp -= expNeeded
        level++
        expNeeded += 10 * level
    }

    userLevel.value = level
    levelPercentage.value = parseFloat(((currentExp / expNeeded) * 100).toFixed(1))
    nextLevel.value = expNeeded - currentExp
}
const filteredProfiles = computed(() => {
    return profileData.value.filter((profile) =>
        profile[0].toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

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

onBeforeMount(() => {
    expCalculator()
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
        class="flex flex-col items-center p-6 bg-cover bg-center h-screen"
        style="background-image: url('')"
    >
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
                <div class="flex items-center space-x-4 mt-4">
                    <UAvatar
                        size="xl"
                        src="https://th.bing.com/th/id/OIP.JfZ_C0McVR-AvQDLyCW0VwHaEK?rs=1&pid=ImgDetMain"
                        alt="Profilbild"
                    />

                    <div class="flex flex-col">
                        <a class="text-lg font-semibold animated-electric">Username</a>
                        <UChip :text="userLevel" size="2xl" alt="Level" class="mt-1">
                            <UMeter
                                icon="line-md:chevron-double-up"
                                :value="levelPercentage"
                                :label="'Nächstes Level in: ' + nextLevel + ' Exp'"
                            />
                        </UChip>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap space-x-3 mt-5 items-center" id="BtnLeiste">
                    <UBadge variant="soft" size="xs" color="white">
                        <div class="flex flex-col items-center">
                            <NuxtText class="text-primary-400 text-sm">147k</NuxtText>
                            <NuxtText class="text-sm">Follower</NuxtText>
                        </div>
                    </UBadge>
                    <UBadge variant="soft" size="xs" color="white">
                        <div class="flex flex-col items-center">
                            <NuxtText class="text-primary-400 text-sm">214</NuxtText>
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
                                            <div class="mb-4">
                                                <label
                                                    class="block text-sm font-medium text-white-700 mb-2"
                                                    >Profilbild</label
                                                >
                                                <div class="flex flex-col items-start">
                                                    <UAvatar
                                                        size="3xl"
                                                        src="https://avatars.githubusercontent.com/u/739984?v=4"
                                                        alt="Profilbild"
                                                        class="mb-4"
                                                    />
                                                    <UButton
                                                        size="2xs"
                                                        color="primary"
                                                        variant="solid"
                                                        label="Ändern"
                                                        class="self-start"
                                                    />
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <label
                                                    class="block text-sm font-medium text-white-700 mb-2"
                                                    >Benutzername</label
                                                >
                                                <UInput
                                                    placeholder="Gib deinen Benutzernamen ein"
                                                    class="mt-1"
                                                />
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
                                                                class="relative flex flex-col justify-center items-center border border-gray-300 p-4"
                                                                style="height: 60px; width: 150px"
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
                                                                        {{ item.name }}
                                                                    </p>
                                                                </div>
                                                                <UButton
                                                                    v-if="
                                                                        showButtonUnlock[index] &&
                                                                        !unlocked[index]
                                                                    "
                                                                    icon="material-symbols:lock-open-outline"
                                                                    label="Unlock"
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
                                                    class=""
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
                    <img
                        src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA"
                        class="w-16 h-12 mb-4"
                        alt="Abzeichen"
                    />
                </div>
                <div class="ml-5 w-72">
                    <a
                        ref="textContainer"
                        :class="[!isExpanded ? 'line-clamp-6' : 'line-clamp-none']"
                        class="text-md"
                    >
                        Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan
                        hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war,
                        als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus
                        unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren
                        Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen
                        Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste
                        sich erhob und ihren jungen Körper dehnte. »Es ist ein eigentümlicher
                        Apparat«, sagte der Offizier zu dem Forschungsreisenden und überblickte mit
                        einem gewissermaßen bewundernden Blick den
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
                        label="New Post"
                        :trailing="false"
                        v-if="isProfileOwner"
                        @click="expCalculator"
                    />
                    <UBadge color="gray" variant="solid">Posts: 157</UBadge>
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
</style>
