<template>
    <UContainer>
    <UCard class="mt-10">
        <template #header>
        <div class="flex justify-between">
        <h1 style="font-size: 25px;"><b>Test, Test...</b></h1>
        </div>
        <br>
        <form action="registrierung.php" method="post">
            <!--Input-Box-->
            <UTooltip text="Undefinierter Input. Such dir was aus (im Quellcode)!" :popper="{ placement: 'right' }">
            <label for="input">Input:</label>
            </UTooltip>
            <UInput size="sm" input type="text" id="input" name="input" required color="white" variant="outline" placeholder="Input" />
            <p></p>
            <br>
            <UButton loading-icon="svg-spinners:bars-rotate-fade" icon="ep:d-arrow-right" color="primary" variant="solid" type="submit">Absenden</UButton>
        </form> 
      </template>
      <template #footer>
        <div class="flex justify-between">
        <h1 style="font-size: 25px;"><b>Output:</b></h1>
        </div>
        <br>
        <UContainer>
        <!--Output-Box-->
        <div class="box-rounded">
            XYZ
            <br>
            123
            <br>
            ABC
        </div>
      </UContainer>
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
  