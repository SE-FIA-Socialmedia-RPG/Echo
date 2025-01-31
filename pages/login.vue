<template>
    <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
        <h1 style="font-size: 25px;"><b>Login</b></h1>
          
        </div>
        <br>
            <UTooltip text="Mit dieser E-Mail wurde dein Acount verknüpft." :popper="{ placement: 'right' }">
            <label for="mail">E-Mail:</label>
            </UTooltip>
            <UInput v-model="emailEingabe" size="sm" type="email" required color="white" variant="outline"
            placeholder="beispiel@email.com" />

            <p></p>
            <br>
            <UTooltip text="Falls du dein Passwort vergessen hast, kontaktiere uns." :popper="{ placement: 'right' }">
            <label for="passwort">Passwort:</label>
            </UTooltip>
            <UInput v-model="passwordEingabe" size="sm" type="password" required color="white" variant="outline"
            placeholder="Beispiel123XYZ!" />
            <p></p>
            <br>
            <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right"
                    color="primary" variant="solid" :loading="status === 'pending'" @click="loginMechanismus()">Absenden</UButton>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">

const emailEingabe = ref()
const passwordEingabe = ref()

const loginMechanismus = () => {
  const { data, status } = useFetch(() => '/api/account/' + emailEingabe.value)
  
  if (data.value && data.value.password === passwordEingabe.value) {
    // Login erfolgreich
    console.log('Login erfolgreich');
  } else {
    // Login fehlgeschlagen
    console.log('Login fehlgeschlagen');
  }
}


</script>

<style scoped> 
.centered {
    text-align: center;
}
</style>
  