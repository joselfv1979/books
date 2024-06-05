import { ObjectId } from "mongodb";
import Book, { IBook } from "../models/Book";
import { PaginationRequest } from "../models/Pagination";

export async function getBooksService(query: PaginationRequest["query"]) {

  const { searchQuery, limit, skip, sort, fields } = query;

  return await Book.find(searchQuery)
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort(sort)
    .select(fields);
}

export async function getBookService(id: string) {
  return await Book.findById(new ObjectId(id));
}

export async function createBookService(book: IBook) {
  return await book.save();
}

export async function updateBookService(id: string, book: IBook) {
  return await Book.findByIdAndUpdate(new ObjectId(id), book, { new: true });
}

export async function deleteBookService(id: string) {
  return await Book.findByIdAndDelete(new ObjectId(id));
}
