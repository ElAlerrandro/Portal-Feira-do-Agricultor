import { Router } from "express";
import { AdminController } from "../controller/admin.controller";
import { AdminService } from "../service/admin.service";
import { AdminDAO } from "../dao/admin.dao";
import authToken from "../../middleware";

const adminRoutes = Router();
const adminDAO = new AdminDAO();
const adminService = new AdminService(adminDAO);
const adminController = new AdminController(adminService);

adminRoutes
    .route('/register')
    .post(async (req, res) => adminController.register(req,res))

adminRoutes
    .route('/login')
    .post(async (req, res) => adminController.login(req,res))

adminRoutes
    .route('/logout')
    .post(async (req, res) => adminController.logout(req,res))

adminRoutes
    .route('/refresh')
    .post(async (req, res) => adminController.refresh(req,res))

adminRoutes
    .route('/:id')
    .patch(authToken, async (req, res) => adminController.update(req, res))

export default adminRoutes;