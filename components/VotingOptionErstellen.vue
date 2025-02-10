<script setup lang="ts">

const optionBeschreibung = ref()
const optionTitel = ref()

</script>

<template>
    <UInput v-model="optionTitel" size="sm" type="text" required color="white" variant="outline" placeholder="Option-Titel" />
    <UInput v-model="optionBeschreibung" size="sm" type="text" required color="white" variant="outline" placeholder="Beschreibung" />
    <br>
</template>