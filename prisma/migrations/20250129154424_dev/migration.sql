/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Login` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Login_key_key" ON "Login"("key");
