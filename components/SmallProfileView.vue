<script setup lang="ts">
type Props = {
    profilename: string
    profilepicture: string
}
const props = defineProps<Props>()
</script>

<template>
    <router-link to="/">
        <UBadge label="{{profilename}}" color="gray" class="w-32 flex items-center justify-center">
            <template #leading>
                <UAvatar src="{{profilepicture}}" size="3xs" link="/" class="pointer" />
            </template>
        </UBadge>
    </router-link>
</template>
