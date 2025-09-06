/*
  Warnings:

  - You are about to drop the column `userId` on the `Downvote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Upvote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,tweetId]` on the table `Downvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,tweetId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Downvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Upvote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Downvote" DROP CONSTRAINT "Downvote_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Upvote" DROP CONSTRAINT "Upvote_userId_fkey";

-- DropIndex
DROP INDEX "public"."Downvote_userId_tweetId_key";

-- DropIndex
DROP INDEX "public"."Upvote_userId_tweetId_key";

-- AlterTable
ALTER TABLE "public"."Downvote" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tweet" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Upvote" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Downvote_username_tweetId_key" ON "public"."Downvote"("username", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_username_tweetId_key" ON "public"."Upvote"("username", "tweetId");

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvote" ADD CONSTRAINT "Upvote_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Downvote" ADD CONSTRAINT "Downvote_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
