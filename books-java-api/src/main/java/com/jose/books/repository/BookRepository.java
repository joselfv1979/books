package com.jose.books.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jose.books.model.Book;

@Repository
@Qualifier
public interface BookRepository extends MongoRepository<Book, String> {
}
