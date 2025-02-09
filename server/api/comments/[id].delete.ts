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

    const comment = await prisma.comment.findUnique({
        where: {
            id: id
        },
        select: {
            userId: true,
            post: {
                select: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!comment) {
        throw createError({
            statusCode: 404,
            statusMessage: "Comment not found"
        })
    }

    if (!event.context.login || event.context.login.userId != comment.userId) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    await prisma.comment.delete({
        where: {
            id: id
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    await prisma.user.update({
        where: {
            id: comment.post.user.id
        },
        data: {
            xp: {
                decrement: 1
            }
        },
        select: {
            id: true
        }
    }).catch((error) => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed" + error
        })
    })

    return {
        statusCode: 200,
        statusMessage: `Entry with Id ${id} was deleted.`
    }
})
