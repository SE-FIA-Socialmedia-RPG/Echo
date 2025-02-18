<script setup lang="ts">
import type {Post, Image} from "@prisma/client";

const route = useRoute()

const selected = ref(false);
const originalPoster = ref(true);
const loggedIn = ref(true);
const newComment = ref("");

const {data} = useFetch(`/api/posts/${route.params.id as string}`)

const post = computed<Post & { image: Image }>(() => data.value)

const comments = await $fetch(`/api/posts/${route.params.id as string}/comments`)

const submitComment = async (event: KeyboardEvent) => {
  if (newComment.value.trim() === "" || event.shiftKey) {
    return;
  }

  try {

    const response = await $fetch(`/api/comments`, {
      method: "POST",
      body: {
        text: newComment.value,
        postId: post.value?.id,
      },
    });


    comments.push(response);
    newComment.value = "";
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <UContainer class="items-center">
    <UCard class="max-w-sm mx-auto">
      <template #header>
        <div class="flex items-center gap-4">
          <UButton
              class="mt-5 mb-5"
              size="sm"
              icon="i-heroicons-arrow-uturn-left"
              alt="return"
          />

          <h1 class="text-2xl font-bold">{{ post?.title }}</h1>
        </div>

        <div class="mb-10 p-5">
          <div
              class="w-full overflow-hidden flex justify-center"
              v-if="post?.image"
          >
            <img class="w-full h-full object-contain" :src="`/api/images/${post.image.id}`" alt=""/>
          </div>

          <p v-if="post?.text" class="mt-2">{{ post?.text }}</p>
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
          v-model="newComment"
          class="mb-4"
          placeholder="Schreibe einen Kommentar..."
          @keydown.enter="submitComment($event)"
      />

      <template #footer>

        <h3 class="font-bold mb-2">Kommentare</h3>

        <div class="space-y-4">
          <UCard v-for="(comment, i) in comments" :key="comment.id">
            {{ comment.text }}


            <div class="flex justify-end mt-1 space-x-2">
              <UButton
                  v-if="originalPoster && loggedIn"
                  class=""
                  icon="i-heroicons-pencil"
                  alt="edit comment"
                  variant="ghost"
                  color="gray"
              />

              <UButton
                  v-if="originalPoster && loggedIn"
                  icon="i-heroicons-trash"
                  alt="delete comment"
                  variant="ghost"
                  color="red"
              />
            </div>
          </UCard>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>