import type {User} from '@prisma/client'

export default function () {
    const me = useState<User | undefined>('me')

    const isLoggedIn = computed(() => me.value !== undefined)

    const loadMe = async () => {
        try {
            me.value = await $fetch<User>('/api/users/me')
        } catch (e) {
            console.error(e)
        }
    }

    return {
        me: readonly(me),
        isLoggedIn,
        loadMe,
    }
}
