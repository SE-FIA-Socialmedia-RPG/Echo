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
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!feed) {
        createError({
            statusCode: 404,
            statusMessage: "No community posts where found"
        })
    }

    return feed
})
