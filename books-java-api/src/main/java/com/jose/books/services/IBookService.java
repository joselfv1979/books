package com.jose.books.services;

import java.util.List;
import java.util.Optional;

import com.jose.books.models.Book;

public interface IBookService {
    List<Book> getAllBooks();
    Optional<Book> findById(int id);
    Book save(Book book);
    void deleteById(int id);
}
