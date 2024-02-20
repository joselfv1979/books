package com.jose.books.service;

import java.util.List;
import com.jose.books.dto.UserDto;
import com.jose.books.payload.request.SignupRequest;

public interface UserService {

    List<UserDto> getAllUsers();

    UserDto findById(String id);

    UserDto findByEmail(String email);

    UserDto findByUsername(String username);

    UserDto createUser(SignupRequest user);

    UserDto updateUser(UserDto user);

    void deleteUser(String id);
}