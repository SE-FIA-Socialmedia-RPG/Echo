<template>
  <div
    class="flex justify-center mt-40 border-10 border-white border-solid p-10"
  >
    <input
      type="file"
      icon="i-heroicons-file"
      size="sm"
      class="hidden hover:bg-blue-700"
      ref="fileElem"
      accept="image/png, image/jpeg, image/jpeg, image/webp"
      @change="onFileChanged($event)"
    />
    <UButton type="button" @click="onInputClicked()"> Datei auswählen</UButton>
  </div>
</template>

<script setup lang="ts">
const file = ref(null);
const fileInput = useTemplateRef("fileElem");
const onFileChanged = (event: Event) => {
  const files = (<HTMLInputElement>event.target!).files;
};
const onInputClicked = () => {
  fileInput.value?.click();
};
</script>
