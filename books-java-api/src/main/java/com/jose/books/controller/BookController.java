package com.jose.books.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;

import com.jose.books.dto.BookDto;
import com.jose.books.service.BookService;
import com.jose.books.util.FileUploadUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
public class BookController {

        @Autowired
        private BookService bookService;

        @GetMapping(value = "/books")
        public ResponseEntity<List<BookDto>> getAllBooks() {

                List<BookDto> bookDTOs = bookService.getAllBooks();

                return ResponseEntity.ok().body(bookDTOs);
        }

        @GetMapping(value = "/books/{id}")
        public ResponseEntity<BookDto> getBook(@PathVariable String id) {

                BookDto bookDto = bookService.findById(id);

                return ResponseEntity.ok().body(bookDto);
        }

        @PostMapping(value = "/books", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
        public ResponseEntity<BookDto> addBook(@Valid BookDto book, @RequestParam MultipartFile image)
                        throws IOException {

                String fileName = null;

                if (image.getOriginalFilename() != null) {
                        fileName = UUID.randomUUID() + "-" + StringUtils.cleanPath(image.getOriginalFilename());
                }

                BookDto newBook = new BookDto(book.getTitle(), book.getAuthor(), book.getPrice(),
                                book.getPages(), fileName);

                BookDto savedBook = bookService.save(newBook);

                String uploadDir = "./books-java-api/src/main/resources/static/";

                FileUploadUtil.saveFile(uploadDir, fileName, image);

                return ResponseEntity.ok().body(savedBook);
        }

        @PutMapping(value = "/books/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
        public ResponseEntity<BookDto> updateBook(@PathVariable String id, @Valid BookDto newBook,
                        MultipartFile image) throws IOException {

                String fileName = null;
                String uploadDir = null;

                if (image != null) {
                        fileName = UUID.randomUUID() + "-" + StringUtils.cleanPath(image.getOriginalFilename());
                        uploadDir = "./books-java-api/src/main/resources/static/";
                        FileUploadUtil.saveFile(uploadDir, fileName, image);
                } else {
                        fileName = newBook.getImagePath();
                }

                BookDto bookDto = bookService.findById(id);

                bookDto.setTitle(newBook.getTitle());
                bookDto.setAuthor(newBook.getAuthor());
                bookDto.setPrice(newBook.getPrice());
                bookDto.setPages(newBook.getPages());
                bookDto.setImagePath(fileName);

                BookDto savedBook = bookService.save(bookDto);

                return ResponseEntity.ok().body(savedBook);
        }

        @DeleteMapping(value = "/books/{id}")
        public ResponseEntity<String> deleteBook(@PathVariable String id) {

                bookService.deleteBook(id);

                return ResponseEntity.ok().body("Book deleted with success");
        }

}