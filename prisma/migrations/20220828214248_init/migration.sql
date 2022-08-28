-- CreateTable
CREATE TABLE "USER" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordhash" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_first_name_key" ON "USER"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "USER_second_name_key" ON "USER"("second_name");

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_passwordhash_key" ON "USER"("passwordhash");
