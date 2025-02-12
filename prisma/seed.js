import {faker} from '@faker-js/faker'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    for (let i = 1; i <= 25; i++) {

        await prisma.image.create({
            data: {
                type: "profile",
                path: faker.image.avatar(),
                originalFileHash: faker.git.commitSha()
            }
        })

        await prisma.image.create({
            data: {
                type: "banner",
                path: faker.image.url(),
                originalFileHash: faker.git.commitSha()
            }
        })

        await prisma.image.create({
            data: {
                type: "post",
                path: faker.image.url(),
                originalFileHash: faker.git.commitSha()
            }
        })

        await prisma.user.create({
            data: {
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: "0123456789",
                bio: faker.lorem.lines(),
                xp: faker.number.int(1000),
                profileImageId: i,
                bannerImageId: i + 1,
                backgroundImageId: i + 2,
                following: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined,
                followedBy: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined
            }
        })

        await prisma.community.create({
            data: {
                communityName: faker.food.adjective(),
                description: faker.food.description(),
                adminUserId: i,
                users: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined,
                profileImageId: i,
                bannerImageId: i + 1,
                backgroundImageId: i + 2
            }
        })

        await prisma.award.create({
            data: {
                awardName: faker.internet.domainWord(),
                awardImageId: i,
                adminUserId: i,
                users: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined,
                communityId: i
            }
        })

        await prisma.post.create({
            data: {
                userId: i,
                title: faker.book.title(),
                text: faker.lorem.paragraph(),
                imageId: i + 2,
                communityId: i,
                likes: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined
            }
        })

        await prisma.comment.create({
            data: {
                userId: (i > 1) ? i - 1 : i,
                postId: (i > 1) ? i - 1 : i,
                text: faker.lorem.lines(),
                likes: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined
            }
        })

        await prisma.post.create({
            data: {
                userId: i,
                title: faker.book.title(),
                text: faker.lorem.paragraph(),
                imageId: i + 2,
                likes: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined
            }
        })

        await prisma.comment.create({
            data: {
                userId: (i > 1) ? i - 1 : i,
                postId: (i > 1) ? i - 1 : i,
                text: faker.lorem.lines(),
                likes: (i > 1) ? {
                    connect: {
                        id: i - 1
                    }
                } : undefined
            }
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

