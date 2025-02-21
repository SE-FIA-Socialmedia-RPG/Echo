<script setup lang="ts">
const {isLoggedIn, me} = useAuth()

const links = computed(() => {
    const links = [
        [
            {
                label: 'Feed',
                icon: 'i-heroicons-home',
                to: '/',
            },
        ],
        [
            {
                label: 'Communities',
                icon: 'line-md:at',
                to: '/communities',
            },
        ],
        [
            {
                label: 'Suche',
                icon: 'line-md:search',
                to: '/search',
            },
        ],
    ]

    if (isLoggedIn.value) {
        links.push([
            {
                label: 'Profil',
                icon: 'line-md:account',
                to: `/profiles/${me.value?.id}`,
            },
        ])
    } else {
        links.push([
            {
                label: 'Anmelden',
                icon: 'line-md:account',
                to: '/login',
            },
        ])
    }

    return links
})
</script>

<template>
    <!-- Der Code für kleine Bildschirme -->
    <div
        class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 z-50"
    >
        <UHorizontalNavigation
            :links="links"
            class="border-b border-gray-200 dark:border-gray-800 m-auto container"
            :ui="{
                base: 'flex flex-col gap-0.5 md:flex-row md:gap-4',
                icon: {
                    base: 'w-6 h-6 md:w-8 md:h-8',
                },
            }"
        />
    </div>

    <!-- Der Code für große Bildschirme -->
    <div
        class="hidden md:block md:sticky md:top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 z-50"
    >
        <UHorizontalNavigation
            :links="links"
            class="border-b border-gray-200 dark:border-gray-800 m-auto container"
            :ui="{
                base: 'flex flex-col gap-0.5 md:flex-row md:gap-4',
                icon: {
                    base: 'w-6 h-6 md:w-8 md:h-8',
                },
            }"
        />
    </div>
</template>
