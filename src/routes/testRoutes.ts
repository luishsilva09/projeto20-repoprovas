import { Router } from 'express';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import validToken from '../middlewares/validToken';
import { testSchema } from '../schemas/testsSchemas';
import * as testController from '../controllers/testsController'

const testRoutes = Router();

testRoutes.post('/tests/create',validToken,schemaValidate(testSchema),testController.newTest);
testRoutes.get('/tests/get',validToken,testController.getAll)
export default testRoutes