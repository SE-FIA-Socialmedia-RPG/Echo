  <script setup lang="ts">
  import { ref } from 'vue'

  const isOpen = ref(false)
  const status = ref('idle')
  const ausgabe = ref('')
  const post = ref({
    id: '',
    title: '',
    text: '',
    imageId: '',
    communityId: ''
  })
  const imageUrl = ref('')  // State to store the preview image URL

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
    } catch (error) {
      ausgabe.value = 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
    } finally {
      status.value = 'idle'
    }
  }

  const type = 'post'

  const uploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0]
    if (!file) {
      console.error("No file selected.")
      return
    }

    const formData = new FormData()
    formData.append('image', file)  // 'image' is the field name the backend expects

    try {
      const response = await $fetch<{ id: number }>(`/api/images/${type}`, {  // 'profile', 'banner' or 'post'
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
    post.value.imageId = data.id

    // Fetch the image URL using the imageId
    imageUrl.value = `/api/images/${data.id}`
    } catch (error) {
    console.error('Error uploading image:', error)
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
            v-if="imageUrl"
            :src="imageUrl"
            alt="Image Preview"
            class="hover:border border-primary rounded-md"
            width="300"
            height="400"
            draggable="false"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between w-full h-8">
          <div>
            <UButton label="Bild hochladen" @click="isOpen = true" />
            <UModal v-model="isOpen">
              <UCard
                :ui="{
                  ring: '',
                  divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
              >
                <template #header>
                  <div class="flex-grow flex flex-col justify-end">
                    Bild hier hochladen:
                  </div>
                </template>
                <input
                  id="file-upload"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  @change="uploadImage"
                />
                <template #footer>
                  <div class="flex justify-end w-full h-8">
                    <UButton color="primary" variant="solid" @click="isOpen = false">Fertig</UButton>
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