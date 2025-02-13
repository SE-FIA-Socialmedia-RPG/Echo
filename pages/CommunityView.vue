<script setup lang="ts">
const isOpen = ref(false)
const member = ref(true)

const {data: community} = await useFetch('/api/communities')

const groups = [
    {
        key: 'communities',
        label: (q) => q && 'Users matching "${q}"...',
        search: async (q) => {
            if (!q) {
                return []
            }

            const users: any[] = await $fetch('/api/communities', {params: {q}})

            return communities.map((user) => ({
                id: user.id,
                label: user.name,
                suffix: user.email,
            }))
        },
    },
]
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="h-24">
                    <p class="text-2xl">Communities</p>
                    <div class="flex justify-end items-center">
                        <UButton
                            icon="i-heroicons-magnifying-glass"
                            @click="isOpen = true"
                            class="mr-5 ml-5"
                        />
                        <UToggle size="lg" v-model="member" on-icon="i-heroicons-check-badge">
                        </UToggle>
                    </div>
                </div>

                <UModal v-model="isOpen">
                    <UCommandPalette
                        multiple
                        nullable
                        :groups="[{key: 'communities', commands: communities}]"
                        :autoselect="false"
                        placeholder="Search for Communities"
                        :close-button="{
                            icon: 'i-heroicons-x-mark',
                            color: 'gray',
                            padded: false,
                            variant: 'link',
                        }"
                        :empty-state="{
                            icon: 'i-heroicons-face-frown',
                            label: '',
                            queryLabel: 'No Community found',
                        }"
                    >
                    </UCommandPalette>
                </UModal>
            </template>

            <template #footer>
                <div class="space-y-4 overflow-y-auto p-2 h-96">
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-if="member"
                        v-for="community in community"
                        :key="community.id"
                    >
                        <template #header>
                            <div class="text-2xl">
                                {{ community.communityName }}
                            </div>
                        </template>

                        <template #footer>
                            <div>
                                <UAvatar
                                    size="2xl"
                                    chip-color="green"
                                    :chip-text="community._count.users"
                                    chip-position="top-right"
                                    src="https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?rs=1&pid=ImgDetMain"
                                >
                                </UAvatar>
                                <p>
                                    {{ community.description }}
                                </p>
                            </div>
                        </template>
                    </UCard>
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-if="member"
                    >
                        <template #header>
                            <div class="text-2xl"></div>
                        </template>
                        <template #footer>
                            <div>
                                <UAvatar
                                    size="2xl"
                                    chip-color="green"
                                    :chip-text="community._count.users"
                                    chip-position="top-right"
                                    src="https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?rs=1&pid=ImgDetMain"
                                >
                                </UAvatar>
                                <p>{{ community.description }}</p>
                            </div>
                        </template>
                    </UCard>
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-if="member"
                        v-for="community in community"
                        :key="community.id"
                    >
                        <template #header>
                            <div class="text-2xl">
                                {{ community.communityName }}
                            </div>
                        </template>
                        <template #footer>
                            <div>
                                <UAvatar
                                    size="2xl"
                                    chip-color="green"
                                    :chip-text="community._count.users"
                                    chip-position="top-right"
                                    src="https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?rs=1&pid=ImgDetMain"
                                >
                                </UAvatar>
                                <p>{{ community.description }}</p>
                            </div>
                        </template>
                    </UCard>
                    <UCard
                        class="hover:scale-105 ml-5 mr-5 transform transition duration-300 border border-green-500"
                        v-if="member"
                        v-for="community in community"
                        :key="community.id"
                    >
                        <template #header>
                            <div class="text-2xl">
                                {{ community.communityName }}
                            </div>
                        </template>
                        <template #footer>
                            <div>
                                <UAvatar
                                    size="2xl"
                                    chip-color="green"
                                    :chip-text="community._count.users"
                                    chip-position="top-right"
                                    src="{{ community.profileImage }}"
                                >
                                </UAvatar>
                                <p>{{ community.description }}</p>
                            </div>
                        </template>
                    </UCard>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
