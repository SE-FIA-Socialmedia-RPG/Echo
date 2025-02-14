<script setup lang="ts">
const type = ref<'profile' | 'banner' | 'post'>('profile')

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
        const response = await $fetch<{id: number}>(`/api/images/${type.value}`, {
            // 'profile', 'banner' or 'post'
            method: 'POST',
            body: formData,
        })
        console.log('Image uploaded:', response) // { id: 123 }
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}
</script>

<template>
    <input type="file" @change="uploadImage" />
</template>
