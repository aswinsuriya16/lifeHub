/*
  Warnings:

  - You are about to drop the column `email` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Upvote` table. All the data in the column will be lost.
  - You are about to drop the `Downvote` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Upvote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Downvote" DROP CONSTRAINT "Downvote_email_fkey";

-- DropForeignKey
ALTER TABLE "public"."Downvote" DROP CONSTRAINT "Downvote_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tweet" DROP CONSTRAINT "Tweet_email_fkey";

-- DropForeignKey
ALTER TABLE "public"."Upvote" DROP CONSTRAINT "Upvote_email_fkey";

-- DropIndex
DROP INDEX "public"."Upvote_email_tweetId_key";

-- AlterTable
ALTER TABLE "public"."Tweet" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Upvote" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Downvote";

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_userId_tweetId_key" ON "public"."Upvote"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
