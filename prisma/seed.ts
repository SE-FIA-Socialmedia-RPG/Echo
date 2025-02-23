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
const imagesPath = process.env.IMAGES || "./images"


try {
    fs.rmSync(imagesPath, {recursive: true})
} catch (error) {
    console.info(`Using Images folder: ${imagesPath}`)
}

const usedImages: Set<string> = new Set();

function getUniqueProfileImage(): string {
    let imageUrl: string;
    do {
        imageUrl = faker.image.personPortrait();
    } while (usedImages.has(imageUrl));

    usedImages.add(imageUrl);
    return imageUrl;
}

function getUniqueImage(): string {
    let imageUrl: string;
    do {
        imageUrl = faker.image.url();
    } while (usedImages.has(imageUrl));

    usedImages.add(imageUrl);
    return imageUrl;
}

async function addImage(type: keyof typeof imageTypes, url: string) {
    const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())

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
        await addImage('profile', getUniqueProfileImage())
        let profileImageId = j

        await addImage('banner', getUniqueImage())
        let bannerImageId = j + 1

        await addImage('background', getUniqueImage())
        let backgroundImageId = j + 2

        await addImage('post', getUniqueImage())
        let postImageId = j + 3

        await addImage('badge', getUniqueImage())
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
