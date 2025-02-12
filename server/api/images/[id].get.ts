import { createError, defineEventHandler } from "h3";
import { PrismaClient } from "@prisma/client";
import path from "node:path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { imagesPath } = useRuntimeConfig();

  const id = parseInt(event.context.params!.id);

  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });

  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  return await fs.readFile(path.join(imagesPath, image.path));
});
