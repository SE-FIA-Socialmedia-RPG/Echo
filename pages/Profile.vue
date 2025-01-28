<script lang="ts">
import { ref, onMounted } from "vue";

export default {
  name: "FollowButton",
  setup() {
    const isFollowing = ref(false);
    const isExpanded = ref(false);
    const showButton = ref(false);
    const textContainer = ref<HTMLElement | null>(null);

    const clampedCheck = () => {
      if (textContainer.value) {
        showButton.value =
          textContainer.value.scrollHeight > textContainer.value.clientHeight;
      }
    };

    onMounted(() => {
      clampedCheck();
    });

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
      isExpanded,
      showButton,
      textContainer,
    };
  },
};
</script>

<template>
  <div class="flex flex-col items-center p-6">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="w-full h-16 rounded-lg overflow-hidden bg-gray-200">
    <img
      alt="banner"
      src=""
      class="w-full h-full object-fill"
    />
  </div>
        <div class="flex items-center space-x-4 mt-4">
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
                  <router-link to="/">
                    <UBadge label="fünfL" color="gray" class="w-32 flex items-center justify-center">
                      <template #leading>
                        <UAvatar
                          src="https://avatars.githubusercontent.com/u/739984?v=4"
                          size="3xs"
                          link="/"
                          class="pointer"
                        />
                      </template>
                    </UBadge>
                  </router-link>
                  <router-link to="/">
                    <UBadge label="NurachtL" color="gray" class="w-32 flex items-center justify-center">
                      <template #leading>
                        <UAvatar
                          src="https://avatars.githubusercontent.com/u/739984?v=4"
                          size="3xs"
                          link="/"
                          class="pointer"
                        />
                      </template>
                    </UBadge>
                  </router-link>
                  <router-link to="/">
                    <UBadge label="sechzehnzeichenL" color="gray" class="w-32 flex items-center justify-center">
                      <template #leading>
                        <UAvatar
                          src="https://avatars.githubusercontent.com/u/739984?v=4"
                          size="3xs"
                          link="/"
                          class="pointer"
                        />
                      </template>
                    </UBadge>
                  </router-link>
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </template>

      <div class="flex flex-row mt-4">
        <div class="flex flex-col items-center w-24 border-r pr-4">
          <img
            src=""
            class="w-16 h-12 mb-4"
            alt="Abzeichen"
          />
        </div>
        <div class="ml-5 w-72">
          <a
            ref="textContainer"
            :class="[!isExpanded ? 'line-clamp-6' : 'line-clamp-none']"
            class="text-md"
          >
          Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte. »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem Forschungsreisenden und überblickte mit einem gewissermaßen bewundernden Blick den
          </a>
          <Ubutton class="text-gray-500 cursor-pointer" v-if="showButton" @click="isExpanded = !isExpanded">
            {{ isExpanded ? "Weniger anzeigen" : "Mehr anzeigen" }}</Ubutton
          >
        </div>
      </div>

      <template #footer>
        <div class="flex flex-row justify-between">
          <UButton
    icon="material-symbols:add-2"
    size="xs"
    color="primary"
    variant="solid"
    label="New Post"
    :trailing="false"
  />
        <UBadge color="gray" variant="solid">Posts: 157</UBadge>
        
</div>
      </template>
    </UCard>
  </div>
</template>

<style>

</style>
