import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    const isfollowing = await prisma.community.findUnique({
        where: {
            id: id,
            users: {
                some: {
                    id: event.context.login.userId
                }
            }
        }
    })

    return isfollowing !== null
})