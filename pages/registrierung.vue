<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1 style="font-size: 25px;"><b>Registrierungs-Formular</b></h1>
        </div>
        <br>
        <UTooltip text="Dieser Name wird auf deinem Profil angezeigt." :popper="{ placement: 'right' }">
          Nutzername:
        </UTooltip>
        <UInput v-model="account.username" size="sm" type="text" required color="white" variant="outline" placeholder="Maxmustermann" />
        <p></p>
        <br>
        <UTooltip text="Mindestens 10 Zeichen, inkl. Sonderzeichen und Ziffern." :popper="{ placement: 'right' }">
          Passwort:
        </UTooltip>
        <UInput v-model="account.password" size="sm" type="password" required color="white" variant="outline" placeholder="Beispiel123.XYZ!" />
        <p></p>
        <br>
        <UTooltip text="Wiederhole das selbe Passwort wie zuvor." :popper="{ placement: 'right' }">
          Wiederhole Passwort:
        </UTooltip>
        <UInput v-model="account.passwordRepeated" size="sm" type="password" required color="white" variant="outline" placeholder="Beispiel123.XYZ!" />
        <p></p>
        <br>
        <UTooltip text="Mit dieser E-Mail wird dein Account verknüpft." :popper="{ placement: 'right' }">
          E-Mail:
        </UTooltip>
        <UInput v-model="account.email" size="sm" type="email" required color="white" variant="outline" placeholder="beispiel@email.com" />
        <p></p>
        <br>
        <div class="justify">
          <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right" color="primary" variant="solid" :loading="status === 'pending'" @click="attemptRegister()">Registrieren</UButton>
          <div class="output-text">
            <b>{{ ausgabe }}</b>
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref('idle');
const ausgabe = ref('');
const account = ref({
  username: '',
  password: '',
  passwordRepeated: '',
  email: ''
});

function attemptRegister() {
  status.value = 'pending';

  if (account.value.username === '' || account.value.password === '' || account.value.passwordRepeated === '' || account.value.email === '') {
    ausgabe.value = 'Es gibt leere Felder.';
  } else if (account.value.password !== account.value.passwordRepeated) {
    ausgabe.value = 'Passwörter stimmen nicht überein.';
  } else {
    ausgabe.value = 'Registrierung erfolgreich!';
    // API ToDo
  }

  status.value = 'idle';
}
</script>

<style scoped>
.centered {
  text-align: center;
}

.justify {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.output-text {
  margin-left: 20px;
  text-align: right;
}
</style>
