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
        <div class="flex space-x-4 flex-row mt-5">
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
      </template>

      <div class="flex flex-row mt-4">
        <!-- Vertikale Leiste links -->
        <div class="flex flex-col items-center w-1/2 border-r pr-4">
  <img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQEl9Jg9SpIW1KgRr7PjJZW8SvYiJxNHFxaajauOClG1SucYo3bqQotWl21Xm_hE5Mjv1Io6QdANvNVzR_QToyfCv28GZlomvBA" class="w-16 h-12 mb-4" alt="Abzeichen">
</div>
        <div class="ml-5">
          <a>
            Lorem ipsum dolor sit amet.
          </a>
        </div>
      </div>

      <template #footer> </template>
    </UCard>
  </div>
</template>

<style>
.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
