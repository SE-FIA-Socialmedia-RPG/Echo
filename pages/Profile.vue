<template>
    <UCard>
    <template #header>

        <UAvatar
    size="sm"
    src="https://avatars.githubusercontent.com/u/739984?v=4"
    alt="Profilbild"
  />

        <a>
            Username
        </a>
        <UChip text="86" size="2xl" alt="Level">
        <UMeter icon="line-md:chevron-double-up" :value="86" label="NächstesLevel Fortschritt" />
        </UChip>
    </template>

    

    <template #footer>
      
    </template>
  </UCard>
</template>