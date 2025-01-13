import { Router } from "express";
import { deleteUserController, getUserController, getUsersController, updateUserController } from "../controllers/userController";
import authHandler from "../middlewares/authHandler";
import imageHandler from "../middlewares/imageHandler";

const usersRouter = Router();

usersRouter.get("/", authHandler, getUsersController);
usersRouter.get("/:id", getUserController);
usersRouter.put("/:id", authHandler, imageHandler.single("image"), updateUserController);
usersRouter.delete("/:id", authHandler, deleteUserController);

export default usersRouter;
