import {defineEventHandler, readMultipartFormData, createError} from "h3"
import {PrismaClient} from "@prisma/client"
import crypto from "node:crypto"
import path from "node:path"
import fs from "node:fs"
import sharp from "sharp"
import {v4 as uuid} from "uuid"

const prisma = new PrismaClient()

const imageTypes = {
    profile: {width: 48, height: 48, path: "profiles/"},
    banner: {width: 1500, height: 250, path: "banners/"},
    post: {width: 1000, height: 800, path: "posts/"},
    background: {width: 1920, height: 1080, path: "backgrounds/"}
}

export default defineEventHandler(async (event) => {
    // BUG in nuxt. params?.id should not be set, but it is instead of type
    const type = (event.context.params?.id || event.context.params?.type) as keyof typeof imageTypes

    if (!type || !imageTypes[type]) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid image type",
        })
    }

    const formData = await readMultipartFormData(event)

    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: "No file uploaded",
        })
    }

    const fileData = formData[0]

    if (!fileData || !fileData.data) {
        throw createError({
            statusCode: 400,
            statusMessage: "No file data found",
        })
    }

    const buffer = fileData.data

    const {imagesPath} = useRuntimeConfig()

    const basePath = path.join(imagesPath, imageTypes[type].path)
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, {recursive: true})
    }

    const fileHash = crypto
        .createHash("md5")
        .update(new Uint8Array(buffer))
        .digest("hex")

    const existingImage = await prisma.image.findUnique({
        where: {
            type_originalFileHash: {
                type: type,
                originalFileHash: fileHash
            }
        },
        select: {
            id: true
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        })
    })

    if (!existingImage) {
        const fileName = `${uuid()}.webp`
        const filePath = path.join(basePath, fileName)

        try {
            await sharp(buffer)
                .resize(imageTypes[type].width, imageTypes[type].height, {
                    fit: "cover",
                })
                .toFormat("webp")
                .toFile(filePath)

            const image = await prisma.image.create({
                data: {
                    type: type,
                    path: filePath,
                    originalFileHash: fileHash
                }
            })

            return {id: image.id}
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: "Failed to process and save image",
            })
        }
    }

    return {id: existingImage.id}
})
