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

    const award = await prisma.award.findUnique({
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

    if (!award) {
        throw createError({
            statusCode: 404,
            statusMessage: "Award not found"
        })
    }

    if (award.adminUserId != event.context.login.userId) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    await prisma.award.delete({
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
