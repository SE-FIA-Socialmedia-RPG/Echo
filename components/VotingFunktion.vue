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
                <h1 style="font-size: 25px;"><b>Umfrage-Titel</b></h1>
                Beschreibung zur Umfrage
            </UContainer>
            <template #footer>
                <UContainer class="no-padding">
                    <UContainer class="no-padding">
                        <div v-for="index in anzahlVotingOptionen" :key="index">
                            <VotingOption/>
                        </div>
                    </UContainer>
                    <br>
                    <!--UNIMPLEMENTIERT; refresh() wahrscheinlich NICHT geeignet (weil man keinen Refresh braucht)-->
                    <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right" color="primary"
                        variant="solid" :loading="status === 'pending'" @click="refresh()">Absenden</UButton>
                </UContainer>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
import VotingOption from './VotingOption.vue';
/* Anzahl Voting Optionen, ref(5) ist ein Platzhalter */
const anzahlVotingOptionen = ref(5)

/*const id = ref(1)

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
</style>