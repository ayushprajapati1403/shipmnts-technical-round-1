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
    const premiumItems=await prisma.premiumItem.findMany({
        where:{storeId},
        select:{itemId:true},
    })
    const premiumItemId=new Set(premiumItems.map(p=>p.itemId));
    const FinalItems=[];
    let subtotal=0;
    for(const item of items){
        let basicPrice;
        const match=storeItemPrices.find(p=>p.itemId === item.id);
        if(match){
          
            basicPrice=sandwitchSize==="6in"?match.HalfSizePrice:match.FullSizePrice;

            if(premiumItemId.has(item.id)){
                const premiumCharge=Math.floor(basicPrice*0.2);
                basicPrice+=premiumCharge;
            }
            if(item.isExtra){
                basicPrice+=sandwitchSize==="6in"? match.HalfSizePrice:match.FullSizePrice;

            }else{
                const category=await prisma.item.findUnique({
                    where:{id:item.id}
                }).then(i=>i.category);
                
                const categoryPrice=storeItemPrices.filter(p=>p.item.category===category)
                .map(p=>sandwitchSize==="6in"?p.HalfSizePrice : p.FullSizePrice);
                const average=Math.floor(categoryPrice.reduce((a,b)=>a+b,0)/categoryPrice.length);
                basicPrice=average;
            }
            subtotal+=basicPrice;

            FinalItems.push({
                itemId:item.id,
                name:match?.item.name,
                basicPrice,
                premiumItemId:premiumItemId.has(item.id),
                isExtra:item.isExtra || false,
            });
        }

        const tax=Math.floor(subtotal*Store.tax/100);
        const total=subtotal+tax;
        return{
            currency:store.currency,
            items:FinalItems,
            subtotal,
            tax,
            total
        };

        

    }
    
}