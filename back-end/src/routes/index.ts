import { Router } from 'express';
import adminRoutes from './admin.routes';
import eventRoutes from './event.routes';
import eventImageRoutes from './eventImage.routes'

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/event', eventRoutes);
routes.use('/event/image', eventImageRoutes)

export default routes;