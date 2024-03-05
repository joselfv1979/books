import { Book } from '../types/Book';
import { User } from '../types/User';

export const castUserToFormData = (user: User) => {
    const { id, fullname, username, email, password, roles } = user;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    for (const role of roles) {
        formData.append('roles', role.toString());
    }

    return formData;
};

export const castBookToFormData = (book: Book) => {
    const { id, title, author, price, pages, image, imagePath } = book;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price.toString());
    formData.append('pages', pages.toString());
    image ? formData.append('image', image)
        : formData.append('imagePath', imagePath);

    return formData;
};