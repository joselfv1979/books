export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    publishedYear: number | undefined;
    isbn: string;
    language: string;
    genre: string[];
    totalCopies: number | undefined;
    availableCopies: number | undefined;
    pages: number | undefined;
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
    totalDocs?: string
    totalPages?: string
    book: Book | null;
}
