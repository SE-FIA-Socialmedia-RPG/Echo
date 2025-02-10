import {PrismaClient} from '@prisma/client'
import {userSelect} from '../users/index.get'
import {communitySelect} from '../communities/index.get'
import {postSelect} from '../posts/index.get'
import {getPagination, PrismaPagination} from '~/server/pagination'


const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    if (!event.context.params || !event.context.params.type) {
        throw createError({
            statusCode: 400,
            statusMessage: "parameter is missing"
        })
    }

    const query: PrismaPagination = getPagination(getQuery(event))
    const type: string = String(event.context.params.type)

    try {
        let result;

        switch (type) {
            case "user":
                result = await prisma.user.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: userSelect
                });
                break;

            case "community":
                result = await prisma.community.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: communitySelect
                });
                break;

            case "post":
                result = await prisma.post.findMany({
                    skip: query.skip,
                    take: query.take,
                    select: postSelect
                });
                break;

            default:
                throw createError({
                    statusCode: 404,
                    statusMessage: "Invalid type parameter"
                });
        }

        return result;
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "Database request failed"
        });
    }
});