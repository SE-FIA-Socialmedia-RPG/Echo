<script setup lang="ts">
import { reactive } from "vue";
const selected = ref(false);
var originalPoster = ref(true);
const loggedIn = ref(true);
</script>
<template>
  <UContainer class="items-center">
    <UCard class="max-w-sm mx-auto">
      <template #header>
        <div class="mb-10">
          <UButton
            class="mt-5 mb-5"
            size="sm"
            icon="i-heroicons-arrow-uturn-left"
            alt="return"
          ></UButton>
          <div class="w-full overflow-hidden">
            <img src="" alt="" />
          </div>
        </div>
      </template>

      <div class="flex justify-end">
        <UToggle
          v-model="selected"
          size="lg"
          class="mb-3 mr-3"
          on-icon="i-heroicons-heart"
          off-icon="i-heroicons-x-mark-20-solid"
          alt="like/dislike"
        />
      </div>
      <UTextarea
        class="mb-4"
        placeholder="Schreibe einen Kommentar..."
      ></UTextarea>
      <div class="flex justify-end" alt="send comment">
        <UButton icon="i-heroicons-chat-bubble-oval-left-ellipsis"></UButton>
      </div>

      <template #footer>
        <div class="flex justify-end mb-5">
          <UButton
            class="mr-3"
            icon="i-heroicons-pencil"
            alt="edit comment"
            v-if="originalPoster && loggedIn"
          ></UButton>
          <UButton
            icon="i-heroicons-trash"
            alt="delete comment"
            v-if="originalPoster && loggedIn"
          ></UButton>
        </div>
        <UAvatar alt="User" size="md" class="mb-3"></UAvatar><br />
        <UAvatar alt="User" size="md" class="mb-3"></UAvatar><br />
        <UAvatar alt="User" size="md" class="mb-3"></UAvatar><br />
      </template>
    </UCard>
  </UContainer>
</template>
