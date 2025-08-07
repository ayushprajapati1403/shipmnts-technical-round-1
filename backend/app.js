import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes"
import storeRoutes from "./routes/storeRoutes"
import planRoutes from "./routes/planRoutes"

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/order',orderRoutes);
app.use('/api/store',storeRoutes);
app.use('/api/plan',planRoutes);




app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


