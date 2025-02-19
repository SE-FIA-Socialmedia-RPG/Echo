import {faker} from '@faker-js/faker'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'
import sharp from 'sharp'
import {v4 as uuid} from 'uuid'

export const imageTypes = {
    profile: {width: 48, height: 48, path: 'profiles/'},
    badge: {width: 64, height: 64, path: 'badges/'},
    banner: {width: 1500, height: 250, path: 'banners/'},
    post: {width: 1000, height: 800, path: 'posts/'},
    background: {width: 1920, height: 1080, path: 'backgrounds/'},
}

const prisma = new PrismaClient()

try {
    fs.accessSync('./images')

    fs.rmSync('./images', {recursive: true})
} catch (e) {
    console.error(e)
    console.error('could not delete images folder.')
}

async function addImage(type: keyof typeof imageTypes, url: string) {
    const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
    const imagesPath = './images'

    const basePath = path.join(imagesPath, imageTypes[type].path)
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, {recursive: true})
    }

    const fileHash = crypto.createHash('md5').update(new Uint8Array(buffer)).digest('hex')

    const fileName = `${uuid()}.webp`
    const filePath = path.join(basePath, fileName)

    await sharp(buffer)
        .resize(imageTypes[type].width, imageTypes[type].height, {
            fit: 'cover',
        })
        .toFormat('webp')
        .toFile(filePath)

    await prisma.image.create({
        data: {
            type: type,
            path: filePath,
            originalFileHash: fileHash,
        },
    })
}

async function main() {
    for (let i = 1, j = 1; i <= 10; i++, j += Object.keys(imageTypes).length) {
        await addImage('profile', faker.image.personPortrait())
        let profileImageId = j

        await addImage('banner', faker.image.urlLoremFlickr())
        let bannerImageId = j + 1

        await addImage('background', faker.image.urlPicsumPhotos())
        let backgroundImageId = j + 2

        await addImage('post', faker.image.urlLoremFlickr())
        let postImageId = j + 3

        await addImage('badge', faker.image.urlPicsumPhotos())
        let awardImageId = j + 4

        await prisma.user.create({
            data: {
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: await bcrypt.hash('0123456789', 10),
                bio: faker.person.bio(),
                xp: faker.number.int(1000),
                profileImageId: profileImageId,
                bannerImageId: bannerImageId,
                backgroundImageId: backgroundImageId,
                following:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
                followedBy:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })

        await prisma.community.create({
            data: {
                communityName: faker.food.adjective(),
                description: faker.food.description(),
                adminUserId: i,
                users:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
                profileImageId: profileImageId,
                bannerImageId: bannerImageId,
                backgroundImageId: backgroundImageId,
            },
        })

        await prisma.award.create({
            data: {
                awardName: faker.internet.domainWord(),
                awardImageId: awardImageId,
                adminUserId: i,
                users:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
                communityId: i,
            },
        })

        await prisma.post.create({
            data: {
                userId: i,
                title: faker.book.title(),
                text: faker.lorem.paragraph(),
                imageId: postImageId,
                communityId: i,
                likes:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })

        await prisma.comment.create({
            data: {
                userId: i > 1 ? i - 1 : i,
                postId: i > 1 ? i - 1 : i,
                text: faker.lorem.lines(),
                likes:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })

        await prisma.post.create({
            data: {
                userId: i,
                title: faker.book.title(),
                text: faker.lorem.paragraph(),
                imageId: postImageId,
                likes:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })

        await prisma.comment.create({
            data: {
                userId: i > 1 ? i - 1 : i,
                postId: i > 1 ? i - 1 : i,
                text: faker.lorem.lines(),
                likes:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })

        await prisma.post.create({
            data: {
                userId: i,
                ad: true,
                title: faker.book.title(),
                text: faker.lorem.paragraph(),
                imageId: postImageId,
                likes:
                    i > 1
                        ? {
                              connect: {
                                  id: i - 1,
                              },
                          }
                        : undefined,
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
