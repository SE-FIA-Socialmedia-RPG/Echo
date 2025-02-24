import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'

const prisma = new PrismaClient()

export const communitySelect = {
    id: true,
    communityName: true,
    description: true,
    profileImageId: true,
    backgroundImageId: true,
    bannerImageId: true,
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

    const communities = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: communitySelect,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return communities
})
