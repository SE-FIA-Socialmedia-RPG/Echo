<script>
</script>


<template>
    <UCard>
    <template #header>
      <Placeholder class="h-8" />
      <UTextarea :rows="1" color="primary" variant="outline" placeholder="Title..." />
    </template>

    <Placeholder class="h-32" />
    <UTextarea autoresize color="gray" variant="outline" placeholder="Text..." />

    <UContainer>
    <Placeholder class="h-32" />
    <img  :src="{imageLink}" hidden width="300" height="400" draggable="false">
  </UContainer>
    <template #footer>
      <Placeholder class="h-8" />
      <UButton
    icon="i-heroicons-pencil-square"
    size="sm"
    color="primary"
    variant="solid"
    label="Post"
    :trailing="false"
  />
    </template>
  </UCard>
</template>