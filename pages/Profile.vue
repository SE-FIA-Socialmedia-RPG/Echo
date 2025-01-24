<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'FollowButton',
  setup() {
    const isFollowing = ref(false);

    const toggleFollow = () => {
      isFollowing.value = !isFollowing.value;
    };

    return {
      isFollowing,
      toggleFollow,
    };
  },
};
</script>



<template>
    <div class="flex flex-col items-center p-6">
      <UCard class="w-full max-w-md">
        <template #header>
          <div class="flex items-center space-x-4">
            <UAvatar
              size="xl"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Profilbild"
            />
            <div class="flex flex-col">
              <a class="text-lg font-semibold">Username</a>
              <UChip text="86" size="2xl" alt="Level" class="mt-1">
                <UMeter
                  icon="line-md:chevron-double-up"
                  :value="86"
                  label="Nächstes Level Fortschritt"
                />
              </UChip>
            </div>
            
          </div>
          
        </template>
        <div class="flex space-x-4 flex-row">
            <UButton
    icon="line-md:account"
    size="sm"
    color="primary"
    variant="solid"
    label="146k"
    :trailing="false"
  />

  <div class="flex items-center">
    <UButton
      v-if="!isFollowing"
      icon="line-md:account-add"
      size="sm"
      color="primary"
      square
      variant="solid"
      @click="toggleFollow"
    />
    <UButton
      v-else
      icon="material-symbols:person-check-outline"
      size="sm"
      color="white"
      square
      variant="solid"
      @click="toggleFollow"
    />
  </div>

  <UButton
    icon="material-symbols:groups"
    size="sm"
    color="primary"
    variant="solid"
    label="Communities"
    :trailing="false"
  />


        </div>
        <template #footer>
          
        </template>
      </UCard>
    </div>
  </template>
  
  <script lang="ts">
  
  </script>