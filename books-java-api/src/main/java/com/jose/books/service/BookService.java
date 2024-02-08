package com.jose.books.service;

import java.util.List;

import com.jose.books.dto.BookDto;

public interface BookService {

    List<BookDto> getAllBooks();

    BookDto findById(String id);

    BookDto save(BookDto book);

    void deleteBook(String id);
}
