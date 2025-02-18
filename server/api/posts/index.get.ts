import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {userSelect} from '../users/index.get'
import {communitySelect} from '../communities/index.get'

const prisma = new PrismaClient()

export const postSelect = {
    id: true,
    ad: true,
    title: true,
    image: true,
    text: true,
    user: {
        select: userSelect
    },
    community: {
        select: communitySelect
    },
    _count: {
        select: {
            likes: true,
            comments: true
        }
    },
    createdAt: true,
    updatedAt: true,
}

export default defineEventHandler(async (event) => {
    const query: PrismaPagination = getPagination(getQuery(event))

    const posts = await prisma.post.findMany({
        skip: query.skip,
        take: query.take,
        select: postSelect
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!posts) {
        throw createError({
            statusCode: 404,
            statusMessage: "No posts found"
        })
    }

    return posts
})
