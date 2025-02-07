<script setup lang="ts">
/* Wahrscheinlich besser, per API einfach die Werte zu fetchen*/
type Props = {
    votingOptionID: int
    prozentBar: byte
}
const props = defineProps<Props>()
</script>

<template>
    <UCheckbox label="Option Name" help="Beschreibung" />
    <UProgress :value="prozentBar" />
    <br>
</template>