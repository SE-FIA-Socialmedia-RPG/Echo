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

    await prisma.user.update({
        where: {
            id: event.context.userId
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
    })

    const user = await prisma.user.update({
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
    })

    return user
})

