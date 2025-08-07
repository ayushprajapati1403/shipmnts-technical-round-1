import express from express;
import { CalculatePrice } from "../controllers/orderController"

const router=express.Router();
router.post('/price',CalculatePrice);
export default router;
