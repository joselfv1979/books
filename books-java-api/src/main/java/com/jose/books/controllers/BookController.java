package com.jose.books.controllers;

import java.util.List;

import javax.validation.Valid;

import com.jose.books.exceptions.ResourceNotFoundException;
import com.jose.books.models.Book;
import com.jose.books.services.IBookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
public class BookController {
        private final IBookService bookService;

        @Autowired
        public BookController(IBookService bookservice) {
                this.bookService = bookservice;
        }

        @GetMapping(value = "/books")
        public ResponseEntity<?> getAllBooks() {
                List<Book> books = bookService.getAllBooks();
                return new ResponseEntity<>(books, HttpStatus.OK);
        }

        @GetMapping(value = "/books/{id}")
        public ResponseEntity<Book> getBook(@PathVariable int id) {
                Book book = bookService
                                .findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Book with " + id + " is Not Found"));
                return ResponseEntity.ok().body(book);
        }

        @PostMapping(value = "/books")
        public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
                bookService.save(book);
                return ResponseEntity.ok().body(book);
        }

        @PutMapping(value = "/books/{id}")
        public ResponseEntity<Book> updateBook(@PathVariable("id") int id, @Valid @RequestBody Book newBook) {
                Book book = bookService.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Book with " + id + " is Not Found"));
                book.setTitle(newBook.getTitle());
                book.setAuthor(newBook.getAuthor());
                book.setPrice(newBook.getPrice());
                book.setPages(newBook.getPages());
                bookService.save(book);
                return ResponseEntity.ok().body(book);
        }

        @DeleteMapping(value = "/books/{id}")
        public ResponseEntity<String> deleteBook(@PathVariable("id") int id) {
                Book book = bookService.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Book with " + id + " is Not Found"));
                bookService.deleteById(book.getId());
                return ResponseEntity.ok().body("Book deleted with success");
        }
}