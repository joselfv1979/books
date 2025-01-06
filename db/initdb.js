db = db.getSiblingDB("booksdb");

db.users.drop();
db.books.drop();
db.roles.drop();

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

const adminRoleId = ADMIN_ROLE._id;
const userRoleId = USER_ROLE._id;

const users = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
    roles: [adminRoleId, userRoleId],
    imagePath: "",
    books: [],
  },
  {
    username: "user1",
    email: "user1@gmail.com",
    password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
    roles: [userRoleId],
    imagePath: "",
    books: [],
  },
  {
    username: "user2",
    email: "user2@gmail.com",
    password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
    roles: [userRoleId],
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
    description:
      "A poignant story about a doctor torn between his medical career and his blossoming love.",
  },
  {
    title: "Cuando amanece",
    author: "Juan Muxía",
    publisher: "Random Editorial",
    isbn: "0-1168-5687-4",
    genre: ["Literary Fiction", "Drama"],
    pages: 347,
    imagePath: "",
    description:
      "A deep exploration of renewal and hope as life begins anew each day.",
  },
  {
    title: "La tumba inhabitada",
    author: "Ana Redondo",
    publisher: "La casa del Libro",
    isbn: "0-1915-0172-7",
    genre: ["Horror", "Short story"],
    pages: 198,
    imagePath: "",
    description:
      "A haunting tale of an abandoned graveyard and the secrets it holds.",
  },
  {
    title: "El cielo abierto",
    author: "Carlos Lafuente",
    publisher: "Random Editorial",
    isbn: "0-3075-5045-1",
    genre: ["Action & Adventure", "Literary Fiction"],
    pages: 307,
    imagePath: "",
    description:
      "An epic journey of discovery and survival under endless skies.",
  },
  {
    title: "El carrusel",
    author: "Silvia Abril",
    publisher: "La casa del Libro",
    isbn: "0-9765-1898-8",
    genre: ["Dystopian"],
    pages: 273,
    imagePath: "",
    description:
      "A compelling dystopian narrative where society revolves in endless cycles.",
  },
  {
    title: "Cuando se come aquí",
    author: "Pedro María Barrera",
    publisher: "Random Editorial",
    isbn: "0-4346-9691-9",
    genre: ["Comedy", "Dystopian"],
    pages: 227,
    imagePath: "",
    description:
      "A satirical look at dystopian life with humor that bites and stings.",
  },
  {
    title: "Lluvia sucia",
    author: "Iñaki Lafuente",
    publisher: "La Ilustración Ibérica",
    isbn: "0-4346-9691-9",
    genre: ["Thriller", "Science fiction"],
    pages: 307,
    imagePath: "",
    description:
      "A gritty science fiction thriller set in a polluted and dangerous future.",
  },
  {
    title: "Casi llega la muerte",
    author: "Pedro María Barrera",
    publisher: "La Ilustración Ibérica",
    isbn: "0-1466-8908-9",
    genre: ["Thriller", "Mystery"],
    pages: 377,
    imagePath: "",
    description:
      "A gripping mystery that keeps readers on edge until its final, unexpected twist.",
  },
  {
    title: "La iglesia",
    author: "Ruth Bella",
    publisher: "La casa del Libro",
    isbn: "0-3021-0907-2",
    genre: ["History", "Biography"],
    pages: 327,
    imagePath: "",
    description:
      "A historical biography of a church and the lives intertwined within its walls.",
  },
  {
    title: "El corredor",
    author: "Jose María Matheu",
    publisher: "La Ilustración Ibérica",
    isbn: "0-3076-4137-6",
    genre: ["Literary Fiction", "Classics"],
    pages: 312,
    imagePath: "",
    description:
      "A classic tale of determination and the unyielding spirit of a marathon runner.",
  },
  {
    title: "El pueblo de la Costa Brava",
    author: "Jordi Abreu",
    publisher: "Editorial Planeta",
    isbn: "0-4508-2942-1",
    genre: ["History", "Biography"],
    pages: 247,
    imagePath: "",
    description:
      "An enchanting history of a coastal town and its enduring cultural legacy.",
  },
  {
    title: "La sequía",
    author: "Juan Muxía",
    publisher: "La casa del Libro",
    isbn: "0-4285-9502-2",
    genre: ["History", "Biography"],
    pages: 467,
    imagePath: "",
    description:
      "An exploration of survival and resilience in a parched and unforgiving world.",
  },
  {
    title: "El embalse",
    author: "Juan Muxía",
    publisher: "La casa del Libro",
    isbn: "0-4285-9502-2",
    genre: ["History", "Biography"],
    pages: 467,
    imagePath: "",
    description:
      "The story of a community bound by the construction of a life-changing dam.",
  },
  {
    title: "La tormenta",
    author: "Juan Muxía",
    publisher: "La casa del Libro",
    isbn: "0-4285-9502-2",
    genre: ["History", "Biography"],
    pages: 467,
    imagePath: "",
    description:
      "A harrowing account of survival in the face of nature's fury.",
  },
  {
    title: "El agua prometida",
    author: "Juan Muxía",
    publisher: "La casa del Libro",
    isbn: "0-4285-9502-2",
    genre: ["History", "Biography"],
    pages: 467,
    imagePath: "",
    description:
      "The inspiring journey to secure water for a barren land and its people.",
  },
  {
    title: "La historia infinita",
    author: "Michael Ende",
    publisher: "Alfaguara",
    isbn: "978-84-204-1234-5",
    genre: ["Fantasy", "Adventure"],
    pages: 528,
    imagePath: "",
    description:
      "A magical adventure that transcends reality and brings readers into the heart of Fantasia.",
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    publisher: "Penguin Random House",
    isbn: "978-84-253-2437-8",
    genre: ["Literary Fiction", "Magical Realism"],
    pages: 471,
    imagePath: "",
    description:
      "A multi-generational tale of the Buendía family in the mythical town of Macondo.",
  },
  {
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    publisher: "Editorial Planeta",
    isbn: "978-84-08-06724-1",
    genre: ["Mystery", "Historical Fiction"],
    pages: 576,
    imagePath: "",
    description:
      "An unforgettable story about a young boy’s discovery of a mysterious book in post-war Barcelona.",
  },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    publisher: "Espasa Calpe",
    isbn: "978-84-670-4414-8",
    genre: ["Classic", "Adventure"],
    pages: 1345,
    imagePath: "",
    description:
      "The timeless tale of an idealistic knight and his loyal squire as they embark on a journey of chivalry.",
  },
  {
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    publisher: "Salamandra",
    isbn: "978-84-7888-027-3",
    genre: ["Children's Literature", "Philosophy"],
    pages: 96,
    imagePath: "",
    description:
      "A beautifully simple yet profound story about friendship, love, and life’s essential truths.",
  },
  {
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    publisher: "Salamandra",
    isbn: "978-84-7888-004-4",
    genre: ["Fantasy", "Adventure"],
    pages: 223,
    imagePath: "",
    description:
      "The story of a young wizard's introduction to the magical world and his first year at Hogwarts.",
  },
  {
    title: "1984",
    author: "George Orwell",
    publisher: "Debolsillo",
    isbn: "978-84-9032-707-5",
    genre: ["Dystopian", "Political Fiction"],
    pages: 352,
    imagePath: "",
    description:
      "A chilling vision of a totalitarian future where surveillance and control dominate society.",
  },
  {
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    publisher: "Penguin Clásicos",
    isbn: "978-84-279-3366-4",
    genre: ["Classic", "Romance"],
    pages: 416,
    imagePath: "",
    description:
      "A romantic and satirical exploration of manners, morality, and relationships in Regency-era England.",
  },
  {
    title: "Crimen y castigo",
    author: "Fyodor Dostoevsky",
    publisher: "Alianza Editorial",
    isbn: "978-84-9104-269-4",
    genre: ["Classic", "Psychological Fiction"],
    pages: 704,
    imagePath: "",
    description:
      "A harrowing exploration of guilt, redemption, and the human psyche.",
  },
  {
    title: "Matar a un ruiseñor",
    author: "Harper Lee",
    publisher: "HarperCollins",
    isbn: "978-84-450-7170-5",
    genre: ["Historical Fiction", "Drama"],
    pages: 281,
    imagePath: "",
    description:
      "A powerful story of racial injustice and childhood innocence in the American South.",
  },
  {
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    publisher: "Plaza & Janés",
    isbn: "978-84-0167-024-2",
    genre: ["Fantasy", "Adventure"],
    pages: 880,
    imagePath: "",
    description:
      "An epic tale of a gifted young man’s rise to legendary status in a world of magic and danger.",
  },
  {
    title: "El juego de Ender",
    author: "Orson Scott Card",
    publisher: "Ediciones B",
    isbn: "978-84-666-1591-9",
    genre: ["Science Fiction", "Adventure"],
    pages: 352,
    imagePath: "",
    description:
      "A young boy is trained in military tactics to save Earth from an alien threat.",
  },
  {
    title: "Las aventuras de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    publisher: "Anaya",
    isbn: "978-84-7525-211-7",
    genre: ["Mystery", "Classic"],
    pages: 307,
    imagePath: "",
    description:
      "A collection of riveting short stories featuring the world’s most famous detective.",
  },
  {
    title: "El hobbit",
    author: "J.R.R. Tolkien",
    publisher: "Minotauro",
    isbn: "978-84-450-7445-4",
    genre: ["Fantasy", "Adventure"],
    pages: 320,
    imagePath: "",
    description:
      "The thrilling prelude to 'The Lord of the Rings,' following Bilbo Baggins on his journey.",
  },
  {
    title: "Los pilares de la Tierra",
    author: "Ken Follett",
    publisher: "Debolsillo",
    isbn: "978-84-9908-830-1",
    genre: ["Historical Fiction", "Drama"],
    pages: 1040,
    imagePath: "",
    description:
      "A sweeping epic about the construction of a cathedral in medieval England.",
  },
  {
    title: "La casa de los espíritus",
    author: "Isabel Allende",
    publisher: "Debolsillo",
    isbn: "978-84-663-1567-7",
    genre: ["Magical Realism", "Family Saga"],
    pages: 480,
    imagePath: "",
    description:
      "A mesmerizing multi-generational story filled with passion, politics, and the supernatural.",
  },
  {
    title: "Drácula",
    author: "Bram Stoker",
    publisher: "Alianza Editorial",
    isbn: "978-84-9104-407-0",
    genre: ["Horror", "Classic"],
    pages: 416,
    imagePath: "",
    description:
      "The iconic tale of Count Dracula and his attempt to move from Transylvania to England.",
  },
];

db.books.insertMany(books);
