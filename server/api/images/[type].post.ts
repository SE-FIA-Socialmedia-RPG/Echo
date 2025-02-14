import {defineEventHandler, readMultipartFormData, createError} from "h3"
import {PrismaClient} from "@prisma/client"
import crypto from "node:crypto"
import path from "node:path"
import fs from "node:fs"
import sharp from "sharp"
import {v4 as uuid} from "uuid"

const prisma = new PrismaClient()

// Define image types and sizes
const imageTypes = {
    profile: {width: 48, height: 48, path: "profiles/"},
    banner: {width: 1500, height: 250, path: "banners/"},
    post: {width: 1080, height: 540, path: "posts/"},
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

    // .update(Buffer.from(fileBuffer))
    const fileHash = crypto
        .createHash("md5")
        .update(new Uint8Array(buffer))
        .digest("hex")
    const fileName = `${uuid()}.webp`
    const filePath = path.join(basePath, fileName) // Path to save the file

    try {
        // Process the image using sharp
        await sharp(buffer)
            .resize(imageTypes[type].width, imageTypes[type].height, {
                fit: "inside", // or 'cover' depending on your needs
            })
            .toFormat("webp")
            .toFile(filePath)

        // Save image metadata to the database
        const image = await prisma.image.create({
            data: {
                type: type,
                path: filePath,
                originalFileHash: fileHash,
            },
        })

        return {id: image.id}
    } catch (error) {
        console.error("Error processing image:", error)
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to process and save image",
        })
    }
})
