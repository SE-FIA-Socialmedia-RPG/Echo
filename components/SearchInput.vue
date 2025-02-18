<script setup lang="ts">
import {ref, onMounted} from 'vue'
const isOpen = ref(false)
const member = ref(false)


const items = [
  [{
    label: 'Option1',
    icon: 'i-heroicons-arrow-right',
    shortcuts: ['E'],
    click: () => {
      console.log('Option1')
    }
  }], 
  [{
    label: 'Option2',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      console.log('Option2')
    }
  }]
]
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="h-24">
                    <p class="text-2xl">Search</p>
                    <div class="flex justify-end items-center">
                        <input class="focus:border-green-600 focus:outline-hidden ..." 
                        type="text"
                        placeholder="Search for keyword" 
                        />
                        <UButton
                            icon="i-heroicons-magnifying-glass"
                            @click="isOpen = true"
                            class="mr-5 ml-5"
                        />
                        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                        <UButton color="green" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown>
                      
                    </div>
                       
                </div>
            </template>
            
        </UCard>
    </UContainer>
</template>