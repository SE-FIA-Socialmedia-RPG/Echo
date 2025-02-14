<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { UContainer, UCard, UAvatar, UButton } from '#components'

  export default defineComponent({
    props: {
      post: {
        type: Object as PropType<{
          id: number,
          text: string,
          image?: { path: string },
          user: {
            username: string,
            profileImage?: { path: string }
          }
        }>,
        required: true
      }
    },
    setup(props) {
    const likePressed = ref(false)

    const pressLike = async () => {
      if (likePressed.value) return   //wurde der like button schon gedrückt? 

      try {
        const response = await $fetch(`/api/posts/${props.post.id}/like`, {
          method: 'POST',
        })

        if (response.success) {
          likePressed.value = true
        }
      } catch (error) {
        console.error('Error liking post:', error)
      }
    }

    return {
      pressLike,
      likePressed
    }
  }
})
  </script>

<template>
    <UContainer>
      <UCard>
        <template #header>
          <!--Autor (Profil, etc), Metadaten (Datum, etc.)-->
          <div class="flex items-center space-x-4 -z-50">
            <UAvatar
              size="xl"
              :src="post.user.profileImage?.path"
              alt="Profilbild"
            />
            <div class="flex flex-col">
              <a class="text-lg font-semibold">{{ post.user.username }}</a>
            </div>
            <div class="flex flex-col">
              <span v-if="post.community" class="text-sm text-gray-500">in {{ post.community.communityName }}</span>
              <span v-if="post.ad" class="text-sm text-red-500">Advertisment</span>
            </div>
          </div>
        </template>
        <!--Inhalt vom Post-->
        <div class="flex flex-col">
          <a class="text-lg font-semibold">{{ post.text }}</a>
        </div>
        <br>
        <div class="flex flex-col">
          <img :src="post.image?.path" class="outlined-image" alt="Beispielbild">
        </div>
        <template #footer>
          <!--Interaktions-Menü (Like, Reply, Share)-->
          <div class="rightAlign">
            <UButton
              :icon="likePressed ? 'line-md:heart-filled' : 'line-md:heart'"
              size="xl"
              color="gray"
              :padded="false"
              variant="ghost"
              @click="pressLike"
            />
            <!--Aktiv = "line-md:heart-filled"-->
            <a class="text-lg font-semibold">#</a>
            l
            <UButton
              icon="line-md:chat-bubble"
              size="xl"
              color="gray"
              :padded="false"
              variant="ghost"
            />
            <a class="text-lg font-semibold">#</a>
            l
            <UButton
              icon="line-md:link"
              size="xl"
              color="gray"
              :padded="false"
              variant="ghost"
            />
            <a class="text-lg font-semibold">#</a>
          </div>
        </template>
      </UCard>
    </UContainer>
  </template>