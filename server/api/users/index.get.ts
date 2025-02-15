import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'

const prisma = new PrismaClient()

export const userSelect = {
    id: true,
    username: true,
    email: true,
    bio: true,
    xp: true,
    profileImage: true,
    backgroundImage: true,
    bannerImage: true,
    accentColor: true,
    createdAt: true,
    updatedAt: true,
    _count: {
        select: {
            awards: true,
            posts: true,
            comments: true,
            communities: true,
            followedBy: true,
            following: true
        }
    }
}

export default defineEventHandler(async (event) => {
    const query: PrismaPagination = getPagination(getQuery(event))

    const users = await prisma.user.findMany({
        skip: query.skip,
        take: query.take,
        select: userSelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!users) {
        throw createError({
            statusCode: 404,
            statusMessage: "No users where found"
        })
    }

    return users
})
