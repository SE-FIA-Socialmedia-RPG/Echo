<template>

<router-link to="/">
                    <UBadge
                      label= {{ profile.name }}
                      color="gray"
                      class="w-32 flex items-center justify-center"
                    >
                      <template #leading>
                        <UAvatar
                          src= {{ profile.picture }}
                          size="3xs"
                          link="/"
                          class="pointer"
                        />
                      </template>
                    </UBadge>
                  </router-link>
</template>