import {PrismaClient} from '@prisma/client'
import {communitySelect} from './index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    const community = await prisma.community.findUnique({
        where: {
            id: id
        },
        select: communitySelect
    })

    if (!community) {
        throw createError({
            statusCode: 404,
            statusMessage: "Community not found"
        })
    }

    return community
})
