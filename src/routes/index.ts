import {Router} from 'express';
import testRoutes from './testRoutes';
import usersRoutes from './usersRoutes';

const routes = Router();

routes.use(usersRoutes);
routes.use(testRoutes);

export default routes;