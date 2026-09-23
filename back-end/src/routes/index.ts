import { Router } from 'express';
import adminRoutes from './admin.routes';

const routes = Router();

routes.use('/admin', adminRoutes);

export default routes;