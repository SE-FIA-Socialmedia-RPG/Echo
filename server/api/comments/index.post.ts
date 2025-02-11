import {PrismaClient} from '@prisma/client'
import {commentSelect} from './index.get'

const prisma = new PrismaClient()

export type CommentBody = {
    id?: number
    text?: string
    postId?: number
}

export default defineEventHandler(async (event) => {
    const body: CommentBody = await readBody(event)

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (!body.id) {

        if (!body.text || !body.postId) {
            throw createError({
                statusCode: 400,
                statusMessage: "Comments need text and a PostId"
            })
        }

        const comment = await prisma.comment.create({
            data: {
                text: body.text,
                user: {
                    connect: {id: event.context.login.userId},
                },
                post: {
                    connect: {id: body.postId},
                }
            },
            select: commentSelect
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
                    increment: 1
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
    }

    if (body.postId) {
        throw createError({
            statusCode: 400,
            statusMessage: "PostId cannot change"
        })
    }

    const comment = await prisma.comment.findUnique({
        where: {
            id: body.id,
            userId: event.context.login.userId
        },
        select: {
            id: true
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!comment) {
        throw createError({
            statusCode: 400,
            statusMessage: "The user is not the creator of the comment"
        })
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: body.id
        },
        data: {
            text: body.text,
        },
        select: commentSelect,
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return updatedComment
})
