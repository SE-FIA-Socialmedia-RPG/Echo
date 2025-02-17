<script lang="ts">
import { defineComponent, ref } from 'vue'
import NeuerPost from '~/components/NeuerPost.vue'
import NavigationBar from "@/components/NavigationBar.vue"
import PostFeed2 from "@/components/PostFeed2.vue"
import PostInterface from "@/components/PostInterface.vue"
</script>

<template>
    <UContainer>
        <br>
        <PostInterface />
        <br>
    </UContainer>
</template>