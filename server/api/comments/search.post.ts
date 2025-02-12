import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import { commentSelect } from './index.get'


const prisma = new PrismaClient()

export type CommentSearchBody = {
    query?: string,
    userId?: number,
    postId?: number
}

export default defineEventHandler(async (event) => {

    const body: CommentSearchBody = await readBody(event) 
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
            ],
            userId: body.userId,
            postId: body.postId
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    return posts
})