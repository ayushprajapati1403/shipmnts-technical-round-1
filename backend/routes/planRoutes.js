import express from express;


const router=express.Router();
router.post('/store ',CalculatePrice);
export default router;
