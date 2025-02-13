import {PrismaClient} from '@prisma/client'
import {userSelect} from './index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: any) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (await prisma.user.findUnique({
        where: {
            id: event.context.login.userId,
            streak: {
                gte: new Date(Date.now() - 86400000)
            }
        },
        select: {
            id: true,
        }
    }).catch((error) => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed" + error
        })
    })) {
        throw createError({
            statusCode: 400,
            statusMessage: "Streak not available - wait 24h"
        })
    }

    const user = await prisma.user.update({
        where: {
            id: event.context.login.userId
        },
        data: {
            xp: {
                increment: 1
            },
            streak: new Date(Date.now())
        },
        select: userSelect
    }).catch((error) => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed" + error
        })
    })

    return user
})
