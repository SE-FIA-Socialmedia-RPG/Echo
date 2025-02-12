import {PrismaClient} from '@prisma/client'
import {getPagination, PrismaPagination} from '~/server/pagination'
import { userSelect } from './index.get'

const prisma = new PrismaClient()

export type UserSearchBody = {
    query?: string
}

export default defineEventHandler(async (event) => {

    const body: UserSearchBody = await readBody(event) 
    const query: PrismaPagination = getPagination(getQuery(event))

    if (!body.query){
        throw createError({
            statusCode: 400,
            statusMessage: "Body is empty"
        })
    }

    const posts = await prisma.user.findMany({
        skip: query.skip,
        take: query.take,
        select: userSelect,
        where: {
            OR: [ 
            {username: { contains: body.query }},
            {email:{ contains: body.query }},
            {bio:{ contains: body.query }}
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