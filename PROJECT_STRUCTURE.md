# Project Structure

```
books/
├── README.md
├── docker-compose.yml
├── skills-lock.json
├── .gitignore
│
├── db/
│   ├── Dockerfile
│   ├── .env
│   └── initdb.js
│
├── books-java-api/              # Java/Spring Boot backend API
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── HELP.md
│   └── src/
│       ├── main/
│       │   ├── java/com/jose/books/
│       │   │   ├── BooksApplication.java
│       │   │   ├── controller/
│       │   │   │   ├── AuthController.java
│       │   │   │   ├── BookController.java
│       │   │   │   └── UserController.java
│       │   │   ├── dto/
│       │   │   │   ├── BookDto.java
│       │   │   │   └── UserDto.java
│       │   │   ├── exceptions/
│       │   │   │   ├── GlobalExceptionHandler.java
│       │   │   │   └── ResourceNotFoundException.java
│       │   │   ├── model/
│       │   │   │   ├── Book.java
│       │   │   │   ├── Role.java
│       │   │   │   └── User.java
│       │   │   ├── payload/
│       │   │   │   ├── request/
│       │   │   │   │   ├── LoginRequest.java
│       │   │   │   │   └── SignupRequest.java
│       │   │   │   └── response/
│       │   │   │       ├── ApiResponse.java
│       │   │   │       └── UserInfoResponse.java
│       │   │   ├── repository/
│       │   │   │   ├── BookRepository.java
│       │   │   │   ├── RoleRepository.java
│       │   │   │   └── UserRepository.java
│       │   │   ├── security/
│       │   │   │   ├── WebSecurityConfig.java
│       │   │   │   └── jwt/
│       │   │   │       ├── AuthEntryPointJwt.java
│       │   │   │       ├── AuthTokenFilter.java
│       │   │   │       └── JwtUtils.java
│       │   │   │   └── services/
│       │   │   │       ├── UserDetailsImpl.java
│       │   │   │       └── UserDetailsServiceImpl.java
│       │   │   ├── service/
│       │   │   │   ├── BookService.java
│       │   │   │   ├── BookServiceImpl.java
│       │   │   │   ├── UserService.java
│       │   │   │   └── UserServiceImpl.java
│       │   │   └── util/
│       │   │       └── FileUploadUtil.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/java/com/jose/books/
│           └── BooksApplicationTests.java
│
├── books-node-api/              # Node.js/Express backend API
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.ts
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── env/
│   │   ├── .env.development
│   │   ├── .env.production
│   │   └── .env.test
│   ├── logs/
│   │   ├── all.log
│   │   └── error.log
│   ├── public/                  # Uploaded book images
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── config.ts
│   │   │   └── connect.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── bookController.ts
│   │   │   ├── loanController.ts
│   │   │   └── userController.ts
│   │   ├── middlewares/
│   │   │   ├── authHandler.ts
│   │   │   ├── booksPagination.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── imageHandler.ts
│   │   │   └── morganHandler.ts
│   │   ├── models/
│   │   │   ├── Book.ts
│   │   │   ├── Copy.ts
│   │   │   ├── CustomError.ts
│   │   │   ├── Loan.ts
│   │   │   ├── Pagination.ts
│   │   │   ├── Response.ts
│   │   │   ├── Role.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── bookRoutes.ts
│   │   │   ├── loanRoutes.ts
│   │   │   ├── testRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── services/
│   │   │   ├── bookService.ts
│   │   │   ├── loanService.ts
│   │   │   └── userService.ts
│   │   ├── types/
│   │   │   └── helmet.d.ts
│   │   └── utils/
│   │       ├── addCopies.ts
│   │       ├── changePassword.ts
│   │       ├── jwt.utils.ts
│   │       ├── logger.ts
│   │       ├── removeImage.ts
│   │       └── testSeed.ts
│   └── tests/
│       ├── helpers.ts
│       ├── server.test.ts
│       └── controllers/
│           ├── authController.test.ts
│           ├── bookController.test.ts
│           └── userController.test.ts
│
└── books-react-app/             # React frontend
    ├── package.json
    ├── vite.config.mts
    ├── tsconfig.json
    ├── index.html
    ├── Dockerfile
    ├── .dockerignore
    ├── cypress.config.ts
    ├── env/
    │   ├── .env.development
    │   ├── .env.production
    │   └── .env.test
    ├── config/
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   └── tsconfig.json
    ├── nginx/
    │   └── nginx.conf
    ├── cypress/
    │   ├── e2e/
    │   │   ├── addBook.cy.ts
    │   │   ├── addUser.cy.ts
    │   │   ├── books.cy.ts
    │   │   ├── home.cy.ts
    │   │   ├── login.cy.ts
    │   │   └── users.cy.ts
    │   ├── support/
    │   │   ├── commands.ts
    │   │   ├── component-index.html
    │   │   ├── component.ts
    │   │   └── e2e.ts
    │   └── fixtures/
    │       └── example.json
    └── src/
        ├── index.tsx
        ├── index.css
        ├── App.tsx
        ├── App.test.tsx
        ├── vite-env.d.ts
        ├── logo.svg
        ├── README.md
        ├── assets/
        │   ├── fonts/
        │   │   └── museo-sans-300.ttf
        │   ├── images/
        │   │   ├── asterisk.svg
        │   │   ├── default-image.svg
        │   │   ├── fallback.svg
        │   │   ├── library.jpg
        │   │   ├── library.png
        │   │   └── user.svg
        │   └── scss/
        │       ├── aboutPage.module.scss
        │       ├── bookForm.module.scss
        │       ├── book.module.scss
        │       ├── bookSearch.module.scss
        │       ├── books.module.scss
        │       ├── editBook.module.scss
        │       ├── formImage.module.scss
        │       ├── globalStyles.module.scss
        │       ├── home.module.scss
        │       ├── landing.module.scss
        │       ├── loadFile.module.scss
        │       ├── loginForm.module.scss
        │       ├── menu.module.scss
        │       ├── userForm.module.scss
        │       └── userList.module.scss
        ├── components/
        │   ├── AdminRoute.tsx
        │   ├── AppRoutes.tsx
        │   ├── BookCard.tsx
        │   ├── BookDetail.tsx
        │   ├── BookForm.tsx
        │   ├── BookList.tsx
        │   ├── BookSearchBar.tsx
        │   ├── BreadCrumb.tsx
        │   ├── Carousel.tsx
        │   ├── DeleteModal.tsx
        │   ├── Footer.tsx
        │   ├── Header.tsx
        │   ├── Icons.tsx
        │   ├── Info.tsx
        │   ├── Layout.tsx
        │   ├── Loader.tsx
        │   ├── LoadFile.tsx
        │   ├── LoanList.tsx
        │   ├── LoginForm.tsx
        │   ├── Menu.tsx
        │   ├── Notification.tsx
        │   ├── Pagination.tsx
        │   ├── TagField.tsx
        │   ├── Tag.tsx
        │   ├── TextField.tsx
        │   ├── UserCard.tsx
        │   ├── UserForm.tsx
        │   ├── UserList.tsx
        │   └── ui/
        │       ├── Button.tsx
        │       └── Card.tsx
        ├── context/
        │   └── deleteModal/
        │       ├── DeleteModalContext.tsx
        │       └── DeleteModalContextProvider.tsx
        ├── data/
        │   └── ConstantUtils.ts
        ├── hooks/
        │   └── redux-hooks.ts
        ├── pages/
        │   ├── About.tsx
        │   ├── AccountPage.tsx
        │   ├── AddBook.tsx
        │   ├── AddUser.tsx
        │   ├── BookPage.tsx
        │   ├── Books.tsx
        │   ├── BooksPage.tsx
        │   ├── EditBook.tsx
        │   ├── EditUser.tsx
        │   ├── LandingPage.tsx
        │   ├── Loans.tsx
        │   ├── LoansPage.tsx
        │   ├── LoginPage.tsx
        │   ├── NotFound.tsx
        │   └── Users.tsx
        ├── services/
        │   ├── books.ts
        │   ├── loans.ts
        │   └── users.ts
        ├── store/
        │   ├── index.ts
        │   ├── book/
        │   │   ├── actions.ts
        │   │   ├── index.ts
        │   │   └── slice.ts
        │   ├── loan/
        │   │   ├── actions.ts
        │   │   ├── index.ts
        │   │   └── slice.ts
        │   ├── notification/
        │   │   ├── index.ts
        │   │   └── slice.ts
        │   ├── ui/
        │   │   ├── index.ts
        │   │   └── slice.ts
        │   └── user/
        │       ├── actions.ts
        │       ├── index.ts
        │       └── slice.ts
        ├── tests/
        │   ├── setupTests.ts
        │   ├── components/
        │   │   ├── BookForm.test.tsx
        │   │   ├── BookList.test.tsx
        │   │   ├── LoginForm.test.tsx
        │   │   └── UserForm.test.tsx
        │   ├── mocks/
        │   │   ├── fileMock.ts
        │   │   └── styleMock.ts
        │   ├── pages/
        │   │   ├── AddUser.test.tsx
        │   │   └── EditUser.test.tsx
        │   └── utils/
        │       ├── data.ts
        │       └── test-utils.tsx
        ├── types/
        │   ├── Book.ts
        │   ├── Loan.ts
        │   ├── Query.ts
        │   ├── Result.ts
        │   └── User.ts
        └── utils/
            ├── authHeader.ts
            ├── castFormData.ts
            ├── constants.ts
            ├── handleError.ts
            ├── localStorage.ts
            ├── validateBook.ts
            └── validateUser.ts
```
