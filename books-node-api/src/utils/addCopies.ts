import mongoose from "mongoose";
import Book from "../models/Book";
import Logger from "./logger";

const MONGO_URI = "mongodb+srv://jose:jose@cluster0.uss7hx2.mongodb.net/booksdb?retryWrites=true&w=majority"; // change if needed

async function addCopies() {
    try {
        await mongoose.connect(MONGO_URI);

        const books = await Book.find();

        for (const book of books) {

            // Check if a book with the same title already exists
            const existingBook = await Book.findOne({ title: book.title, publishedYear: 2023, language: "English" });
            if (existingBook) {
                console.log(`Skipping duplicate for "${book.title}".`);
                continue;
            }

            const updatedBook = await Book.updateOne({ _id: book._id }, { $set: { publishedYear: 2023, language: "English" } });

            Logger.info(`✅ Created updated book: ${JSON.stringify(updatedBook)}`);
        }

        Logger.info("✅ Migration complete.");
        process.exit(0);
    } catch (err) {
        Logger.error("❌ Migration failed:", err);
        process.exit(1);
    }
}

export default addCopies;