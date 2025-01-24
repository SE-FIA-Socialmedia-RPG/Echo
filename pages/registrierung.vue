<template>
    <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
        <h1 style="font-size: 25px;"><b>Registrierungs-Formular</b></h1>
        </div>
        <br>
        <form action="registrierung.php" method="post">
            <UTooltip text="Dieser Name wird auf deinem Profil angezeigt." :popper="{ placement: 'right' }">
            <label for="nutzername">Nutzername:</label>
            </UTooltip>
            <UInput size="sm" input type="text" id="nutzername" name="nutzername" required color="white" variant="outline" placeholder="Maxmustermann" />
            <p></p>
            <br>
            <UTooltip text="Mindestens 10 Zeichen, inkl. Sonderzeichen und Ziffern." :popper="{ placement: 'right' }">
            <label for="passwort">Passwort:</label>
            </UTooltip>
            <UInput size="sm" type="text" id="passwort" name="passwort" required color="white" variant="outline" placeholder="Beispiel123.XYZ!" />
            <p></p>
            <br>
            <UTooltip text="Wiederhole das selbe Passwort wie zuvor." :popper="{ placement: 'right' }">
            <label for="passwort">Wiederhole Passwort:</label>
            </UTooltip>
            <UInput size="sm" type="text" id="passwort" name="passwort" required color="white" variant="outline" placeholder="Beispiel123.XYZ!" />
            <p></p>
            <br>
            <UTooltip text="Mit dieser E-Mail wird dein Acount verknüpft." :popper="{ placement: 'right' }">
            <label for="mail">E-Mail:</label>
            </UTooltip>
            <UInput size="sm" input type="email" id="mail" name="mail" required color="white" variant="outline" placeholder="beispiel@email.com" />
            <p></p>
            <br>
            <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right" color="primary" variant="solid" type="submit">Absenden</UButton>
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
  