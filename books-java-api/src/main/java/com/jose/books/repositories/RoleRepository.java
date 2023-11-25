package com.jose.books.repositories;

import java.util.Optional;

import com.jose.books.models.ERole;
import com.jose.books.models.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}
