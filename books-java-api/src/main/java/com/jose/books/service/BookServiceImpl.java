package com.jose.books.service;

import java.util.List;
import java.util.stream.Collectors;

import com.jose.books.dto.BookDto;
import com.jose.books.exceptions.ResourceNotFoundException;
import com.jose.books.model.Book;
import com.jose.books.repository.BookRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    // autowire model mapper instance
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BookDto> getAllBooks() {

        List<Book> bookList = this.bookRepository.findAll();

        // we use map to convert the Book list into BookDto list
        return bookList.stream().map(
                book -> this.modelMapper.map(book, BookDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BookDto findById(String id) {

        Book book = this.bookRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Book not found"));

        return this.modelMapper.map(book, BookDto.class);
    }

    @Override
    public BookDto save(BookDto bookDto) {

        Book book = this.modelMapper.map(bookDto, Book.class);

        Book bookSaved = this.bookRepository.save(book);

        return this.modelMapper.map(bookSaved, BookDto.class);
    }

    @Override
    public void deleteBook(String id) {

        Book book = this.bookRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Book not found"));

        this.bookRepository.delete(book);
    }
}