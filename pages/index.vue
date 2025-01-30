<template>
    <UContainer>
        <UCard class="mt-10">
            <template #header>
                <UContainer class="no-padding">
                <div class="flex justify-between">
                    <UTooltip text="Default: Users/[#] // Fetch per Quellcode ändern!" :popper="{ placement: 'right' }">
                    <h1 style="font-size: 25px;"><b>Input (Fetch)</b></h1>
                    </UTooltip>
                </div>
                <br>
                <!--Input-Box-->
                <UInput v-model="id" size="sm" type="number" required color="white" variant="outline"
                    placeholder="Input" />
                <p></p>
                <br>
                <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="material-symbols-light:refresh"
                    color="primary" variant="solid" :loading="status === 'pending'" @click="refresh()">Refresh</UButton>
                </UContainer>
            </template>
            <template #footer>
                <UContainer class="no-padding">
                    <div class="flex justify-between">
                        <h1 style="font-size: 25px;"><b>Output:</b></h1>
                    </div>
                <br>
                <UContainer class="no-padding">
                    <!--Output-Box-->
                    <div class="box-rounded">
                        {{ data }}
                    </div>
                </UContainer>
            </UContainer>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
const id = ref(1)

const { data, status, refresh } = useFetch(() => '/api/users/' + id.value)

/*
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

.no-margin {
    margin: 0px !important;
}

.box-rounded {
    width: auto;
    height: auto;
    padding: 10px;
    border: 2px solid rgb(229, 229, 229);
    border-radius: 15px;
}
</style>