import {PrismaClient} from '@prisma/client'
import {awardSelect} from './index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "No Id specified"
        })
    }

    const user = await prisma.award.findUnique({
        where: {
            id: id
        },
        select: awardSelect
    })

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "User not found"
        })
    }

    return user
})
