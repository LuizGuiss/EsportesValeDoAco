import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import QuadrasController from './controllers/QuadrasController';
import UsersControllers from './controllers/UsersControllers';

import 'express-async-errors';
import 'dotenv/config';

const routes = Router();
const upload = multer(uploadConfig);

//QUADRAS
routes.get('/quadras/:accepted', QuadrasController.index);
routes.get('/quadra/:id', QuadrasController.show);
routes.delete('/quadra/:id', QuadrasController.delete);
routes.post('/quadras/accept-response/:id', QuadrasController.acceptQuadraResponse)
routes.post('/quadras', upload.array('images'), QuadrasController.create);
routes.put('/quadra/:id', upload.array('images'), QuadrasController.update);

//USERS
routes.get('/user/:id', UsersControllers.getUserData);
//routes.get('/users', UsersControllers.getUsers);
routes.post('/register', UsersControllers.create);
routes.post('/login', UsersControllers.login);
routes.post('/forget-password', UsersControllers.forgetPassword); /** n ta bom ainda  */
routes.post('/reset-password', UsersControllers.resetPassword);/** n ta bom ainda */


export default routes;