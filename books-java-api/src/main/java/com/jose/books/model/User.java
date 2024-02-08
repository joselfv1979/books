package com.jose.books.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("users")
public class User implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  private String id;

  private String fullname;

  private String username;

  private String email;

  private String password;

  @DBRef
  private Set<Role> roles = new HashSet<>();

  public User(String username, String fullname, String email, String password) {
    this.username = username;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }
}
