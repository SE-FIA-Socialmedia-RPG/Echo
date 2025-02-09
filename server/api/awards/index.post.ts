import {PrismaClient} from '@prisma/client'
import {awardSelect} from './index.get'

const prisma = new PrismaClient()

type AwardBody = {
    id?: number
    awardName?: string
    awardImageId?: number
    communityId?: number
    userId?: number
}

export default defineEventHandler(async (event) => {
    const body: AwardBody = await readBody(event)

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (!body.id) {
        if (!body.awardName || !body.communityId) {
            throw createError({
                statusCode: 400,
                statusMessage: "Title and community are required"
            })
        }

        const award = await prisma.award.create({
            data: {
                awardName: body.awardName,
                awardImageId: body.awardImageId,
                communityId: body.communityId,
                adminUserId: event.context.login.userId,
                users: (body.userId) ? {
                    connect: {id: body.userId}
                } : undefined
            },
            select: awardSelect
        }).catch(() => {
            throw createError({
                statusCode: 400,
                statusMessage: "Database request failed"
            })
        })

        return award
    }

    const award = await prisma.award.findUnique({
        where: {
            id: body.id,
            adminUserId: event.context.login.userId
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

    if (!award) {
        throw createError({
            statusCode: 400,
            statusMessage: "The user is not the creator of the award"
        })
    }

    const updatedAward = await prisma.award.update({
        where: {
            id: body.id
        },
        data: {
            awardName: body.awardName,
            awardImageId: body.awardImageId,
            communityId: body.communityId,
            users: (body.userId) ? {
                connect: {id: body.userId}
            } : undefined
        },
        select: awardSelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return updatedAward
})
