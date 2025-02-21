<script setup lang="ts">
const props = defineProps<{
    frameClass?: string
    src: string
}>()

const frameClass = props.frameClass || 'border-4 border-blue-500'
</script>

<template>
    <div class="relative inline-block">
        <UAvatar size="xl" :src="src" alt="Profilbild" class="rounded-full" />
        <!--        <div :class="`absolute inset-0 ${frameClass} rounded-full`"></div>-->
    </div>
</template>
