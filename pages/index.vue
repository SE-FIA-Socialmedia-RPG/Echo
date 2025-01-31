<template>
    <UContainer>
        <br>
        <NeuerPost />
        <br>
        <br>
    </UContainer>
    <UContainer>
        <PostFeedAnsicht />
        <br>
        <br>
        <PostFeedAnsicht />
        <br>
        <br>
        <PostFeedAnsicht />
    </UContainer>
</template>

<script lang="ts">
import NeuerPost from '~/components/NeuerPost.vue';
import PostFeedAnsicht from '~/components/PostFeedAnsicht.vue';

    
    let likeGedrueckt = false
    
    function likeDruecken() {
        likeGedrueckt = true
        //Methode zum Speichern des Likes in der Datenbank
    }

    function oeffneKommentare() {
        //Methode zum öffnen (und Posten) der Kommentare
    }

    function teilePost() {
        //Methode zum kopieren des Post-Link (und evt. auch weitere Optionen zum Teilen)
    }
</script>

<style>
</style>