import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {postSelect} from './index.get'

const prisma = new PrismaClient()

export type PostSearchBody = {
    query?: string
    communityId?: number
    userId?: number
}

export default defineEventHandler(async (event) => {

    const body: PostSearchBody = await readBody(event)
    const query: PrismaPagination = getPagination(getQuery(event))

    if (!body.query) {
        throw createError({
            statusCode: 400,
            statusMessage: "Query string in body is missing"
        })
    }

    const posts = await prisma.post.findMany({
        skip: query.skip,
        take: query.take,
        select: postSelect,
        where: {
            OR: [
                {
                    text: {
                        contains: body.query
                    }
                },
                {
                    title: {
                        contains: body.query
                    }
                },
            ],
            userId: body.userId,
            communityId: body.communityId
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return posts
})
