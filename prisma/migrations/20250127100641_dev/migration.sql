-- CreateTable
CREATE TABLE "_UserCommunities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Community" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserCommunities_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCommunities_AB_unique" ON "_UserCommunities"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCommunities_B_index" ON "_UserCommunities"("B");
