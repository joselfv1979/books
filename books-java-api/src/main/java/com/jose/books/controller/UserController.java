package com.jose.books.controller;

import java.util.List;

import jakarta.validation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jose.books.dto.UserDto;
import com.jose.books.payload.response.ApiResponse;
import com.jose.books.service.UserServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@GetMapping(value = "/users")
	public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {

		List<UserDto> userDtos = userService.getAllUsers();

		ApiResponse<List<UserDto>> response = new ApiResponse<>();
		response.setSuccess(true);
		response.setData(userDtos);

		return ResponseEntity.ok().body(response);
	}

	@GetMapping(value = "/users/{id}")
	public ResponseEntity<ApiResponse<UserDto>> getUser(@PathVariable String id) {

		UserDto userDto = userService.findById(id);

		ApiResponse<UserDto> response = new ApiResponse<>();
		response.setSuccess(true);
		response.setData(userDto);

		return ResponseEntity.ok().body(response);
	}

	@PutMapping(value = "/users/{id}")
	public ResponseEntity<ApiResponse<UserDto>> updateUser(@PathVariable String id, @Valid @RequestBody UserDto user) {

		UserDto userDto = userService.findById(id);

		userDto.setUsername(user.getUsername());
		userDto.setFullname(user.getFullname());
		userDto.setEmail(user.getEmail());
		userDto.setRoles(user.getRoles());

		UserDto newUserDto = userService.updateUser(userDto);

		ApiResponse<UserDto> response = new ApiResponse<>();
		response.setSuccess(true);
		response.setMessage("User updated with success");
		response.setData(newUserDto);

		return ResponseEntity.ok().body(response);
	}

	@DeleteMapping(value = "/users/{id}")
	public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable String id) {

		userService.deleteUser(id);

		ApiResponse<String> response = new ApiResponse<>();
		response.setSuccess(true);
		response.setMessage("User deleted with success");

		return ResponseEntity.ok().body(response);
	}
}
