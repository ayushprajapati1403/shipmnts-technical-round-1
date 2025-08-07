import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes"

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/order',orderRoutes)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


