import { Router } from "express";
import { createBookController, deleteBookController, getBookController, getBooksController, updateBookController } from "../controllers/bookController";
import authHandler from "../middlewares/authHandler";
import { bookPagination } from "../middlewares/booksPagination";
import imageHandler from "../middlewares/imageHandler";

const booksRouter = Router();

booksRouter.get("/", bookPagination, getBooksController);
booksRouter.get("/:id", getBookController);
booksRouter.post("/", authHandler, imageHandler.single("image"), createBookController);
booksRouter.put("/:id", authHandler, imageHandler.single("image"), updateBookController);
booksRouter.delete("/:id", authHandler, deleteBookController);

export default booksRouter;
