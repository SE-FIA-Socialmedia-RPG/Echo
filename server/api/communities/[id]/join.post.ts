import {PrismaClient} from '@prisma/client'
import {communitySelect} from '../index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.login) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    const community = await prisma.community.update({
        where: {
            id: id,
        },
        data: {
            users: {
                connect: {
                    id: event.context.login.userId
                }
            }
        },
        select: communitySelect
    })

    return community
})

