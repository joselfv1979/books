package com.jose.books.services;

import java.util.List;
import java.util.Optional;

import com.jose.books.models.User;
import com.jose.books.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
 
    UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
    	this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
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
    //     return userRepository.save(usr);
    // }

    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }
}
