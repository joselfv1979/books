package com.jose.books.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import jakarta.validation.*;

import com.jose.books.dto.BookDto;
import com.jose.books.payload.response.ApiResponse;
import com.jose.books.service.BookService;
import com.jose.books.util.FileUploadUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class BookController {

        @Autowired
        private BookService bookService;

        @GetMapping(value = "/books")
        public ResponseEntity<ApiResponse<List<BookDto>>> getAllBooks() {

                List<BookDto> bookDTOs = bookService.getAllBooks();

                ApiResponse<List<BookDto>> response = new ApiResponse<>();
                response.setSuccess(true);
                response.setData(bookDTOs);

                return ResponseEntity.ok().body(response);
        }

        @GetMapping(value = "/books/{id}")
        public ResponseEntity<ApiResponse<BookDto>> getBook(@PathVariable String id) {

                BookDto bookDto = bookService.findById(id);

                ApiResponse<BookDto> response = new ApiResponse<>();
                response.setSuccess(true);
                response.setData(bookDto);

                return ResponseEntity.ok().body(response);
        }

        @PostMapping(value = "/books", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
        public ResponseEntity<ApiResponse<BookDto>> addBook(@Valid BookDto book, @RequestParam MultipartFile image)
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

                ApiResponse<BookDto> response = new ApiResponse<>();
                response.setSuccess(true);
                response.setMessage("Book created with success");
                response.setData(savedBook);

                return ResponseEntity.ok().body(response);
        }

        @PutMapping(value = "/books/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
        public ResponseEntity<ApiResponse<BookDto>> updateBook(@PathVariable String id, @Valid BookDto book,
                        MultipartFile image) throws IOException {

                String fileName = null;
                String uploadDir = null;

                if (image != null) {
                        fileName = UUID.randomUUID() + "-" + StringUtils.cleanPath(image.getOriginalFilename());
                        uploadDir = "./books-java-api/src/main/resources/static/";
                        FileUploadUtil.saveFile(uploadDir, fileName, image);
                } else {
                        fileName = book.getImagePath();
                }

                BookDto bookDto = bookService.findById(id);

                bookDto.setTitle(book.getTitle());
                bookDto.setAuthor(book.getAuthor());
                bookDto.setPrice(book.getPrice());
                bookDto.setPages(book.getPages());
                bookDto.setImagePath(fileName);

                BookDto savedBook = bookService.save(bookDto);

                ApiResponse<BookDto> response = new ApiResponse<>();
                response.setSuccess(true);
                response.setMessage("Book updated with success");
                response.setData(savedBook);

                return ResponseEntity.ok().body(response);
        }

        @DeleteMapping(value = "/books/{id}")
        public ResponseEntity<ApiResponse<String>> deleteBook(@PathVariable String id) {

                bookService.deleteBook(id);

                ApiResponse<String> response = new ApiResponse<>();
                response.setSuccess(true);
                response.setMessage("Book deleted with success");

                return ResponseEntity.ok().body(response);
        }

}