import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: any) => {
    const token = getCookie(event, 'key')
    if (!token) {
        return
    }

    const login = await prisma.login
        .findUnique({
            where: {
                key: token,
            },
            include: {
                user: {
                    include: {
                        following: true,
                        communities: true,
                    },
                    omit: {
                        password: true,
                    },
                },
            },
        })

    if (login) {
        if (Date.now() - new Date(login.createdAt).getTime() < 86400000) {
            event.context.login = login
        } else {
            await prisma.login
                .delete({
                    where: {
                        id: login.id,
                    },
                })
        }
    }
})
