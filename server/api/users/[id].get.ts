import {PrismaClient} from '@prisma/client'
import {userSelect} from './index.get'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: userSelect
    })

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "User not found"
        })
    }

    return user
})
