import {PrismaClient} from '@prisma/client'
import {communitySelect} from './index.get'

const prisma = new PrismaClient()

export type CommunityBody = {
    id?: number
    communityName?: string
    description?: string
    bannerImageId?: number
    backgroundImageId?: number
    profileImageId?: number
}

export default defineEventHandler(async (event) => {
    const body: CommunityBody = await readBody(event)

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (!body.id) {

        if (!body.communityName) {
            createError({
                statusCode: 400,
                statusMessage: 'Cant make a community without a name or admin'
            })
        }

        const community = await prisma.community.create({
            data: {
                communityName: body.communityName,
                description: body.description,
                users: {
                    connect: {id: event.context.login.userId}
                },
                bannerImageId: body.bannerImageId,
                profileImageId: body.profileImageId,
                backgroundImageId: body.backgroundImageId,
                adminUser: {
                    connect: {id: event.context.login.userId}
                }
            },
            select: communitySelect
        }).catch(() => {
            throw createError({
                statusCode: 400,
                statusMessage: "Database request failed"
            })
        })

        return community
    }

    const community = await prisma.community.findUnique({
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

    if (!community) {
        throw createError({
            statusCode: 404,
            statusMessage: "The user is not the creator of the community"
        })
    }

    const updatedCommunity = prisma.community.update({
        where: {
            id: body.id,
        },
        data: {
            communityName: body.communityName,
            description: body.description,
            bannerImageId: body.bannerImageId,
            profileImageId: body.profileImageId,
            backgroundImageId: body.backgroundImageId,
        },
        select: communitySelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return updatedCommunity
})
