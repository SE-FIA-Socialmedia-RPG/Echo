import {PrismaClient} from '@prisma/client'
import {postSelect} from '../../posts/index.get'

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

    const post = await prisma.post.update({
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
        select: postSelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    await prisma.user.update({
        where: {
            id: post.user.id
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

    return post
})
