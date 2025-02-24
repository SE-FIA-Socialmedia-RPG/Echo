<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '#ui/types'
const {me, isLoggedIn} = useAuth()

const {data} = useFetch('/api/communities')
const {data: myCommunitiesData} = useFetch(`/api/users/${me.value?.id}/communities`, {
    immediate: isLoggedIn.value,
})

const toast = useToast()
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

const communityEdit = reactive({
    communityName: '',
    description: '',
})

const isEditing = ref(false)
const openEditor = () => {
    if (isLoggedIn) {
        isEditing.value = true
    }
}

const validate = (): FormError[] => {
    const errors = []

    if (!communityEdit.communityName) errors.push({path: 'username', message: 'Erforderlich'})
    if (!communityEdit.description) errors.push({path: 'username', message: 'Erforderlich'})

    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        await $fetch('/api/communities', {
            method: 'POST',
            body: {
                adminUserId: me.value?.id,
                communityName: event.data.communityName,
                description: event.data.description,
            },
        })
    } catch (error) {
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
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="flex justify-between">
                    <p class="text-2xl">Communities</p>
                    <UButton
                        @click="isEditing = true"
                        size="xl"
                        label="Erstellen"
                        icon="line-md:plus-circle"
                    />
                    <UModal v-model="isEditing">
                        <UForm
                            :validate="validate"
                            :state="communityEdit"
                            class="space-y-4"
                            @submit="onSubmit"
                        >
                            <UCard>
                                <template #header>
                                    <div class="flex justify-center">
                                        <h3 class="text-lg font-semibold">Community Erstellen</h3>
                                    </div>
                                </template>
                                <UFormGroup
                                    label="Community Name"
                                    name="communityName"
                                    class="mb-4"
                                >
                                    <UInput v-model="communityEdit.communityName" />
                                </UFormGroup>
                                <UFormGroup label="Beschreibung" name="description" class="mb-4">
                                    <UInput v-model="communityEdit.description" />
                                </UFormGroup>
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
                </div>
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
