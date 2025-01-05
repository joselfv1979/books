export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    genre: string[];
    pages: number;
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
    errorMessage?: string;
    successMessage?: string;
    loading: boolean;
}
