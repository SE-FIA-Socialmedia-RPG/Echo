import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {communitySelect} from './index.get'

const prisma = new PrismaClient()

export type CommunitySearchBody = {
    query?: string
    userId?: number
}

export default defineEventHandler(async (event) => {

    const body: CommunitySearchBody = await readBody(event)
    const query: PrismaPagination = getPagination(getQuery(event))

    if (!body.query) {
        throw createError({
            statusCode: 400,
            statusMessage: "Query string in body is missing"
        })
    }

    const communities = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: communitySelect,
        where: {
            OR: [
                {
                    communityName: {
                        contains: body.query
                    }
                },
                {
                    adminUser: {
                        username: {
                            contains: body.query
                        }
                    }
                }
            ],
            users: {
                some: {
                    id: body.userId
                }
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
