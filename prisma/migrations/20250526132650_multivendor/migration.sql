/*
  Warnings:

  - You are about to drop the `blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `newsletters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_category_id_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_post_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_post_id_fkey";

-- DropTable
DROP TABLE "blogs";

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "newsletters";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "views";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "StatusType";
