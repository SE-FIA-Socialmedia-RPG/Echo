import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler((event:any) => {
    const token = getCookie(event, 'auth_token')

    if (!token) {
        return {
            statusCode: 400,
            message: "No token was passed."
        }
    }

    try {
        const login = await prisma.login.findUnique({
            where: {
                key: token
            }
        })

        // Wenn der login älter als 24h ist.
        if ((Date.now() - new Date(login.createdAt).getTime()) > 86400000) {
            await prisma.login.delete({
                where: {
                    id: login.id
                }
            })

            return {
                statusCode: 400,
                message: "Token expired."
            }
        }
    } catch {
        return {
            statusCode: 400,
            message: "Database request failed."
        }
    }
}
