/*
  Warnings:

  - You are about to drop the column `username` on the `Downvote` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Upvote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,tweetId]` on the table `Downvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,tweetId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Downvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Upvote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Downvote" DROP CONSTRAINT "Downvote_username_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tweet" DROP CONSTRAINT "Tweet_username_fkey";

-- DropForeignKey
ALTER TABLE "public"."Upvote" DROP CONSTRAINT "Upvote_username_fkey";

-- DropIndex
DROP INDEX "public"."Downvote_username_tweetId_key";

-- DropIndex
DROP INDEX "public"."Upvote_username_tweetId_key";

-- AlterTable
ALTER TABLE "public"."Downvote" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tweet" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Upvote" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Downvote_email_tweetId_key" ON "public"."Downvote"("email", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_email_tweetId_key" ON "public"."Upvote"("email", "tweetId");

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvote" ADD CONSTRAINT "Upvote_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Downvote" ADD CONSTRAINT "Downvote_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
