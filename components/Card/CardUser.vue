<script setup lang="ts">
import type {User} from '@prisma/client'

type Props = {
    user: User & {
        profileImage?: {
            id: number
        }
    }
}

defineProps<Props>()

const tailwindClasses: string[] = [
    '',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-gradient-to-t from-[#f70066] to-[#a200c6] filter drop-shadow-[0_0_5px_rgba(255,0,89,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-gradient-to-r from-[#fff700] via-[#ffc400] via-[#ff8438] via-[#ff1f77] via-[#ff00bb] to-[#ee00ff] filter drop-shadow-[0_0_0.1px_rgba(238,0,255,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[radial-gradient(circle,_#fff700_15%,_#ff9500_30%,_#db1d0f_100%)] dark:filter dark:drop-shadow-[0_0_4px_rgba(224,15,0,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[linear-gradient(90deg,_#ff5c5c_15%,_#ffac38_30%,_#fef97c_45%,_#82ff80_60%,_#52bdff_75%,_#cc80ff_90%)] dark:filter dark:drop-shadow-[0_0_0.1px_rgba(227,74,74,1)] dark:drop-shadow-[0_0_4px_rgba(195,85,85,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[linear-gradient(270deg,_#ff00d9_12%,_#00ddff_100%)] filter drop-shadow-[0_0_0.1px_rgba(215,15,255,1)] dark:drop-shadow-[1px_1px_0.1px_rgba(64,0,77,1)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[url(https://cdn.7tv.app/paint/01JEDE45FTB7XTQGRFXP0BA2PT/layer/01JF06XNCYM98WZAGNT0D51SQ3/1x.webp)]',
    'bg-current text-transparent bg-clip-text bg-cover opacity-100 bg-[url(https://cdn.7tv.app/paint/01JG7HNY3EXYD9ANZ3HFAC6STJ/layer/01JGC1199ZD3HQQWJ91RM1ZAHQ/1x.webp)]',
]
</script>

<template>
    <UCard
        :key="user.id"
        :ui="{base: 'cursor-pointer'}"
        @click="navigateTo(`/profiles/${user.id}`)"
    >
        <template #header>
            <div class="text-2xl" :class="tailwindClasses[user.accentColor]">{{ user.username }}</div>
        </template>

        <div class="flex gap-4 items-center">
            <UAvatar
                size="xl"
                :src="user.profileImageId ? `/api/images/${user.profileImageId}` : undefined"
                alt="Profilbild"
            />
            <p class="grow">{{ user.bio }}</p>
        </div>
    </UCard>
</template>
