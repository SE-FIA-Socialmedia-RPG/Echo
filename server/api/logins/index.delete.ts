import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: any) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 400,
            statusMessage: "No current login"
        })
    }

    await prisma.login.delete({
        where: {
            id: event.context.login.id
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    delete event.context.login
    deleteCookie(event, "key")

    return {
        statusCode: 200,
        statusMessage: "User logged out"
    }
})
