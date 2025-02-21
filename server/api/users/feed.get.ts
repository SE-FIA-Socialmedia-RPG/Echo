import {Community, PrismaClient, User} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {postSelect} from '../posts/index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query: PrismaPagination = getPagination(getQuery(event))

    const loadDefaultFeed =
        !event.context.login ||
        (event.context.login.user.following.length === 0 &&
            event.context.login.user.communities.length === 0)

    if (loadDefaultFeed) {
        return prisma.post.findMany({
            skip: query.skip,
            take: query.take,
            select: postSelect,
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    try {
        await prisma.user.findUnique({
            where: {
                id: event.context.login.userId,
            },
            select: {
                communities: {
                    select: {
                        id: true,
                    },
                },
                following: {
                    select: {
                        id: true,
                    },
                },
            },
        })
    } catch (error) {
        console.error(error)
        throw createError({
            statusCode: 400,
            statusMessage: 'Database request failed',
        })
    }

    return prisma.post
        .findMany({
            skip: query.skip,
            take: query.take,
            select: postSelect,
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                OR: [
                    ...(event.context.login ? [{userId: event.context.login!.user.id}] : []),
                    {
                        userId: event.context.login?.user?.following
                            ? {
                                  in:
                                      event.context.login?.user?.following?.map(
                                          (user: User) => user.id
                                      ) || [],
                              }
                            : undefined,
                    },
                    {
                        communityId: event.context.login?.user?.communities
                            ? {
                                  in:
                                      event.context.login?.user?.communities?.map(
                                          (community: Community) => community.id
                                      ) || [],
                              }
                            : undefined,
                    },
                ],
            },
        })
        .catch((error) => {
            throw createError({
                statusCode: 400,
                statusMessage: 'Database request failed' + error,
            })
        })
})
