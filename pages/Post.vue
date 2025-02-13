<script setup lang="ts">
const isOpen = ref(false)
const selectedCheckbox = ref(true)
const status = ref('idle')
    const ausgabe = ref('')
    const post = ref({
      id: '',
      title: '',
      text: '',
      imageId: '',
      communityId: ''
    })

// POST-API-Aufruf
  async function attemptPost() {
    status.value = 'pending'

  try {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: post.value.id,
          title: post.value.title,
          text: post.value.text,
          imageId: post.value.imageId,
          communityId: post.value.communityId
        })
      })

      if (response.ok) {
        ausgabe.value = 'Registrierung erfolgreich!'
      } else {
        const errorData = await response.json()
        ausgabe.value = `Fehler: ${errorData.statusMessage}`
      }
    // }
  } catch (error) {
    ausgabe.value = 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
  } finally {
    status.value = 'idle'
  }
}

</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between mb-5">
        <UButton icon="line-md:arrow-left" color="gray"></UButton>
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <a class="text-2xl font-bold text-primary">Post Erstellen</a>
        </div>
      </div>
      <UTextarea
        v-model="title"
        :rows="1"
        color="primary"
        variant="outline"
        placeholder="Titel..."
      />
    </template>

    <div class="flex flex-col space-y-4">
      <div class="flex items-start space-x-4">
        <router-link to="/profile">
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
            class="transform transition duration-5000 hover:scale-150 cursor-pointer"
          />
        </router-link>
        <UTextarea
          v-model="text"
          :padded="false"
          placeholder="Dein Text ..."
          variant="none"
          class="w-full"
          :rows="7"
          expandable
        />
      </div>

      <div class="flex flex-row">
        <img
          src="https://preview.redd.it/mx0xwjn4mg361.png?width=1080&crop=smart&auto=webp&s=8659d6f3f2d4a6fd72c9ec6dcd8f66f015462f7e"
          width="300"
          height="400"
          draggable="false"
          class="hover:border border-primary rounded-md"
        />
      </div>

      <div class="flex-grow flex flex-col justify-end">
        <UButton
          icon="line-md:upload-outline-loop"
          color="gray"
          variant="solid"
          class="inline-flex items-center space-x-2 mt-5"
        >       
          Upload Image
          <input
          v-on:change="post.value.imageId = $event.target.files[0]?.name"
          type="file"
          accept=".png,.jpg,.jpeg"
          style="display: none"
          ref="fileInput"
          />
        </UButton>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between w-full h-8">
        <div>
          <UButton label="Kategorien" @click="isOpen = true" />

          <UModal v-model="isOpen">
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
              }"
            >
              <template #header>
                <a>Kategorien hinzufügen</a>
              </template>
              <UInput
                :padded="false"
                placeholder="Search..."
                variant="none"
                class="w-full mb-5"
              />
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5 overflow-x-auto no-scrollbar pb-2 pr-2 pl-2"
              >
                <div class="flex flex-row items-center">
                  <UCheckbox
                    v-model="selectedCheckbox"
                    name="Beispiel 1"
                    label="Beispiel 1"
                  />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
                <div class="flex flex-row items-center">
                  <UCheckbox
                    v-model="selectedCheckbox"
                    name="Beispiel 1"
                    label="Beispiel 1"
                  />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
                <div class="flex flex-row items-center">
                  <UCheckbox
                    v-model="selectedCheckbox"
                    name="Beispiel 1"
                    label="Beispiel 1"
                  />
                  <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    class="ml-2"
                  />
                </div>
              </div>
              <template #footer>
                <div class="flex justify-end w-full h-8">
                  <UButton color="primary" variant="solid" @click="isOpen = false" >Fertig</UButton>
                </div>
              </template>
            </UCard>
          </UModal>
        </div>

        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Post"
          :trailing="false"
          class="flex"
          loading-icon="svg-spinners:bars-rotate-fade"
          :loading="status === 'pending'"
          @click="attemptPost"
        />
      </div>
    </template>
    <b>{{ ausgabe }}</b>
  </UCard>
</template>
