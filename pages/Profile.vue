<script lang="ts">
import { ref } from "vue";

export default {
  name: "FollowButton",
  setup() {
    const isFollowing = ref(false);

    const toggleFollow = () => {
      isFollowing.value = !isFollowing.value;
    };

    const unfollow = () => {
      isFollowing.value = false;
    };

    return {
      isFollowing,
      toggleFollow,
      unfollow,
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
                :value="70"
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

        <div class="relative flex items-center">
          <UButton
            v-if="!isFollowing"
            icon="line-md:account-add"
            size="sm"
            color="primary"
            square
            variant="solid"
            @click="toggleFollow"
            class="transition duration-200 ease-in-out"
          />
          <UButton
            v-else
            icon="material-symbols:person-check-outline"
            size="sm"
            color="white"
            square
            variant="solid"
            @click="toggleFollow"
            class="transition duration-200 ease-in-out"
          />

          <!-- Der Entfolgen-Button, der nur beim Hover angezeigt wird -->
          <UButton
            v-if="isFollowing"
            icon="line-md:account-delete"
            size="sm"
            color="red"
            square
            variant="solid"
            @click="unfollow"
            class="absolute left-0 transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100"
          />
        </div>

        <UPopover>
          <UButton
            icon="material-symbols:groups"
            size="sm"
            color="primary"
            variant="solid"
            label="Communities"
            :trailing="false"
          />
          <template #panel>
            <div class="p-3">
              <UInput
                :padded="false"
                placeholder="Search..."
                variant="none"
                class="w-full mb-5"
              />
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5 overflow-x-auto no-scrollbar pb-2 pr-2 pl-2"
              >
                <div class="flex flex-row items-center cursor-pointer">
                  <UCheckbox name="Beispiel 1" label="Beispiel 1" />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
                <div class="flex flex-row items-center">
                  <UCheckbox name="Beispiel 1" label="Beispiel 1" />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
                <div class="flex flex-row items-center">
                  <UCheckbox name="Beispiel 1" label="Beispiel 1" />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
      <template #footer> </template>
    </UCard>
  </div>
</template>
