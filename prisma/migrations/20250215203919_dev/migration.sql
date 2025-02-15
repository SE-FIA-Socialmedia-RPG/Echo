/*
  Warnings:

  - A unique constraint covering the columns `[originalFileHash]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_originalFileHash_key" ON "Image"("originalFileHash");
