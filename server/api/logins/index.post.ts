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
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
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

    const login = await prisma.login.create({
        data: {
            userId: user.id
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    setCookie(event, "key", login.key, {
        maxAge: 86400,
        secure: true,
        sameSite: "strict"
    })

    const {password, ...ret} = user
    return ret
})
