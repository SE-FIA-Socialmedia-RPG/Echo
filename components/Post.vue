<template>
    <UContainer>
    <UCard>
        <template #header>
            <!--Autor (Profil, etc), Metadaten (Datum, etc.)-->
            <div class="flex items-center space-x-4">
              <UAvatar
                size="xl"
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Profilbild"
              />
              <div class="flex flex-col">
                <a class="text-lg font-semibold">Username</a>
            </div>
            </div>
        </template>
            <!--Inhalt vom Post-->
            <div class="flex flex-col">
                <a class="text-lg font-semibold">Text Description</a>
            </div>
            <div class="flex flex-col">
                <img src="https://cdn.akamai.steamstatic.com/steam/apps/571010/ss_b9e3a2d7fbae8be6148f4b57b8307c600c77ba01.1920x1080.jpg?t=1581557381" width="500vw" height="500vh">
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
    import { UContainer } from '#components';
    
        
        let likePressed = false
        
        function pressLike() {
            likePressed = true
            //Methode zum Speichern des Likes in der Datenbank
        }
    
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
    </style>