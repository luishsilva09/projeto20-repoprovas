import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import routes from './routes/index';
import errorHandle from './middlewares/errorHandle';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandle);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => 
    console.log(`Server online port ${PORT}`)
);
