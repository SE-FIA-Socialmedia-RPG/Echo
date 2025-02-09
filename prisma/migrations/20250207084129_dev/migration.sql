-- DropIndex
DROP INDEX "Award_awardImageId_communityId_idx";

-- CreateIndex
CREATE INDEX "Award_awardImageId_adminUserId_communityId_idx" ON "Award"("awardImageId", "adminUserId", "communityId");
