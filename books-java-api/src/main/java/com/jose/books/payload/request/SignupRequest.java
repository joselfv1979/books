package com.jose.books.payload.request;

import java.util.List;

import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

    @jakarta.validation.constraints.NotBlank(message = "Full name is required")
    @jakarta.validation.constraints.NotNull(message = "Invalid Fullname: Fullname is NULL")
    @jakarta.validation.constraints.Size(min = 3, max = 100, message = "Invalid Fullname: Must be of 3 - 100 characters")
    private String fullname;

    @NotBlank(message = "Name is required")
    @NotNull(message = "Invalid Name: Name is NULL")
    @Size(min = 3, max = 30, message = "Invalid Name: Must be of 3 - 30 characters")
    private String username;

    @Email(message = "Invalid email")
    private String email;

    private List<String> roles;

    @NotBlank(message = "Password is required")
    @NotNull(message = "Invalid Password: Password is NULL")
    @Size(min = 4, max = 20, message = "Invalid Password: Must be of 4 - 20 characters")
    private String password;

}
