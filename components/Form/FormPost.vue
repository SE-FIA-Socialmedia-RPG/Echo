<script setup lang="ts">
import type {FormError} from '#ui/types'

const isOpen = ref(false)
const status = ref('idle')
const ausgabe = ref('')

const post = reactive({
    id: '',
    title: 'fdsfsdfdsds',
    text: 'fdsfdsfsd',
    imageId: '',
    communityId: '',
})

const imageUrl = ref('') // State to store the preview image URL

// POST-API-Aufruf
async function onSubmit() {
    status.value = 'pending'

    try {
        const _post = await $fetch('/api/posts', {
            method: 'POST',
            body: {
                id: post.id,
                title: post.title,
                text: post.text,
                imageId: post.imageId,
                communityId: post.communityId,
            },
        })

        console.log(_post)
    } catch (error) {
        ausgabe.value = 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
    } finally {
        status.value = 'idle'
    }
}

const type = 'post'

const uploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0]
    if (!file) {
        console.error('No file selected.')
        return
    }

    const formData = new FormData()
    formData.append('image', file) // 'image' is the field name the backend expects

    try {
        const response = await $fetch<{id: number}>(`/api/images/${type}`, {
            // 'profile', 'banner' or 'post'
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        post.value.imageId = data.id

        // Fetch the image URL using the imageId
        imageUrl.value = `/api/images/${data.id}`
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const validate = (): FormError[] => {
    const errors: FormError[] = []

    if (!post.title.length) {
        errors.push({path: 'title', message: 'Pflichtfeld'})
    }
    if (!post.text.length) {
        errors.push({path: 'text', message: 'Pflichtfeld'})
    }

    return errors
}
</script>

<template>
    <UForm
        :state="post"
        :validate="validate"
        :validate-on="['change', 'blur', 'submit']"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <div class="flex items-center justify-between mb-5">
                    <UButton icon="line-md:arrow-left" color="gray" />

                    <div class="absolute left-1/2 transform -translate-x-1/2">
                        <a class="text-2xl font-bold text-primary">Post erstellen</a>
                    </div>
                </div>

                <UFormGroup name="title">
                    <UInput
                        v-model="post.title"
                        color="primary"
                        variant="outline"
                        placeholder="Titel..."
                    />
                </UFormGroup>
            </template>

            <div class="flex flex-col space-y-4">
                <div class="flex items-start space-x-4">
                    <NuxtLink to="/profile">
                        <UAvatar
                            src="https://avatars.githubusercontent.com/u/739984?v=4"
                            alt="Avatar"
                            class="transform transition duration-5000 hover:scale-150 cursor-pointer"
                        />
                    </NuxtLink>

                    <UFormGroup name="text">
                        <UTextarea
                            v-model="post.text"
                            :padded="false"
                            placeholder="Dein Text ..."
                            variant="none"
                            class="w-full"
                            :rows="7"
                            expandable
                        />
                    </UFormGroup>
                </div>

                <div class="flex flex-row">
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        alt="Image Preview"
                        class="hover:border border-primary rounded-md"
                        width="300"
                        height="400"
                        draggable="false"
                    />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between w-full h-8">
                    <UButton label="Bild hochladen" @click="isOpen = true" />
                    <UModal v-model="isOpen">
                        <UCard
                            :ui="{
                                ring: '',
                                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                            }"
                        >
                            <template #header>
                                <div class="flex-grow flex flex-col justify-end">
                                    Bild hier hochladen:
                                </div>
                            </template>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                @change="uploadImage"
                            />
                            <template #footer>
                                <div class="flex justify-end w-full h-8">
                                    <UButton color="primary" variant="solid" @click="isOpen = false"
                                        >Fertig</UButton
                                    >
                                </div>
                            </template>
                        </UCard>
                    </UModal>

                    <UButton
                        :loading="status === 'pending'"
                        type="submit"
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="primary"
                        variant="solid"
                        label="Post"
                        class="flex"
                        loading-icon="svg-spinners:bars-rotate-fade"
                        trailing
                    />
                </div>
            </template>

            <b>{{ ausgabe }}</b>
        </UCard>
    </UForm>
</template>
