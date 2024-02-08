package com.jose.books.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document("books")
@Data
@NoArgsConstructor
public class Book implements Serializable {

	@Id
	private String id;

	@NotBlank(message = "Title is mandatory")
	private String title;

	@NotEmpty(message = "Author is required")
	private String author;

	@Min(message = "Price is required", value = 1)
	private int price;

	@Min(message = "Pages is required", value = 1)
	private int pages;

	private String imagePath;

	private Set<User> users = new HashSet<>();

	private LocalDateTime createdAt = LocalDateTime.now();

	private LocalDateTime updatedAt = LocalDateTime.now();

	public Book(@NotBlank(message = "Title is mandatory") String title,
			@NotEmpty(message = "Author is required") String author,
			@Min(message = "Price is required", value = 1) int price,
			@Min(message = "Pages is required", value = 1) int pages, String imagePath, Set<User> users) {
		this.title = title;
		this.author = author;
		this.price = price;
		this.pages = pages;
		this.imagePath = imagePath;
		this.users = users;
	}

}
