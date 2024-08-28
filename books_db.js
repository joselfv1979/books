db = db.getSiblingDB("books_db_test");

db.createCollection("users", { autoIndexId: true });
db.createCollection("books", { autoIndexId: true });
db.createCollection("roles", { autoIndexId: true });

const roles = [{ name: "ADMIN" }, { name: "USER" }];

db.roles.insertMany(roles);

const ADMIN_ROLE = db.roles.findOne({
  name: "ADMIN",
});

const USER_ROLE = db.roles.findOne({
  name: "USER",
});

const adminId = ADMIN_ROLE._id;
const userId = USER_ROLE._id;

const users = [
  {
    fullname: "admin",
    username: "admin",
    email: "admin@gmail.com",
    password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
    roles: [adminId, userId],
    imagePath: "",
    books: [],
  },
  {
    fullname: "user1",
    username: "user1",
    email: "user1@gmail.com",
    password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
    roles: [userId],
    imagePath: "",
    books: [],
  },
];

db.users.insertMany(users);

const books = [
  {
    title: "El doctor enamorado",
    author: "Roberto Heras",
    publisher: "La casa del Libro",
    isbn: "0-1062-0565-X",
    genre: ["Literary Fiction", "Drama"],
    pages: 259,
    imagePath: "",
  },
  {
    title: "Cuando amanece",
    author: "Juan Muxía",
    publisher: "Random Editorial",
    isbn: "0-1168-5687-4",
    genre: ["Literary Fiction", "Drama"],
    pages: 347,
    imagePath: "",
  },
  {
    title: "La tumba inhabitada",
    author: "Ana Redondo",
    publisher: "La casa del Libro",
    isbn: "0-1915-0172-7",
    genre: ["Horror", "Short story"],
    pages: 284,
    imagePath: "",
  },
  {
    title: "El cielo abierto",
    author: "Carlos Lafuente",
    publisher: "Random Editorial",
    isbn: "0-3075-5045-1",
    genre: ["Action & Adventure", "Literary Fiction"],
    pages: 307,
    imagePath: "",
  },
  {
    title: "El carrusel",
    author: "Silvia Abril",
    publisher: "La casa del Libro",
    isbn: "0-9765-1898-8",
    genre: ["Dystopian"],
    pages: 273,
    imagePath: "",
  },
  {
    title: "Cuando se come aquí",
    author: "Pedro María Barrera",
    publisher: "Random Editorial",
    isbn: "0-4346-9691-9",
    genre: ["Comedy", "Dystopian"],
    pages: 227,
    imagePath: "",
  },
  {
    title: "Lluvia sucia",
    author: "Iñaki Lafuente",
    publisher: "La Ilustración Ibérica",
    isbn: "0-4346-9691-9",
    genre: ["Thriller", "Science fiction"],
    pages: 307,
    imagePath: "",
  },
  {
    title: "Casi llega la muerte",
    author: "Pedro María Barrera",
    publisher: "La Ilustración Ibérica",
    isbn: "0-1466-8908-9",
    genre: ["Thriller", "Mystery"],
    pages: 377,
    imagePath: "",
  },
  {
    title: "La iglesia",
    author: "Ruth Bella",
    publisher: "La casa del Libro",
    isbn: "0-3021-0907-2",
    genre: ["History", "Biography"],
    pages: 327,
    imagePath: "",
  },
  {
    title: "El corredor",
    author: "Jose María Matheu",
    publisher: "La Ilustración Ibérica",
    isbn: "0-3076-4137-6",
    genre: ["Literary fiction", "Classics"],
    pages: 312,
    imagePath: "",
  },
  {
    title: "El pueblo de la Costa Brava",
    author: "Jordi Abreu",
    publisher: "0-4508-2942-1",
    isbn: "0-8453-2729-1",
    genre: ["History", "Biography"],
    pages: 247,
    imagePath: "",
  },
];

db.books.insertMany(books);
