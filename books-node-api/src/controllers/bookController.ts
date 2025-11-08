import { NextFunction, Request, Response } from "express";
import BookModel, { BookWithCopies, IBook } from "../models/Book";
import { CustomError } from "../models/CustomError";
import { PaginationRequest, PaginationResponse, PaginationResults } from "../models/Pagination";
import { ResBody } from "../models/Response";
import {
  createBookService,
  createCopiesService,
  deleteBookService,
  getBookService,
  updateBookService,
  updateCopiesService
} from "../services/bookService";
import Logger from "../utils/logger";
import { deleteBookImage } from "../utils/removeImage";

export const getBooksController = async (
  _req: PaginationRequest,
  res: PaginationResponse,
  next: NextFunction
) => {
  try {
    if (res?.paginatedResults) {
      const { books, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;
      const responseObject: PaginationResults = {
        books,
        totalDocs: totalDocs || 0,
        totalPages: totalPages || 0,
        next,
        previous,
        lastPage: lastPage || 0,
        currentPage: currentPage || 0,
      };

      return res.status(200).json({ success: true, data: responseObject })
    }
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't fetch books, try it later"));
  }
}

export const getBookController = async (
  req: Request,
  res: Response<ResBody<BookWithCopies>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const book = await getBookService(id);
    if (!book) return next(new CustomError(404, "Book not found"));

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't fetch book, try it later"));
  }
}

export const createBookController = async (
  req: Request,
  res: Response<ResBody<IBook>>,
  next: NextFunction
) => {
  try {
    const { body: { title, author, publisher, isbn, publishedYear, genre, language,
      pages, description, totalCopies }, file } = req;

    if (!title || !author || !publisher || !isbn || !publishedYear || !language
      || !pages || !totalCopies) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBook: IBook = new BookModel({
      title,
      author,
      publisher,
      isbn,
      publishedYear,
      genre,
      language,
      pages,
      description,
      imagePath: file?.path ?? undefined
    });

    const book = await createBookService(newBook);

    if (!book) return next(new CustomError(500, "Couldn't create book, try it later"));

    await createCopiesService(String(book.id), totalCopies);

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't create book, try it later"));
  }
}

export const updateBookController = async (
  req: Request,
  res: Response<ResBody<IBook>>,
  next: NextFunction
) => {
  try {
    const { body, params: { id }, file } = req;
    const { title, author, publisher, isbn, publishedYear, language, pages,
      imagePath, totalCopies } = body;

    if (!id || !title || !author || !publisher || !isbn || !publishedYear
      || !language || !pages || !totalCopies) {
      return next(new CustomError(400, "Bad request"));
    }

    // If a new image is sent, the old image is removed from the system file
    if (file) {
      await deleteBookImage(id);
    }

    const newBody = { ...req.body, imagePath: file?.path ?? imagePath };

    const book = await updateBookService(id, newBody);
    if (!book) return next(new CustomError(404, "Book not found"));

    await updateCopiesService(id, totalCopies);

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't update book, try it later"));
  }
}

export const deleteBookController = async (
  req: Request,
  res: Response<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    // Removes book image from the system file
    await deleteBookImage(id);

    const book = await deleteBookService(id);
    if (!book) return next(new CustomError(404, "Book not found"));

    res.status(204).json({ success: true });
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't delete book, try it later"));
  }
}
