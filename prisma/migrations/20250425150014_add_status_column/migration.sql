/*
  Warnings:

  - You are about to drop the column `aiDecision` on the `Decision` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "statusOptions" AS ENUM ('Pending', 'InProgress', 'Completed');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_decisionId_fkey";

-- DropForeignKey
ALTER TABLE "ConOption" DROP CONSTRAINT "ConOption_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_decisionId_fkey";

-- DropForeignKey
ALTER TABLE "ProOption" DROP CONSTRAINT "ProOption_optionId_fkey";

-- AlterTable
ALTER TABLE "Decision" DROP COLUMN "aiDecision",
ADD COLUMN     "status" "statusOptions" NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE INDEX "Decision_title_idx" ON "Decision"("title");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProOption" ADD CONSTRAINT "ProOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConOption" ADD CONSTRAINT "ConOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
