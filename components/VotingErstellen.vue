<template>
    <UContainer>
        <UCard class="mt-10">
            <template #header>
                <div class="flex justify-between">
                    <!--Autor (Profil, etc), Metadaten (Datum, etc.)-->
                    <div class="flex items-center space-x-4">
                        <UAvatar size="xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Profilbild" />
                        <div class="flex flex-col">
                            <a class="text-lg font-semibold">Username</a>
                        </div>
                    </div>
                </div>
            </template>
            <UContainer class="no-padding">
                <UInput v-model="votingTitel" size="sm" type="text" required color="white" variant="outline" placeholder="Voting-Titel" />
                <UInput v-model="votingBeschreibung" size="sm" type="text" required color="white" variant="outline" placeholder="Beschreibung" />
            </UContainer>
            <template #footer>
                <UContainer class="no-padding">
                    <UContainer class="no-padding">
                        <div v-for="index in anzahlVotingOptionen" :key="index">
                            <VotingOptionErstellen/>
                        </div>
                    </UContainer>
                    <div class="buttonLayout">
                        <div class="justify">
                        <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="line-md:plus-square-twotone" color="primary"
                        variant="solid" size="sm" :loading="status === 'pending'" @click="anzahlVotingOptionenPlus()"></UButton>
                        <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="line-md:minus-square-twotone" color="primary"
                        variant="solid" size="sm" :loading="status === 'pending'" @click="anzahlVotingOptionenMinus()"></UButton>
                            </div>
                        <br>
                    <!--UNIMPLEMENTIERT; refresh() wahrscheinlich NICHT geeignet (weil man keinen Refresh braucht)-->
                    <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right" color="primary"
                        variant="solid" :loading="status === 'pending'" @click="refresh()">Erstellen</UButton>
                    </div>   
                </UContainer>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
let anzahlVotingOptionen = ref(1)
const votingTitel = ref()
const votingBeschreibung = ref()

/* Max Limit */
function anzahlVotingOptionenPlus() {
  if(anzahlVotingOptionen.value < 6) {
    anzahlVotingOptionen.value++
  }
}

function anzahlVotingOptionenMinus() {
    if(anzahlVotingOptionen.value > 1) {
    anzahlVotingOptionen.value--
  }
}

/*
const { data, status, refresh } = useFetch(() => '/api/users/' + id.value)


const response = await fetch(baseUrl + 'users?id=' + id)

return await response.json()
*/
</script>

<style scoped>
.centered {
    text-align: center;
}

.no-padding {
    padding: 0px;
}

.box-rounded {
    width: auto;
    height: auto;
    padding: 10px;
    border: 2px solid rgb(229, 229, 229);
    border-radius: 15px;
}

.flow {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.justify {
    display: flex;
    justify-content: space-between;
}

.buttonLayout {
    display: inline-block;
}

</style>