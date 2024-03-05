export type Book = {
    id: string;
    title: string;
    author: string;
    price: number;
    pages: number;
    image?: File;
    imagePath: string;
};

export interface BookState {
    books: Book[];
    book: Book | null;
    errorMessage?: string;
    successMessage?: string;
    loading: boolean;
}
