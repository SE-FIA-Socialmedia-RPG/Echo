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

    if (!await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })) {
        throw createError({
            statusCode: 404,
            statusMessage: "UserId not found"
        })
    }

    const feed = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: {
            posts: {
                select: postSelect
            }
        },
        where: {
            id: id,
            users: (event.context.login) ? {
                some: {
                    id: event.context.login.userId
                }
            } : undefined
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return feed
})
