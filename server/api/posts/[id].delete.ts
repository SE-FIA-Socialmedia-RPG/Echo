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

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            userId: true
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!post) {
        throw createError({
            statusCode: 404,
            statusMessage: "Post not found"
        })
    }

    if (post.userId != event.context.login.userId) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    await prisma.post.delete({
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
