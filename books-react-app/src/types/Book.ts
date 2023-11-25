export type IBook = {
    id: string;
    title: string;
    author: string;
    price: number | string;
    pages: number | string;
    image?: File;
    imagePath: string;
};

export const initialBook: IBook = {
    id: '',
    title: '',
    author: '',
    price: '',
    pages: '',
    image: undefined,
    imagePath: '',
};
