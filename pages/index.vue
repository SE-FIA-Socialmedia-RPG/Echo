<script setup lang="ts">
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
</script>

<template>
  <UContainer>
    <PostFeed2/>
  </UContainer>
</template>


<style>
</style>