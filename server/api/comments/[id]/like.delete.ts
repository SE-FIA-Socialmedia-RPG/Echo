import {PrismaClient} from '@prisma/client'
import {commentSelect} from '../index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 400,
            statusMessage: "Unauthorized"
        })
    }

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    if (!await prisma.comment.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })) {
        throw createError({
            statusCode: 404,
            statusMessage: "CommentId not found"
        })
    }

    const comment = await prisma.comment.update({
        where: {
            id: id
        },
        data: {
            likes: {
                disconnect: {
                    id: event.context.login.userId
                }
            }
        },
        select: commentSelect
    })

    await prisma.user.update({
        where: {
            id: comment.user.id
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

    return comment
})
