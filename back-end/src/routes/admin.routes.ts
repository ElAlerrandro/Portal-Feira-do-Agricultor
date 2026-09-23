import authToken, { requireMaster }  from "../../middleware";
import { Router } from "express";
import { AdminController } from "../controller/admin.controller";
import { AdminService } from "../service/admin.service";
import { AdminDAO } from "../dao/admin.dao";


const adminRoutes = Router();
const adminDAO = new AdminDAO();
const adminService = new AdminService(adminDAO);
const adminController = new AdminController(adminService);

adminRoutes
    .route('/register')
    .post(async (req, res) => adminController.register(req,res))

adminRoutes.route('/admin/profile')
    .put(authToken, async (req, res) => adminController.updateOwnProfile(req,res));

adminRoutes.route('/admin/:id')
    .put(authToken, requireMaster, async (req, res) => adminController.updateAdminByMaster(req,res));
export default adminRoutes;