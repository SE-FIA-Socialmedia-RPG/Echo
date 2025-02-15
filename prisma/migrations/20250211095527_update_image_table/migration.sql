/*
  Warnings:

  - A unique constraint covering the columns `[type,originalFileHash]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Image_originalFileHash_key";

-- CreateIndex
CREATE UNIQUE INDEX "Image_type_originalFileHash_key" ON "Image"("type", "originalFileHash");
