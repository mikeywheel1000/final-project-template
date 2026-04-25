/*
  Warnings:

  - Added the required column `aspects` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aspects` to the `leaders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "aspects" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "leaders" ADD COLUMN     "aspects" TEXT NOT NULL;
