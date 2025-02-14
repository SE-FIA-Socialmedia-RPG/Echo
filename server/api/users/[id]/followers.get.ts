import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import {userSelect} from '../index.get'

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
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })) {
        throw createError({
            statusCode: 404,
            statusMessage: "UserId not found"
        })
    }

    const followers = await prisma.user.findMany({
        where: {
            id: id
        },
        skip: query.skip,
        take: query.take,
        select: {
            followedBy: {
                select: userSelect
            }
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return followers
})
