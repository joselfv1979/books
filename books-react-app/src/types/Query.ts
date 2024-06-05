import { Book } from "./Book";

export type Query = {
    limit?: number;
    page?: number;
    orderBy?: string;
    sortBy?: string;
    filterBy?: string;
    category?: string;
    search?: string | null;
    content?: string;
    role?: string;
    sort?: string;
    fields?: string;
    author?: string;
}

export type QueryResponse = {
    books: Book[];
    currentPage: string;
    lastPage: string;
    nextPage: string;
    totalDocs: string
    totalPages: string
}