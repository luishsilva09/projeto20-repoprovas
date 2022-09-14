import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index';
import errorHandle from './middlewares/errorHandle';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandle);

export default app;
