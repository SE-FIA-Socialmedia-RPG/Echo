import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    const community = await prisma.community.findUnique({
        where: {
            id: id
        },
        select: {
            adminUserId: true
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!community) {
        throw createError({
            statusCode: 404,
            statusMessage: "Community not found"
        })
    }

    if (event.context.login.userId != community.adminUserId) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    await prisma.community.delete({
        where: {
            id: id
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return {
        statusCode: 200,
        statusMessage: `Entry with Id ${id} was deleted.`
    }
})
