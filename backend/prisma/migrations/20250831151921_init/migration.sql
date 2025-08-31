/*
  Warnings:

  - You are about to drop the `Tweets` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Downvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tweetId` to the `Downvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Upvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Downvote" ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Upvote" ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Tweets";

-- CreateTable
CREATE TABLE "public"."Tweet" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Downvote_userId_tweetId_key" ON "public"."Downvote"("userId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_userId_tweetId_key" ON "public"."Upvote"("userId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvote" ADD CONSTRAINT "Upvote_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "public"."Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Downvote" ADD CONSTRAINT "Downvote_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "public"."Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
