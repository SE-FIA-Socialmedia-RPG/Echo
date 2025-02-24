<script setup lang="ts">
const appName = ref<string>('Social Media RPG')

const {loadMe} = useAuth()

await loadMe()
</script>

<template>
    <div id="app">
        <NavigationBar />
        <NuxtPage  class="pb-16 pt-4"/>
    </div>

    <UNotifications />
</template>
