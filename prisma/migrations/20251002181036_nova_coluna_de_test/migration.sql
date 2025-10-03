/*
  Warnings:

  - Added the required column `testColuna` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "follows" ADD COLUMN     "testColuna" TEXT NOT NULL;
