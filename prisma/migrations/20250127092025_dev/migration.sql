/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- CreateIndex
CREATE INDEX "Community_profileImageId_idx" ON "Community"("profileImageId");

-- CreateIndex
CREATE INDEX "Community_backgroundImageId_idx" ON "Community"("backgroundImageId");

-- CreateIndex
CREATE INDEX "Community_bannerImageId_idx" ON "Community"("bannerImageId");

-- CreateIndex
CREATE INDEX "Community_adminUserId_idx" ON "Community"("adminUserId");

-- CreateIndex
CREATE INDEX "Post_imageId_idx" ON "Post"("imageId");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- CreateIndex
CREATE INDEX "Post_communityId_idx" ON "Post"("communityId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_profileImageId_idx" ON "User"("profileImageId");

-- CreateIndex
CREATE INDEX "User_backgroundImageId_idx" ON "User"("backgroundImageId");

-- CreateIndex
CREATE INDEX "User_bannerImageId_idx" ON "User"("bannerImageId");
