export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    publishedYear?: number;
    isbn: string;
    language?: string;
    genre: string[];
    totalCopies?: number;
    availableCopies?: number;
    pages?: number;
    description: string;
    image?: File;
    imagePath: string;
};
export interface BookState {
    books: Book[];
    count?: string;
    currentPage?: string;
    lastPage?: string;
    nextPage?: string;
    totalDocs?: string;
    totalPages?: string;
    loading?: boolean;
    book: Book | null;
}
