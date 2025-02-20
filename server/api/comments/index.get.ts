import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {userSelect} from '../users/index.get'
import {postSelect} from '../posts/index.get'

const prisma = new PrismaClient()

export const commentSelect = {
    id: true,
    text: true,
    user: {
        select: userSelect
    },
    post: {
        select: postSelect
    },
    _count: {
        select: {likes: true}
    },
    createdAt: true,
    updatedAt: true,
}

export default defineEventHandler(async (event) => {
    const q = getQuery(event)
    const query: PrismaPagination = getPagination(q)
    const postId: number | undefined = (q.postId) ? Number(q.postId) : undefined

    const comments = prisma.comment.findMany({
        skip: query.skip,
        take: query.take,
        where: {
            postId: postId
        },
        select: commentSelect
    })

    if (!comments) {
        throw createError({
            statusCode: 404,
            statusMessage: "No comments found"
        })
    }

    return comments
})
