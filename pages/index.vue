<template>
    <UContainer>
        <br>
        <NeuerPost />
        <br>
        <br>
    </UContainer>
    <UContainer>
        <div v-for="index in pages" :key="index">
            <PostFeedAnsicht />
            <br>
            <br>
        </div>
    </UContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NeuerPost from '~/components/NeuerPost.vue';
import PostFeedAnsicht from '~/components/PostFeedAnsicht.vue';

export default defineComponent({
  components: {
    NeuerPost,
    PostFeedAnsicht
  },

  setup() {
    const pages = ref(25)
    const likeGedrueckt = ref(false)

    const likeDruecken = () => {
      likeGedrueckt.value = true
      // Methode zum Speichern des Likes in der Datenbank
    }

    const oeffneKommentare = () => {
      // Methode zum Öffnen (und Posten) der Kommentare
    }   

    const teilePost = () => {
      // Methode zum Kopieren des Post-Links (und evt. auch weitere Optionen zum Teilen)
    }

    return {
      pages,
      likeGedrueckt,
      likeDruecken,
      oeffneKommentare,
      teilePost
    }
  }
})

</script>

<style>
</style>