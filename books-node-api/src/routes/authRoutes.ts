import { Router } from "express";
import { loginController, registerController } from "../controllers/authController";
import imageHandler from "../middlewares/imageHandler";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", imageHandler.single("image"), registerController)

export default authRouter;