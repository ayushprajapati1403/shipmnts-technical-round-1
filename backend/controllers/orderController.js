import { CalculatePrice } from "../services/priceService";

export const CalculatePrice=async(req,res)=>{
    try{
        const result=await CalculatePrice(req.body);
        res.status(200).json(result)

    }catch(err){
        console.error("error in calculating price");
        res.status(500).json("failed to calculate");
        
    }
};