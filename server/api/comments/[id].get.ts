import {PrismaClient} from '@prisma/client'
import {commentSelect} from './index.get'

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
        select: commentSelect
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

    return comment
})
