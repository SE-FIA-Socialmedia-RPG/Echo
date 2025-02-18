export default function () {
    const key = useCookie('key')

    const isLoggedIn = computed(() => !!key.value)

    return {
        isLoggedIn
    }
}