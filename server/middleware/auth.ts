import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: any) => {
    const token = getCookie(event, "key")

    if (!token) {
        return
    }

    const login = await prisma.login.findUnique({
        where: {
            key: token
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            message: "Database request failed"
        })
    })

    if (login) {
        if ((Date.now() - new Date(login.createdAt).getTime()) < 86400000) {
            event.context.login = login
        } else {
            await prisma.login.delete({
                where: {
                    id: login.id
                }
            }).catch(() => {
                throw createError({
                    statusCode: 400,
                    message: "Database request failed"
                })
            })

            throw createError({
                statusCode: 401,
                statusMessage: "Login key is older than 24 hours"
            })
        }
    }
})
