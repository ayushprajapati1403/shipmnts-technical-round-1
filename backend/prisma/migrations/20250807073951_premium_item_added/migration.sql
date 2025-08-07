-- CreateTable
CREATE TABLE "public"."PremiumItem" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "PremiumItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PremiumItem" ADD CONSTRAINT "PremiumItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PremiumItem" ADD CONSTRAINT "PremiumItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
