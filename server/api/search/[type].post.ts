import {PrismaClient} from '@prisma/client'
import {userSelect} from '../users/index.get'
import {communitySelect} from '../communities/index.get'
import {postSelect} from '../posts/index.get'
import {getPagination, PrismaPagination} from '~/server/pagination'


const prisma = new PrismaClient()

export type SearchBody = {
    query?: string
}

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.type) {
        throw createError({
            statusCode: 400,
            statusMessage: "Type parameter is missing"
        })
    }

    const body: SearchBody = await readBody(event) //lookie here
    const query: PrismaPagination = getPagination(getQuery(event))
    const type: string = String(event.context.params.type)

    if (!body.query){
        throw createError({
            statusCode: 400,
            statusMessage: "Body is empty"
        })
    }
    //contains filtering : SQL parameter like, or, not, starts with 
    //where like 
    //where contains 
    //query cashe 
    //

        switch (type) {
            case "user":
                return await prisma.user.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: userSelect,
                    where: { 
                        OR: [
                        {email: { contains: body.query }}, 
                        {username: { contains: body.query }},
                        {bio: { contains: body.query }}
                        ]
                    }
                }).catch(() => {
                    throw createError({
                        statusCode: 400,
                        statusMessage: "Database request failed"
                    })
                })
              

            case "community":
                return await prisma.community.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: communitySelect,
                    where: { 
                        communityName: { contains: body.query }
                    }
                }).catch(() => {
                    throw createError({
                        statusCode: 400,
                        statusMessage: "Database request failed"
                    })
                })
                

            case "post":
                return await prisma.post.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: postSelect,
                    where: {
                        OR: [ 
                        {text: { contains: body.query }},
                        {title:{ contains: body.query }},
                        ]
                    }
                }).catch(() => {
                    throw createError({
                        statusCode: 400,
                        statusMessage: "Database request failed"
                    })
                })
                

            default:
                throw createError({
                    statusCode: 404,
                    statusMessage: "Invalid type parameter"
                })
        }

})