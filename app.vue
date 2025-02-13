<script setup lang="ts">
import {ref} from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import CommunityView from '@/components/CommunityView.vue'

const appName = ref<string>('Social Media RPG')
</script>

<template>
    <div id="app">
        <NavigationBar />
        <CommunityView />
        <NuxtPage />
    </div>
</template>
