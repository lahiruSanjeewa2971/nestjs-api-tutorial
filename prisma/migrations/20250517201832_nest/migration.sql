-- CreateTable
CREATE TABLE "User" (
    "in" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("in")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "in" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("in")
);
