import type {User} from '@prisma/client'

export default function () {
    const key = useCookie('key')

    const isLoggedIn = computed(() => !!key.value)

    const me = useState<User>('me')

    const loadMe = async () => {
        if (!isLoggedIn.value) return

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
