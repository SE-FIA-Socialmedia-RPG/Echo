<script setup lang="ts">
import {ref} from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import PostInterface from "./components/PostInterface.vue";

const appName = ref<string>('Social Media RPG')
</script>

<template>
    <div id="app">
        <NavigationBar />

        <NuxtPage />
    </div>
    <div>
    <PostInterface />
  </div>
</template>
