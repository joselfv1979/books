package com.jose.books.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookDto {

    private String id;

    private String title;

    private String author;

    private int price;

    private int pages;

    private String imagePath;

    @JsonIgnore
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonIgnore
    private LocalDateTime updatedAt = LocalDateTime.now();

    public BookDto(String title, String author, int price, int pages, String imagePath) {

        this.title = title;
        this.author = author;
        this.price = price;
        this.pages = pages;
        this.imagePath = imagePath;
    }

}