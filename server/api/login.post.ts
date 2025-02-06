import {PrismaClient} from '@prisma/client'

import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: any) => {
    const {email, password} = await readBody(event)

    if (!email || !password) {
        throw createError({
            statusCode: 401,
            message: "Email and password are required"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 401,
            message: "Invalid email format"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            message: "Database request failed"
        })
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            message: "Invalid email"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw createError({
            statusCode: 401,
            message: "Invalid email or password"
        })
    }

    const login = await prisma.login.create({
        data: {
            userId: user.id
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            message: "Database request failed"
        })
    })

    setCookie(event, "key", login.key, {
        maxAge: 86400,
        secure: true,
        sameSite: "strict"
    })

    return {
        statusCode: 200,
        body: login,
        message: "Login successful"
    }
})
