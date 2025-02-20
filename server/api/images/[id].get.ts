import {PrismaClient} from "@prisma/client"
import path from "node:path"
import fs from "fs/promises"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {imagesPath} = useRuntimeConfig()

    if (!event.context.params || !event.context.params.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Id parameter is missing"
        })
    }

    const id: number = Number(event.context.params.id)

    const image = await prisma.image.findUnique({
        where: {
            id,
        },
    })

    if (!image) {
        throw createError({
            statusCode: 404,
            statusMessage: "Image not found",
        })
    }

    return await fs.readFile(image.path)
})
