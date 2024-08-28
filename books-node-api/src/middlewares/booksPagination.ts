import { NextFunction } from "express";
import Book from "../models/Book";
import { CustomError } from "../models/CustomError";
import { PaginationRequest, PaginationResponse, PaginationResults } from "../models/Pagination";
import { getBooksService } from "../services/bookService";

export const bookPagination = async (
    req: PaginationRequest,
    res: PaginationResponse,
    next: NextFunction
) => {
    try {
        // Filtering
        const queryObject: { [key: string]: string } = { ...req.query };

        const excludedFields = ['sort', 'limit', 'page', 'fields'];
        excludedFields.forEach((ele: string) => delete queryObject[ele]);

        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        req.query.skip = startIndex.toString();

        const results: PaginationResults = {
            books: [],
            next: 0,
            previous: 0,
            currentPage: page,
            totalDocs: 0,
            totalPages: 0,
            lastPage: 0
        };

        // Advance filtering (for gte/$lt/) Example: pages[gt]=327
        let queryString = JSON.stringify(queryObject);
        const reg = /\bgte|gt|lte|lt\b/g;
        queryString = queryString.replace(reg, (matchString) => `$${matchString}`);

        // Search
        let searchQuery: any;
        if (req.query.search) {
            const searchText = req.query.search;
            searchQuery = {
                $or: [
                    { title: { $regex: searchText } },
                    { author: { $regex: searchText } },
                    { isbn: { $regex: searchText } },
                    { publisher: { $regex: searchText } },
                    { genre: { $regex: searchText } },
                ],
            };
            req.query.searchQuery = searchQuery;
        } else if (req.query.search === '') {
            req.query.searchQuery = {};
        } else {
            req.query.searchQuery = JSON.parse(queryString);
        }

        // Sorting example: ?sort=-price,-ratings,pages
        if (req.query.sort) {
            req.query.sort = req.query.sort.split(',').join(' ');

        } else {
            req.query.sort = '-createdAt';
        }

        // Fields Limiting example: ?fields=price,description,ratings
        if (req.query.fields) {
            req.query.fields = req.query.fields.split(',').join(' ');
        } else {
            req.query.fields = '-_v';
        }

        results.books = await getBooksService(req.query);

        const totalCount = await Book.countDocuments(searchQuery);
        results.totalDocs = totalCount;

        if (endIndex < totalCount) {
            results.next = page + 1
        }

        if (startIndex > 0) {
            results.previous = page - 1
        }

        results.totalPages = Math.ceil(totalCount / limit);
        results.lastPage = Math.ceil(totalCount / limit);

        // Add paginated Results to the request
        res.paginatedResults = results;

        next();
    } catch (error) {
        next(new CustomError(500, "Couldn't fetch books, try it later"));
    }
}