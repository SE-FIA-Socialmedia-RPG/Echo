import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import { commentSelect } from './index.get'


const prisma = new PrismaClient()

export type PostSearchBody = {
    query?: string,
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

    const posts = await prisma.comment.findMany({
        skip: query.skip,
        take: query.take,
        select: commentSelect,
        where:{
            OR: [ 
            {text: { contains: body.query }},
            {user: {
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