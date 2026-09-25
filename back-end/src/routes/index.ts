import { Router } from 'express';
import adminRoutes from './admin.routes';
import eventRoutes from './event.routes';

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/event', eventRoutes);

export default routes;