import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {communitySelect} from '../../communities/index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)
    const query: PrismaPagination = getPagination(getQuery(event))

    const userCommunities = await prisma.community.count({
        where: {
            users: {
                some: {id: id}
            }
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (userCommunities <= 0) {
        return []
    }

    const communities = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: communitySelect,
        where: {
            users: {
                some: {id: id}
            }
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return communities
})
