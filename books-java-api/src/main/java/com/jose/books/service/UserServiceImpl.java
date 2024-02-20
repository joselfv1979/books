package com.jose.books.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import com.jose.books.dto.UserDto;
import com.jose.books.exceptions.ResourceNotFoundException;
import com.jose.books.model.Role;
import com.jose.books.model.User;
import com.jose.books.payload.request.SignupRequest;
import com.jose.books.repository.RoleRepository;
import com.jose.books.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

        @Autowired
        UserRepository userRepository;
        @Autowired
        RoleRepository roleRepository;
        @Autowired
        PasswordEncoder encoder;

        // autowire model mapper instance
        @Autowired
        private ModelMapper modelMapper;

        private static final String USER_NOT_FOUND = "User not found";

        @Override
        public List<UserDto> getAllUsers() {
                List<User> userList = userRepository.findAll();

                // we use map to convert the User list into UserDto list
                return userList.stream().map(
                                user -> this.modelMapper.map(user, UserDto.class))
                                .collect(Collectors.toList());
        }

        @Override
        public UserDto findById(String id) {

                User user = this.userRepository.findById(id).orElseThrow(
                                () -> new ResourceNotFoundException(USER_NOT_FOUND));

                List<String> rolesList = user.getRoles().stream().map(Role::getName)
                                .collect(Collectors.toList());

                UserDto userDto = this.modelMapper.map(user, UserDto.class);
                userDto.setRoles(rolesList);

                return userDto;
        }

        @Override
        public UserDto findByEmail(String email) {

                User user = this.userRepository.findByEmail(email).orElseThrow(
                                () -> new ResourceNotFoundException(USER_NOT_FOUND));

                return this.modelMapper.map(user, UserDto.class);
        }

        @Override
        public UserDto findByUsername(String username) {

                User user = this.userRepository.findByUsername(username).orElseThrow(
                                () -> new ResourceNotFoundException(USER_NOT_FOUND));

                return this.modelMapper.map(user, UserDto.class);
        }

        @Override
        public UserDto updateUser(UserDto userDto) {

                Set<Role> roles = userDto.getRoles().stream()
                                .map(item -> roleRepository.findByName(item).get())
                                .collect(Collectors.toSet());
                User user = this.modelMapper.map(userDto, User.class);

                user.setRoles(roles);

                User userSaved = this.userRepository.save(user);

                List<String> rolesList = roles.stream().map(Role::getName)
                                .collect(Collectors.toList());

                UserDto responseDto = this.modelMapper.map(userSaved, UserDto.class);
                responseDto.setRoles(rolesList);

                return responseDto;
        }

        @Override
        public UserDto createUser(SignupRequest userRequest) {

                Set<Role> roles = getRoles(userRequest.getRoles());

                User user = this.modelMapper.map(userRequest, User.class);
                user.setPassword(encoder.encode(userRequest.getPassword()));
                user.setRoles(roles);

                User userSaved = this.userRepository.save(user);

                List<String> rolesList = roles.stream().map(Role::getName)
                                .collect(Collectors.toList());

                UserDto responseDto = this.modelMapper.map(userSaved, UserDto.class);
                responseDto.setRoles(rolesList);

                return responseDto;
        }

        @Override
        public void deleteUser(String id) {

                User user = this.userRepository.findById(id).orElseThrow(
                                () -> new ResourceNotFoundException(USER_NOT_FOUND));

                this.userRepository.delete(user);
        }

        private Set<Role> getRoles(List<String> roles) {

                final String ERROR_ROLE_NOT_FOUND = "Error: Role not found.";
                Set<Role> roleList = new HashSet<>();

                if (roles == null) {
                        Role userRole = roleRepository.findByName("USER")
                                        .orElseThrow(() -> new RuntimeException(ERROR_ROLE_NOT_FOUND));

                        roleList.add(userRole);
                } else {
                        roles.forEach(role -> {
                                roleRepository.findByName(role).ifPresent(roleList::add);
                        });
                }

                if (roleList.isEmpty()) {
                        roleRepository.findByName("USER").ifPresent(roleList::add);
                }

                return roleList;
        }

}
