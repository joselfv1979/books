package com.jose.books.service;

import java.util.List;
import java.util.Optional;

import com.jose.books.model.User;
import com.jose.books.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(String id) {
        if (id != null) {
            return userRepository.findById(id);
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // @Override
    // public User save(User usr) {
    // return userRepository.save(usr);
    // }

    @Override
    public void deleteById(String id) {
        if (id != null)
            userRepository.deleteById(id);
    }
}
