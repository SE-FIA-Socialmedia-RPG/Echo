export default defineEventHandler((event) => {
    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    return event.context.login?.user
})