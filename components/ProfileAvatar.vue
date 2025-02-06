<template>
    <div class="relative inline-block">
        <UAvatar
            size="xl"
            src="https://th.bing.com/th/id/OIP.JfZ_C0McVR-AvQDLyCW0VwHaEK?rs=1&pid=ImgDetMain"
            alt="Profilbild"
            class="rounded-full"
        />
        <div :class="`absolute inset-0 ${frameClass} rounded-full`"></div>
    </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps<{
    frameClass?: string
}>()

const frameClass = props.frameClass || 'border-4 border-blue-500'
</script>
