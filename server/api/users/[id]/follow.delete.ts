import {PrismaClient} from '@prisma/client'
import {userSelect} from '../index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
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

    if (id === event.context.login.userId) {
        throw createError({
            statusCode: 400,
            statusMessage: "You cannot unfollow yourself"
        })
    }

    await prisma.user.update({
        where: {
            id: event.context.login.userId,
            following: {
                some: {
                    id: id
                }
            }
        },
        data: {
            following: {
                disconnect: {
                    id: id
                }
            }
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

    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            xp: {
                decrement: 1
            },
            followedBy: {
                disconnect: {
                    id: event.context.login.userId
                }
            }
        },
        select: userSelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return updatedUser
})

