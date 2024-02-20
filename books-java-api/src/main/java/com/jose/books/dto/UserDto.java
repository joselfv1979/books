package com.jose.books.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jose.books.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String id;

    private String fullname;

    private String username;

    @JsonIgnore
    private String password;

    private String email;

    private List<String> roles;

    public UserDto(String fullname, String username, String password, String email, List<String> roles) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

}
