import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {communitySelect} from '../communities/index.get'

const prisma = new PrismaClient()

export const awardSelect = {
    id: true,
    awardName: true,
    awardImage: true,
    adminUserId: true,
    community: {
        select: communitySelect
    },
    createdAt: true,
    updatedAt: true
}

export default defineEventHandler(async (event) => {
    const query: PrismaPagination = getPagination(getQuery(event))

    const users = await prisma.award.findMany({
        skip: query.skip,
        take: query.take,
        select: awardSelect,
        orderBy: {
            createdAt: 'desc',
        },
    })

    if (!users) {
        throw createError({
            statusCode: 404,
            statusMessage: "No users not found"
        })
    }

    return users
})
