import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {postSelect} from '../posts/index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const query: PrismaPagination = getPagination(getQuery(event))

    if (!event.context.login) {
        const feed = await prisma.post.findMany({
            skip: query.skip,
            take: query.take,
            select: postSelect,
            orderBy: {
                createdAt: 'desc' 
              }
        }).catch(() => {
            throw createError({
                statusCode: 400,
                statusMessage: "Database request failed"
            })
        })

        return feed
    }

    try {
        await prisma.user.findUnique({
            where: {
                id: event.context.login.userId
            },
            select: {
                communities: {
                    select: {
                        id: true
                    }
                },
                following: {
                    select: {
                        id: true
                    }
                }
            }
        })
    } catch (error) {
        console.error(error)
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    }


    const feed = await prisma.post.findMany({
        skip: query.skip,
        take: query.take,
        select: postSelect,
        orderBy: {
            createdAt: 'desc' 
          },
        where: {
            OR: [
                {
                    userId: (user?.following) ? {
                        in: user?.following.map(user => user.id)
                    } : undefined
                },
                {
                    communityId: (user?.communities) ? {
                        in: user?.communities.map(community => community.id)
                    } : undefined
                }
            ]
        }
    }).catch((error) => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed" + error
        })
    })

    return feed
})
