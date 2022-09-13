import {Router} from 'express';
import usersRoutes from './usersRoutes';

const routes = Router();

routes.use(usersRoutes);

export default routes;