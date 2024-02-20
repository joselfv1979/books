package com.jose.books.controller;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jose.books.dto.UserDto;
import com.jose.books.payload.request.LoginRequest;
import com.jose.books.payload.request.SignupRequest;
import com.jose.books.payload.response.ApiResponse;
import com.jose.books.payload.response.UserInfoResponse;
import com.jose.books.repository.RoleRepository;
import com.jose.books.repository.UserRepository;
import com.jose.books.security.jwt.JwtUtils;
import com.jose.books.security.services.UserDetailsImpl;
import com.jose.books.service.UserServiceImpl;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserServiceImpl userService;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  UserRepository userRepository;
  @Autowired
  RoleRepository roleRepository;
  @Autowired
  PasswordEncoder encoder;
  @Autowired
  JwtUtils jwtUtils;

  @PostMapping(value = "/login")
  public ResponseEntity<ApiResponse<UserInfoResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    ApiResponse<UserInfoResponse> response = new ApiResponse<>();

    Authentication authentication = authenticationManager
        .authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwt = jwtUtils.generateTokenFromUsername(userDetails.getUsername());

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    response.setData(new UserInfoResponse(jwt, userDetails.getId(),
        userDetails.getFullname(),
        userDetails.getUsername(),
        userDetails.getEmail(),
        roles));
    response.setSuccess(true);

    return ResponseEntity.ok(response);
  }

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<UserDto>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

    ApiResponse<UserDto> response = new ApiResponse<>();
    response.setSuccess(false);

    if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
      response.setMessage("Username is already taken!");
      return ResponseEntity.badRequest().body(response);
    }
    if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
      response.setMessage("Email is already in use!");
      return ResponseEntity.badRequest().body(response);
    }

    UserDto newUserDto = userService.createUser(signUpRequest);
    response.setData(newUserDto);
    response.setMessage("User registered with success");
    response.setSuccess(true);

    return ResponseEntity.ok().body(response);
  }

}