<script setup lang="ts">
import type {FormError} from '#ui/types'
import type {Post} from '@prisma/client'

type Props = {
    communityId?: number
}

const {communityId = undefined} = defineProps<Props>()

const emit = defineEmits<{
    created: [Post]
}>()

const toast = useToast()
const {me} = useAuth()

const {open, reset, files} = useFileDialog({
    accept: '.png,.jpg,.jpeg,.webp',
    multiple: false,
})

const hasUpload = computed(() => files.value && files.value.length > 0)

const status = ref('idle')

const post = reactive({
    id: '',
    imageId: null as null | number,
    communityId: communityId,
    title: '',
    text: '',
})

// POST-API-Aufruf
async function onSubmit() {
    status.value = 'pending'

    try {
        if (hasUpload.value) {
            const formData = new FormData()
            formData.append('image', files.value!.item(0)!) // 'image' is the field name the backend expects

            const {id: imageId} = await $fetch<{id: number}>('/api/images/post', {
                // 'profile', 'banner' or 'post'
                method: 'POST',
                body: formData,
            })

            if (!imageId) {
                throw new Error('Image upload failed')
            }

            post.imageId = imageId
        }

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

        emit('created', _post as unknown as Post)
    } catch (error) {
        toast.add({
            title: 'Fehler',
            description: 'Post konnte nicht erstellt werden',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    } finally {
        status.value = 'idle'
    }

    post.title = ''
    post.text = ''
    post.id = ''
    post.imageId = null
    post.communityId = undefined
    files.value = null
    reset()

    toast.add({
        title: 'Erfolg',
        description: 'Der Post wurde erstellt',
        icon: 'i-heroicons-check-circle',
        color: 'green',
    })
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
                <p class="text-2xl mb-5">Neuen Post erstellen</p>

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
                    <UAvatar
                        :src="(me?.profileImageId) ? `/api/images/${me?.profileImageId}` : undefined"
                        alt="Avatar"
                        class="transform transition duration-5000 hover:scale-150 cursor-pointer"
                    />

                    <UFormGroup name="text" class="w-full">
                        <UTextarea
                            v-model="post.text"
                            :padded="false"
                            placeholder="Dein Text ..."
                            class="w-full"
                            :rows="7"
                            expandable
                        />
                    </UFormGroup>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between w-full h-8">
                    <div class="flex items-center space-x-2">
                        <UButton
                            :label="`Bild ${hasUpload ? 'ersetzen' : 'hochladen'}`"
                            @click="open()"
                        />

                        <p v-if="hasUpload">Ein Bild angehängt</p>
                    </div>

                    <UButton
                        :disabled="status === 'pending'"
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
        </UCard>
    </UForm>
</template>
