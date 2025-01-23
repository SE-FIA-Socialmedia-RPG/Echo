<script setup lang="ts">
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const appName = ref<string>('Social Media RPG')
</script>


<template>
  <UContainer>
    <div id="app">
    <NavigationBar />
    
    </div>
  </UContainer>
</template>
