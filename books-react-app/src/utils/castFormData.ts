import { IBook } from '../types/Book';
import { IUser } from '../types/User';

export const castUserToFormData = (user: IUser) => {
    const { id, fullname, username, email, password, roles, image, imagePath } = user;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image ? image : imagePath);

    for (const role of roles) {
        formData.append('roles', role);
    }

    return formData;
};

export const castBookToFormData = (book: IBook) => {
    const { id, title, author, price, pages, image, imagePath } = book;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price.toString());
    formData.append('pages', pages.toString());
    formData.append('image', image ? image : imagePath);

    return formData;
};
