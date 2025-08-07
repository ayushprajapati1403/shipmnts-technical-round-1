import express from express;
import { CalculatePrice } from "../services/priceService";

const router=express.Router();
router.post('/price',CalculatePrice);
export default router;
