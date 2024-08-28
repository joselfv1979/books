import IBook from "../models/Book";

const books = [
    {
        title: "El doctor enamorado",
        author: "Roberto Heras",
        publisher: "La casa del Libro",
        isbn: "0-1062-0565-X",
        genre: ["Literary Fiction", "Drama"],
        pages: 259,
        imagePath: ""
    },
    {
        title: "Cuando amanece",
        author: "Juan Muxía",
        publisher: "Random Editorial",
        isbn: "0-1168-5687-4",
        genre: ["Literary Fiction", "Drama"],
        pages: 347,
        imagePath: ""
    },
    {
        title: "La tumba inhabitada",
        author: "Ana Redondo",
        publisher: "La casa del Libro",
        isbn: "0-1915-0172-7",
        genre: ["Horror", "Short story"],
        pages: 284,
        imagePath: ""
    },
    {
        title: "El cielo abierto",
        author: "Carlos Lafuente",
        publisher: "Random Editorial",
        isbn: "0-3075-5045-1",
        genre: ["Action & Adventure", "Literary Fiction"],
        pages: 307,
        imagePath: ""
    },
    {
        title: "El carrusel",
        author: "Silvia Abril",
        publisher: "La casa del Libro",
        isbn: "0-9765-1898-8",
        genre: ["Dystopian"],
        pages: 273,
        imagePath: ""
    },
    {
        title: "Cuando se come aquí",
        author: "Pedro María Barrera",
        publisher: "Random Editorial",
        isbn: "0-4346-9691-9",
        genre: ["Comedy", "Dystopian"],
        pages: 227,
        imagePath: ""
    },
    {
        title: "Lluvia sucia",
        author: "Iñaki Lafuente",
        publisher: "La Ilustración Ibérica",
        isbn: "0-4346-9691-9",
        genre: ["Thriller", "Science fiction"],
        pages: 307,
        imagePath: ""
    },
    {
        title: "Casi llega la muerte",
        author: "Pedro María Barrera",
        publisher: "La Ilustración Ibérica",
        isbn: "0-1466-8908-9",
        genre: ["Thriller", "Mystery"],
        pages: 377,
        imagePath: ""
    },
    {
        title: "La iglesia",
        author: "Ruth Bella",
        publisher: "La casa del Libro",
        isbn: "0-3021-0907-2",
        genre: ["History", "Biography"],
        pages: 327,
        imagePath: ""
    },
    {
        title: "El corredor",
        author: "Jose María Matheu",
        publisher: "La Ilustración Ibérica",
        isbn: "0-3076-4137-6",
        genre: ["Literary fiction", "Classics"],
        pages: 312,
        imagePath: ""
    },
    {
        title: "El pueblo de la Costa Brava",
        author: "Jordi Abreu",
        publisher: "0-4508-2942-1",
        isbn: "0-8453-2729-1",
        genre: ["History", "Biography"],
        pages: 247,
        imagePath: ""
    },
    {
        title: "La sequía",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El embalse",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La tormenta",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El verano",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El adiós",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La hora final",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El bombardeo",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La literatura",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La persona templada",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La demagogia",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La opinión",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La vecina",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La broma",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La revuelta",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La hija",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La madre",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La intervención",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La vida",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La Reina",
        author: "Juan Muxía",
        publisher: "La firma",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La monta",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La mirada",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La jugada",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La apuesta",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La rebelde",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La abuela",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La pintura",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La loca",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La Reina",
        author: "Juan Muxía",
        publisher: "La hipoteca",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La jungla",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La agenda",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La ilusión",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La naranja",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La emisora",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La camarera",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La temporada",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La inglesa",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El cuajo",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La barca",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "El banquero",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La Taza",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
    {
        title: "La Perra",
        author: "Juan Muxía",
        publisher: "La casa del Libro",
        isbn: "0-4285-9502-2",
        genre: ["History", "Biography"],
        pages: 467,
        imagePath: ""
    },
];

export const createBooks = async () => {
    books.forEach((book) => {
        let newBook = new IBook(book);

        newBook.save().then(book => console.log('New book: ', book.title))
            .catch(e => console.log('error', e))
    });
}
