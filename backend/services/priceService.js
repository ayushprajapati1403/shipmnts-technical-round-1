import { PrismaClient } from "@prisma/client";
import {orderRoutes} from   "./rout"
const prisma = new PrismaClient();

export async function CalculatePrice(OrderData) {
    const {storeId,orderDate,sandwitchSize,items}=OrderData;

    const date=new Date(orderDate);
    const Store =await prisma.store.findUnique({
        where:{id:storeId},
    });
    if(!Store)
        throw new Error("store not found");

    const  storeItemPrices=await prisma.pricing.findMany({
        where:{
            storeId,
            StartingDate:{
            lte:date
            },
            EndingDate:{
                gte:date
            },
            include:{item:true},
        }
    });
    for(const item of items){
        let basicPrice;
        const match=storeItemPrices.find(p=>p.itemId === item.id);
        if(match){
            basicPrice=sandwitchSize==="6in"?match.HalfSizePrice:match.FullSizePrice;
        }

        

    }
    
}