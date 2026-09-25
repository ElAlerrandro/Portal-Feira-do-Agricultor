import { Router } from "express";
import { EventController } from "../controller/event.controller";
import { EventService } from "../service/event.service";
import { EventDAO } from "../dao/event.dao";
import authToken from "../../middleware";
 
const eventRoutes = Router();
const eventDAO = new EventDAO();
const eventService = new EventService(eventDAO);
const eventController = new EventController(eventService);

eventRoutes
    .route('/events')
    .post(authToken, async (req, res) => eventController.create(req, res));

eventRoutes
    .route('/events/:id')
    .patch(authToken, async (req, res) => eventController.create(req, res))
    .delete(authToken, async (req, res) => eventController.delete(req, res));

//nesse caso qualquer admin pode criar um evento se quisermos restringir para o super, adicionamos o isSuperAdmin
export default eventRoutes;