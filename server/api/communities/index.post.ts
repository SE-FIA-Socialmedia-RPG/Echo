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
            statusMessage: 'Unauthorized',
        })
    }

    if (!body.id) {
        if (!body.communityName || !body.description) {
            createError({
                statusCode: 400,
                statusMessage: 'Cant make a community without a name, admin or description',
            })
        }

        return = await prisma.community.create({
            data: {
                communityName: body.communityName,
                description: body.description,
                users: {
                    connect: {id: event.context.login.userId},
                },
                profileImageId: body.profileImageId,
                backgroundImageId: body.backgroundImageId,
                bannerImageId: body.bannerImageId,
                adminUser: {
                    connect: {id: event.context.login.userId},
                },
            },
            select: communitySelect,
        })
    }

    const community = await prisma.community.findUnique({
        where: {
            id: body.id,
            adminUserId: event.context.login.userId,
        },
        select: {
            id: true,
        },
    })

    if (!community) {
        throw createError({
            statusCode: 404,
            statusMessage: 'The user is not the creator of the community',
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
        select: communitySelect,
    })

    return updatedCommunity
})
