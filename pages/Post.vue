<script></script>

<template>
  <UCard>
    <template #header>
      <UButton icon="line-md:arrow-left" color="gray" class="mb-5"></UButton>
      <UTextarea
        :rows="1"
        color="primary"
        variant="outline"
        placeholder="Titel..."
      />
    </template>
    <div class="flex flex-col space-y-4">
  <div class="flex items-start space-x-4">
    <UAvatar
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      alt="Avatar"
    />
    <UTextarea
      :padded="false"
      placeholder="Dein Text ..."
      variant="none"
      class="w-full"
      :rows="7"
      expandable
    />
  </div>
  <img
    
    src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsRVx4MwFo5_T3eAQ3i6DMIW0X7ojiwoHax6egMOKGxj4G68Nz3-jCp4itjFWx-ktqfSmtcwqVx6sT"
    width="300"
    height="400"
    draggable="false"
  />
  <div class="flex-grow flex flex-col justify-end">
    <UButton
      icon="line-md:upload-outline-loop"
      color="gray"
      variant="solid"
      class="mt-5 w-40"
    >Upload Image</UButton>
  </div>
</div>


    <template #footer>
      <div class="flex justify-end w-full h-8">
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Post"
          :trailing="false"
          class="flex justify-end"
        />
      </div>
    </template>
  </UCard>
</template>
