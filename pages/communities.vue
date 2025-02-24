<script setup lang="ts">
const {me, isLoggedIn} = useAuth()

const {data} = useFetch('/api/communities')
const {data: myCommunitiesData} = useFetch(`/api/users/${me.value?.id}/communities`, {
    immediate: isLoggedIn.value,
})

const communities = computed(() => data.value || [])
const myCommunities = computed(() => myCommunitiesData.value || [])

const tabItems = computed(() => {
    const items = [
        {
            label: 'Entdecken',
            icon: 'i-heroicons-globe-europe-africa',
            slot: 'all-communities',
        },
    ]

    if (isLoggedIn.value) {
        items.unshift({
            label: 'Meine',
            icon: 'i-heroicons-home',
            slot: 'my-communities',
        })
    }

    return items
})
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <p class="text-2xl">Communities</p>
            </template>

            <UTabs :items="tabItems">
                <template #my-communities="{item}">
                    <div class="flex flex-col space-y-4">
                        <CardCommunity
                            v-for="community in myCommunities"
                            :key="community.id"
                            :community="community as any"
                            class="mt-4"
                        />

                        <UAlert
                            v-if="myCommunities.length === 0"
                            icon="i-heroicons-information-circle"
                            color="sky"
                            variant="outline"
                            title="Keine Communities gefunden"
                            description="Du bist noch nicht in einer Community."
                        />
                    </div>
                </template>
                <template #all-communities="{item}">
                    <div class="flex flex-col space-y-4">
                        <CardCommunity
                            v-for="community in communities"
                            :key="community.id"
                            :community="community as any"
                            class="mt-4"
                        />

                        <UAlert
                            v-if="communities.length === 0"
                            icon="i-heroicons-information-circle"
                            color="sky"
                            variant="outline"
                            title="Keine Communities gefunden"
                            description="Du bist noch nicht in einer Community."
                        />
                    </div>
                </template>
            </UTabs>
        </UCard>
    </UContainer>
</template>
