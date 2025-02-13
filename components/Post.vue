<template>
    <UContainer>
      <UCard>
        <template #header>
          <!--Autor (Profil, etc), Metadaten (Datum, etc.)-->
          <div class="flex items-center space-x-4">
            <UAvatar
              size="xl"
              :src="post.user.profileImage?.path"
              alt="Profilbild"
            />
            <div class="flex flex-col">
              <a class="text-lg font-semibold">{{ post.user.username }}</a>
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
              icon="line-md:heart"
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
    setup() {
      let likePressed = false
  
      function pressLike() {
        likePressed = true
        // Methode zum Speichern des Likes in der Datenbank
      }
  
      return {
        pressLike
      }
    }
  })
  </script>
  
  <style>
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  
  .rightAlign {
    text-align: right;
  }
  
  .outlined-image {
    outline-style: outset;
    outline-color: #cccccc;
    outline-width: 3px;
    outline-offset: 0px;
  }
  </style>