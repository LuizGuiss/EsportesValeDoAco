import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import QuadrasController from './controllers/QuadrasController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/quadras', QuadrasController.index);
routes.get('/quadras/:id', QuadrasController.show);
routes.post('/quadras', upload.array('images'), QuadrasController.create);

export default routes;