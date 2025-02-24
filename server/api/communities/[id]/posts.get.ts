import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {postSelect} from '../../posts/index.get'

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

    if (!await prisma.community.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })) {
        throw createError({
            statusCode: 404,
            statusMessage: "Community not found"
        })
    }

    const posts = await prisma.post.findMany({
        skip: query.skip,
        take: query.take,
        select: postSelect,
        where: {
            communityId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return posts
})
