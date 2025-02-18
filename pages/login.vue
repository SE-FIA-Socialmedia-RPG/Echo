<script setup lang="ts">

const router = useRouter()
const emailEingabe = ref('')
const passwordEingabe = ref('')
const message = ref('')
let buttonSpin = ref(false)

const loginMechanismus = async () => {
  buttonSpin = ref(true)

  const response = await $fetch('/api/logins', {
    method: 'POST',
    body: {
      email: emailEingabe.value,
      password: passwordEingabe.value
    }
  }).catch((error) => {
    message.value = `Login fehlgeschlagen - ${error}`
    buttonSpin = ref(false)
    throw Error(error)
  })

  router.push("/")
}

console.log(emailEingabe.value)
console.log(passwordEingabe.value)
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Login</h1>
        </div>
        <br>
        <UTooltip text="Mit dieser E-Mail wurde dein Acount verknüpft." :popper="{ placement: 'right' }">
          <label for="mail">E-Mail:</label>
        </UTooltip>
        <UInput v-model="emailEingabe" size="sm" type="email" required color="white" variant="outline"
                placeholder="beispiel@email.com"/>

        <p></p>
        <br>
        <UTooltip text="Falls du dein Passwort vergessen hast, kontaktiere uns." :popper="{ placement: 'right' }">
          <label for="passwort">Passwort:</label>
        </UTooltip>
        <UInput v-model="passwordEingabe" size="sm" type="password" required color="white" variant="outline"
                placeholder="Beispiel123XYZ!"/>
        <p></p>
        <br>
        <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right"
                 color="primary" variant="solid" :loading="buttonSpin" @click="loginMechanismus()">Absenden
        </UButton>
      </template>
    </UCard>
    <div>
      <p>{{ message }}</p>
    </div>
  </UContainer>
</template>
  