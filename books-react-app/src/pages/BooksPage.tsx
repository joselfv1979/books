import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookSearchBar from "../components/BookSearchBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Book } from "../types/Book";

interface Query {
    search?: string;
    page: number;
}

const BooksPage: React.FC = () => {
    const { getBooks } = useAppDispatch();
    const [query, setQuery] = useState<Query>({ page: 1 });

    useEffect(() => {
        getBooks(query);
    }, [query.page]);

    const books = useAppSelector(s => (s.book.books as Book[]) || []);

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight">Books</h1>
                <BookSearchBar query={query} setQuery={setQuery} />
            </div>

            {books.length === 0 ? (
                <p className="text-base text-brand-700">No books available.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {books.map(b => <BookCard key={b.id} book={b} />)}
                </div>
            )}

            <div className="flex justify-center gap-3 pt-6">
                <button
                    disabled={query.page <= 1}
                    onClick={() => setQuery(q => ({ ...q, page: q.page - 1 }))}
                    className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                <span className="text-base px-2 py-2">Page {query.page}</span>
                <button
                    onClick={() => setQuery(q => ({ ...q, page: q.page + 1 }))}
                    className="btn btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BooksPage;