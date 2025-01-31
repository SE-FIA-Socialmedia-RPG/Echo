<script setup lang="ts">
import { UContainer } from '#components';

const isOpen = ref(false)

const options = [{
  value: 'email',
  label: 'Email'
}, {
  value: 'sms',
  label: 'Phone (SMS)'
}, {
  value: 'push',
  label: 'Push notification'
}]

const selected = ref('sms')

const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected2 = ref(people[0])

const selected3 = ref(people[0])

const value = ref(50)
</script>

<template>
<UContainer>
  <div>
    <br>
    <UButton label="Open" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
          />

          <Placeholder class="h-8" />
        </template>
        Das ist ein Slideover Fenster!
        <br>
        <br>
        <UPopover>
            <UButton color="primary" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel>
                <div class="p-4">
                    Hier ist ein Popover Text! 
                    <Placeholder class="h-20 w-48" />
                </div>
            </template>
        </UPopover>
        <br>
        <UPopover>
            <UButton color="primary" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template #panel="{ close }">
        <div class="p-8">
            Das ist auch ein Popover, aber mit einer
            <br>
            <URadioGroup v-model="selected" legend="RadioGroup" :options="options" />
            <br>
            <UButton label="Close" @click="close" />
        </div>
        </template>
        </UPopover>
        <br>
        <UPopover>
            <UButton color="primary" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel>
                <div class="p-4">
                    Hier ist ein SelectMenu!
                    <USelectMenu v-model="selected2" :options="people" />
                    <Placeholder class="h-20 w-48" />
                </div>
            </template>
        </UPopover>
        <br>
        <UPopover>
            <UButton color="primary" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel>
                <div class="p-4">
                    Hier ist ein Toggle!

                    <UToggle v-model="selected3" />
                    <Placeholder class="h-20 w-48" />
                </div>
            </template>
        </UPopover>
        <UPopover>
        <Placeholder class="h-full" />
        <UButton color="primary" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel>
                <div class="p-4">
                    Hier ist eine Range!

                    <URange v-model="value" />
                    <Placeholder class="h-20 w-48" />
                </div>
            </template>
        </UPopover>
        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </USlideover>
  </div>
</UContainer>
</template>