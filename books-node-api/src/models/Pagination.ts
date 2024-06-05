import { Request, Response } from "express";
import { IBook } from "./Book";

export interface PaginationRequest extends Request {
    query: {
        limit: string;
        page: string;
        orderBy: string;
        sortBy: string;
        filterBy: string;
        query: any;
        category: string;
        search: string;
        content: string;
        role: string;
        sort: string;
        fields: string;
        searchQuery: any;
        skip: string;
    };
}

export interface PaginationResponse extends Response {
    paginatedResults?: PaginationResults
}

export interface PaginationResults {
    books: IBook[];
    next: number;
    previous: number;
    currentPage: number;
    totalDocs: number;
    totalPages: number;
    lastPage: number;
}