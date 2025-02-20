import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {userSelect} from './index.get'

const prisma = new PrismaClient()

export type UserBody = {
    id?: number
    username?: string
    email?: string
    password?: string
    bio?: string
    profileImageId?: number
    backgroundImageId?: number
    bannerImageId?: number
    color?: string
}

export default defineEventHandler(async (event) => {
    const body: UserBody = await readBody(event)

    if (body.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(body.email)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid email format',
            })
        }
    }

    let hashedPassword: string | undefined = undefined
    if (body.password) {
        if (body.password.length < 10) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Password must be at least 10 characters long',
            })
        }

        hashedPassword = await bcrypt.hash(body.password, 10)
    }

    if (!body.id) {
        if (!body.username || !body.email || !body.password || !body.bio) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Username, email, password and bio are required',
            })
        }

        if (!hashedPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Password cannot be hashed',
            })
        }

        const user = await prisma.user
            .create({
                data: {
                    username: body.username,
                    email: body.email,
                    password: hashedPassword,
                    bio: body.bio,
                    profileImageId: body.profileImageId,
                    backgroundImageId: body.backgroundImageId,
                    bannerImageId: body.bannerImageId,
                    accentColor: body.color,
                },
                select: userSelect,
            })

        return user
    }

    if (!event.context.login || event.context.login.userId != body.id) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    const user = await prisma.user
        .update({
            where: {
                id: body.id,
            },
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
                bio: body.bio,
                profileImageId: body.profileImageId,
                backgroundImageId: body.backgroundImageId,
                bannerImageId: body.bannerImageId,
                accentColor: body.color,
            },
            select: userSelect,
        })

    return user
})
