import { ObjectId } from "mongodb";
import Book, { BookDocument, BookWithCopies, IBook } from "../models/Book";
import Copy, { CopyStatus } from "../models/Copy";
import { PaginationRequest } from "../models/Pagination";

export const getBooksService = async (query: PaginationRequest["query"]): Promise<IBook[]> => {

  const { searchQuery, limit, skip, sort, fields } = query;

  return await Book.find(searchQuery)
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort(sort)
    .select(fields);
}

export const getBookService = async (id: string): Promise<BookWithCopies | null> => {

  const book = await Book.findById(new ObjectId(id));

  if (!book) {
    return null;
  }

  const totalCopies = await Copy.countDocuments({ bookId: new ObjectId(id) });
  const availableCopies = await Copy.countDocuments({ bookId: new ObjectId(id), status: "AVAILABLE" });

  const bookObject: BookWithCopies = {
    ...book.toJSON(),
    totalCopies,
    availableCopies,
    id: book.id
  };

  return bookObject;
}

export const createBookService = async (book: IBook): Promise<BookDocument> => {
  return await Book.create(book);
}

export const createCopiesService = async (bookId: string, numberOfCopies: number): Promise<void> => {
  const copies = Array.from({ length: numberOfCopies }, () => ({
    bookId,
    status: CopyStatus.Available,
  }));

  await Copy.insertMany(copies);
}

export const updateCopiesService = async (bookId: string, numberOfCopies: number): Promise<void> => {
  const existingCopiesCount = await Copy.countDocuments({ bookId: new ObjectId(bookId) });

  const copiesToAdd = numberOfCopies - existingCopiesCount;

  if (copiesToAdd > 0) {
    const copies = Array.from({ length: copiesToAdd }, () => ({
      bookId,
      status: CopyStatus.Available,
    }));

    await Copy.insertMany(copies);
  } else if (copiesToAdd < 0) {
    await Copy.deleteMany({ bookId: new ObjectId(bookId), status: CopyStatus.Available })
  }
}

export const getCopiesCountService = async (bookId: string): Promise<number> => {
  return await Copy.countDocuments({ bookId: new ObjectId(bookId) });
}

export const updateBookService = async (id: string, book: IBook): Promise<IBook | null> => {
  return await Book.findByIdAndUpdate(new ObjectId(id), book, { new: true });
}

export const deleteBookService = async (id: string): Promise<IBook | null> => {
  return await Book.findByIdAndDelete(new ObjectId(id));
}
