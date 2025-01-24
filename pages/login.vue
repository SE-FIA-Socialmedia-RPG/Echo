<template>
    <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
        <h1 style="font-size: 25px;"><b>Login</b></h1>
          <ColorScheme><USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" /></ColorScheme>
        </div>
        <br>
        <form action="registrierung.php" method="post">
            <UTooltip text="Mit dieser E-Mail wurde dein Acount verknüpft." :popper="{ placement: 'right' }">
            <label for="mail">E-Mail:</label>
            </UTooltip>
            <UInput size="sm" input type="email" id="mail" name="mail" required color="white" variant="outline" placeholder="beispiel@email.com" />
            <p></p>
            <br>
            <UTooltip text="Mindestens 10 Zeichen, inkl. Sonderzeichen und Ziffern." :popper="{ placement: 'right' }">
            <label for="passwort">Passwort:</label>
            </UTooltip>
            <UInput size="sm" type="text" id="passwort" name="passwort" required color="white" variant="outline" placeholder="Beispiel123.XYZ!" />
            <p></p>
            <br>
            <UButton icon="ep:d-arrow-right" color="primary" variant="solid" type="submit">Absenden</UButton>
        </form> 
      </template>
    </UCard>
  </UContainer>
</template>

<script setup>
</script>

<!--
<script passwortWiederholung>
if(passwort === passwortWiederholt){
    console.log('Passwort korrekt')
  }
</script>
-->

<style scoped> 
.centered {
    text-align: center;
}
</style>
  