package com.jose.books.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
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

import com.jose.books.model.ERole;
import com.jose.books.model.Role;
import com.jose.books.model.User;
import com.jose.books.payload.request.LoginRequest;
import com.jose.books.payload.request.SignupRequest;
import com.jose.books.payload.response.UserInfoResponse;
import com.jose.books.repository.RoleRepository;
import com.jose.books.repository.UserRepository;
import com.jose.books.security.jwt.JwtUtils;
import com.jose.books.security.services.UserDetailsImpl;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  UserRepository userRepository;
  @Autowired
  RoleRepository roleRepository;
  @Autowired
  PasswordEncoder encoder;
  @Autowired
  JwtUtils jwtUtils;

  @PostMapping(value = "/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    try {
      Authentication authentication = authenticationManager
          .authenticate(
              new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

      String jwt = jwtUtils.generateTokenFromUsername(userDetails.getUsername());

      List<String> roles = userDetails.getAuthorities().stream()
          .map(item -> item.getAuthority())
          .collect(Collectors.toList());

      return ResponseEntity.ok(new UserInfoResponse(jwt, userDetails.getId(),
          userDetails.getFullname(),
          userDetails.getUsername(),
          userDetails.getEmail(),
          roles));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Bad credentials");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

    if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
      return ResponseEntity.badRequest().body("Username is already taken!");
    }
    if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
      return ResponseEntity.badRequest().body("Email is already in use!");
    }
    // Create new user's account
    User user = new User(signUpRequest.getFullname(), signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRoles();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        if ("admin".equals(role)) {
          Role adminRole = roleRepository.findByName(ERole.ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);
        } else if ("user".equals(role)) {
          Role userRole = roleRepository.findByName(ERole.USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);
    return ResponseEntity.ok().body(user);
  }

  // @PostMapping("/signout")
  // public ResponseEntity<?> logoutUser() {
  // ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
  // return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
  // .body(new MessageResponse("You've been signed out!"));
  // }
}