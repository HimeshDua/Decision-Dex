-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reason" TEXT,
    "rank" INTEGER,
    "decisionId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProOption" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "ProOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConOption" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "ConOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProOption" ADD CONSTRAINT "ProOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConOption" ADD CONSTRAINT "ConOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
