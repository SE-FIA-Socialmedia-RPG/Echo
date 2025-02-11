import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import { communitySelect } from './index.get'

const prisma = new PrismaClient()

export type PostSearchBody = {
    query?: string,
    adminUserId?: number,
    userId?: number
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

    const posts = await prisma.community.findMany({
        skip: query.skip,
        take: query.take,
        select: communitySelect,
        where:{
            OR: [ 
            {communityName: { contains: body.query }},
            {adminUser: {
                    username: { contains: body.query }
                    }
                }
            ]
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return posts
})