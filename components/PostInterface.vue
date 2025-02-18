<script setup lang="ts">
import { ref, onMounted } from 'vue';

const selected = ref(false);
const originalPoster = ref(true);
const loggedIn = ref(true);
const newComment = ref("");
const comments = ref<Comment[]>([]);
const post = ref<Post | null>(null);



const fetchPostAndComments = async () => {
  try {

    const postResponse = await $fetch(`/api/posts/${post.value?.id}`);
    post.value = postResponse;

    const commentsResponse = await $fetch(`/api/posts/${post.value?.id}/comments`);
    comments.value = commentsResponse;
    console.error('error');
  }
};

const submitComment = async () => {
  if (newComment.value.trim() === "") {
    return;
  }

  try {

    const response = await $fetch(`/api/posts/${post.value?.id}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newComment.value,
        postId: post.value?.id,
      }),
    });


    comments.value.push(response);
    newComment.value = "";
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchPostAndComments();
  fetchRandomPost();
});

const fetchRandomPost = async () => {
  try {

    const posts: post[] = await $fetch("/api/posts");
    const randomIndex = Math.floor(Math.random() * posts.length);
    post.value = posts[randomIndex];
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
    <UContainer class="items-center">
        <UCard class="max-w-sm mx-auto">
            <template #header>
                <div>
                    <UButton
                        class="mt-5 mb-5"
                        size="sm"
                        icon="i-heroicons-arrow-uturn-left"
                        alt="return"
                    ></UButton>
                </div>
                <div class="mb-10 p-5">
                    <div
                        class="w-full aspect-w-16 aspect-h-9 overflow-hidden flex justify-center"
                        v-if="post && post.image"
                    >
                        <img class="w-full h-full object-contain" :src="post.image.path" alt="" />
                    </div>
                    <h1 v-else-if="post && post.content">{{ post.content }}</h1>
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
            ></UTextarea>
            <div class="flex justify-end" alt="send comment">
                <UButton
                    icon="i-heroicons-chat-bubble-oval-left-ellipsis"
                    @click="submitComment"
                ></UButton>
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
                <div>
                    <h3>Kommentare</h3>
                    <ul>
                        <li v-for="(comment, index) in comments" :key="index">
                            {{ comment.text }}
                        </li>
                    </ul>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
