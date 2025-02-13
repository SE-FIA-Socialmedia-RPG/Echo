
import {ref} from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const appName = ref<string>('Social Media RPG')
</script>

<template>
    <div id="app">
        <NavigationBar />

        <NuxtPage />
    </div>

</template>
