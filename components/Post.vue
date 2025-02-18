<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { UContainer, UCard, UAvatar, UButton, NuxtLink, } from '#components'

  import LikeButton from '~/components/LikeButton.vue'
  
  export default defineComponent({
    components: {
    NuxtLink,
    LikeButton
  },
    //Comment component importieren (TODO: UPDATE TO ACTUAL COMPONENT, THIS IS A PLACEHOLDER)
    props: {
      post: {
        type: Object as PropType<{
          id: number,
          text: string,
          image?: { path: string },
          user: {
            username: string,
            profileImageId?: number
          }
        }>,
        required: true
      }
    },
    setup(props) {
    let comments = ref([])
   
  
  const pressComment = async () => {
    const commentResponse = await $fetch(`/api/posts/${props.post.id}/comments`, {
          method: 'GET',
        }).catch((error) =>{
          console.error('Error fetching comments:', error)
          throw Error (error)
        })
        comments.value.push(...commentResponse)
        console.log(comments)
        //die API response kommt in das Comment component wenn Comments geklickt wird
    }
    return {
      pressComment
    }
  }
})
  </script>

<template>
    <UContainer>
      <UCard>
        <template #header>
          <!--Autor (Profil, etc), Metadaten (Datum, etc.):src="`/api/images/${post.user.profileImageId}`"-->
          <div class="flex items-center space-x-4 -z-50">
            <UAvatar
              size="xl"
              :src="`/api/images/` + post.user.profileImageId"
              alt="Profilbild"
            />
            <div class="flex flex-col">
              <a class="text-lg font-semibold ">{{ post.user.username }}</a>
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
        <div class="rightAlign flex items-center space-x-2">
          <LikeButton
            :postId="post.id"
            :initialLikeCount="post._count.likes"
            :initiallyLiked="false"
          />
          l
        <UPopover>
            <UButton
              icon="line-md:chat-bubble"
              size="xl"
              color="gray"
              :padded="false"
              variant="ghost"
              @click="pressComment"
            />
            <template #panel>
              <div class="p-4">
                <div v-for="comment in comments" :key="comment.id">
                  <CommentTest :comment="comment" />
                </div>
              </div>
            </template>
          </UPopover>
          <a class="text-lg font-semibold">{{ post._count.comments }}</a>
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
