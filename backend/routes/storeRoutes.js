import express from express;
const prisma = new PrismaClient();


const router=express.Router();


router.post('/',async (req,res)=>{
      const {storeLocation,currency,tax,premiumItems}=req.body;

    
})
export default router;
