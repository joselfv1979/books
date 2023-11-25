package com.jose.books.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jose.books.models.User;
import com.jose.books.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping(value="/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	// @PostMapping(value="/users")
	// public User addUser(@Valid @RequestBody User user) {
	// 	return userService.save(user);
	// }

}
