package com.jose.books.services;

import java.util.List;
import java.util.Optional;

import com.jose.books.models.User;

public interface IUserService {
    List<User> getAllUsers();
    Optional<User> findById(int id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    // User save(User usr);
    void deleteById(int id);
}