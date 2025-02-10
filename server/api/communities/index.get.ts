import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'

const prisma = new PrismaClient()

export const communitySelect = {
    id: true,
    communityName: true,
    profileImage: true,
    backgroundImage: true,
    bannerImage: true,
    adminUserId: true,
    createdAt: true,
    updatedAt: true,
    _count: {
        select: {
            posts: true,
            users: true
        }
    }
}

export default defineEventHandler(async (event) => {

    const query: PrismaPagination = getPagination(getQuery(event))

    if (!event.context.login) {
        const userCommunities = await prisma.community.count({
            where: {
                users: {
                    some: {id: event.context.login.userId}
                }
            }
        })

        if (userCommunities > 0) {
            const communities = await prisma.community.findMany({
                skip: query.skip,
                take: query.take,
                select: communitySelect,
                where: {
                    users: {
                        some: {id: event.context.login.userId}
                    }
                }
            }).catch(() => {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Database request failed"
                })
            })

            return communities
        }
    }

    const communities = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: communitySelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return communities
})
