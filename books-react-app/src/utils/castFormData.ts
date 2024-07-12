import { Book } from '../types/Book';
import { User } from '../types/User';

// function to create a FormData object from a User object
export const castUserToFormData = (user: User) => {
    const { id, fullname, username, email, password, roles, image, imagePath } = user;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);

    // it's not received when editing users 
    if (password) formData.append('password', password);

    // if a new file is received, otherwise appends the current file path
    image ? formData.append('image', image)
        : formData.append('imagePath', imagePath);

    for (const role of roles) {
        formData.append('roles', role.toString());
    }

    return formData;
};

// function to create a FormData object from a Book object
export const castBookToFormData = (book: Book) => {
    const { id, title, author, publisher, isbn, genre, pages, image, imagePath } = book;
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('isbn', isbn);

    for (const item of genre) {
        formData.append('genre', item.toString());
    }

    formData.append('pages', pages.toString());

    // if a new file is received, otherwise appends the current file path
    image ? formData.append('image', image)
        : formData.append('imagePath', imagePath);

    return formData;
};