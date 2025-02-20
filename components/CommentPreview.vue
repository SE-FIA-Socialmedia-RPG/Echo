<script setup lang="ts">
import { defineProps } from 'vue'
import type { User, Comment } from '@prisma/client'

const props = defineProps<{
  comment: Comment & {
    user: User
  }
}>()

</script>

<template>
  <div class="w-[400px] ...">
  <UCard class="w-xs ...">
    <template #header>
      <!--Autor (Profil, etc), Metadaten (Datum, etc.)-->
      <div class="flex items-center space-x-4 -z-50">
        <div class="flex flex-col">
          <a class="text-lg font-semibold w-md" :class="comment.user.accentColor">{{
            comment.user.username
          }}</a>
        </div>
      </div>
    </template>
    <!--Inhalt vom Comment-->
    <div class="flex flex-col w-md">
      <a class="text-lg font-semibold">{{ comment.text }}</a>
    </div>
  </UCard>
</div>
</template>
