import {PrismaClient} from '@prisma/client'
import {postSelect} from './index.get'

const prisma = new PrismaClient()

export type PostBody = {
    id?: number,
    title?: string,
    text?: string,
    imageId?: number,
    communityId?: number
}

export default defineEventHandler(async (event) => {
    const body: PostBody = await readBody(event)

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (!body.id) {
        if (!body.title || !body.text) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Title and text or imageId are required.'
            })
        }

        if (body.communityId) {
            const community = await prisma.community.findUnique({
                where: {
                    id: body.communityId,
                    users: {
                        some: {
                            id: event.context.login.userId
                        }
                    }
                }
            })

            if (!community) {
                throw createError({
                    statusCode: 400,
                    statusMessage: "User is not part of the community"
                })
            }
        }

        const post = await prisma.post.create({
            data: {
                text: body.text,
                title: body.title,
                imageId: body.imageId,
                userId: event.context.login.userId,
                communityId: body.communityId
            },
            select: postSelect
        })

        return post
    }

    const post = await prisma.post.findUnique({
        where: {
            id: body.id,
            userId: event.context.login.userId
        }
    })

    if (!post) {
        throw createError({
            statusCode: 400,
            statusMessage: "The user is not the creator of the post"
        })
    }

    return prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            text: body.text,
            title: body.title,
            imageId: body.imageId
        },
        select: postSelect
    })
})
