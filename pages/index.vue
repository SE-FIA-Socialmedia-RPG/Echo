<template>
    <UContainer>
        <UCard class="mt-10">
            <template #header>
                <div class="flex justify-between">
                    <h1 style="font-size: 25px;"><b>Test, Test...</b></h1>
                </div>
                <br>
                <!--Input-Box-->
                <UTooltip text="Undefinierter Input. Such dir was aus (im Quellcode)!" :popper="{ placement: 'right' }">
                    <label for="input">Input:</label>
                </UTooltip>
                <UInput v-model="id" size="sm" type="number" required color="white" variant="outline"
                    placeholder="Input" />
                <p></p>
                <br>
                <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="material-symbols-light:refresh"
                    color="primary" variant="solid" :loading="status === 'pending'" @click="refresh()">Refresh</UButton>
            </template>
            <template #footer>
                <div class="flex justify-between">
                    <h1 style="font-size: 25px;"><b>Output:</b></h1>
                </div>
                <br>
                <UContainer>
                    <!--Output-Box-->
                    <div class="box-rounded">
                        {{ data }}
                    </div>
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