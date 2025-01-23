<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  const state = reactive({
    title: 'Navigation Bar'
  })
  
  const updateTitle = (newTitle: string) => {
    state.title = newTitle
  }

  const links = [
  [{
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, {
    label: 'Horizontal Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/components/horizontal-navigation'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }], [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
  </script>
  
  <style scoped>
  
  </style>