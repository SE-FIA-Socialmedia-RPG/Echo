import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {userSelect} from '../users/index.get'

const prisma = new PrismaClient()

export type LoginBody = {
    email: string
    password: string
}

export default defineEventHandler(async (event: any) => {
    const body: LoginBody = await readBody(event)

    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email and password are required"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid email format"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        },
        select: {
            ...userSelect,
            password: true
        }
    })

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid email"
        })
    }

    if (!await bcrypt.compare(body.password, user.password)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid email or password"
        })
    }

    const key = getCookie(event, "key")
    const twentyFourHoursAgo = new Date(Date.now() - 86400000)

    if (!key || !await prisma.login.findUnique({
        where: {
            key: key,
            createdAt: {
                gte: twentyFourHoursAgo
            }
        },
        select: {
            createdAt: true,
            id: true
        }
    })) {
        const login = await prisma.login.create({
            data: {
                userId: user.id
            }
        })

        setCookie(event, "key", login.key, {
            maxAge: 86400,
            secure: true,
            sameSite: "strict"
        })
    }

    await prisma.login.deleteMany({
        where: {
            userId: user.id,
            createdAt: {
                lt: twentyFourHoursAgo
            }
        }
    })

    const {password, ...ret} = user
    return ret
})
