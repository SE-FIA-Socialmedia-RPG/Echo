import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import { awardSelect } from './index.get'

const prisma = new PrismaClient()

export type PostSearchBody = {
    query?: string,
    communityId?: number
}

export default defineEventHandler(async (event) => {

    const body: PostSearchBody = await readBody(event) 
    const query: PrismaPagination = getPagination(getQuery(event))

    if (!body.query){
        throw createError({
            statusCode: 400,
            statusMessage: "Body is empty"
        })
    }

    const posts = await prisma.award.findMany({
        skip: query.skip,
        take: query.take,
        select: awardSelect,
        where: {
            awardName: { contains: body.query },
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