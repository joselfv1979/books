import { unlink } from "fs";
import { getBookService } from "../services/bookService";
import { getUserService } from "../services/userService";
import Logger from "./logger";

/**
 * Deletes the image associated with a user
 */
export const deleteUserImage = async (id: string) => {
    const user = await getUserService(id);
    if (user?.imagePath) removeImage(user.imagePath);
}

/**
 * Deletes the image associated with a book
 */
export const deleteBookImage = async (id: string) => {
    const book = await getBookService(id);
    if (book?.imagePath) removeImage(book.imagePath);
}

/**
 * Removes an image from the system file by using the image path 
 */
const removeImage = (path: string) => {
    unlink(path, (err) => {
        if (err) {
            Logger.error(err);
            return;
        }
        Logger.info("Image deleted successfully");
    });
}