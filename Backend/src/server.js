import express from 'express';
import ListRoutes from './routes/ListRoutes.js';
import { connectDB } from "./config/DB.js";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


//middleware
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));

app.use('/api/tasks', ListRoutes);

connectDB().then(() => {
app.listen(PORT,() => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
});



