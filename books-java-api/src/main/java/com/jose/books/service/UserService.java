package com.jose.books.service;

import java.util.List;
import java.util.Optional;

import com.jose.books.model.User;

public interface UserService {
    List<User> getAllUsers();

    Optional<User> findById(String id);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    // User save(User usr);
    void deleteById(String id);
}