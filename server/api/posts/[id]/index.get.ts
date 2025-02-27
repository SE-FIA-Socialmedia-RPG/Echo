import {PrismaClient} from '@prisma/client'
import {postSelect} from '../index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    if (!await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })) {
        throw createError({
            statusCode: 404,
            statusMessage: "PostId not found"
        })
    }

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: postSelect
    })

    if (!post) {
        throw createError({
            statusCode: 404,
            statusMessage: "Post not found"
        })
    }

    return post
})
