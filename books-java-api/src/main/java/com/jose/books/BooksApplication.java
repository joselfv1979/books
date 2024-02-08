package com.jose.books;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BooksApplication {

	private static final Logger logger = LoggerFactory.getLogger(BooksApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BooksApplication.class, args);
		logger.info("Server is running");
	}

	@Bean
	public ModelMapper getModelMapper() {
		return new ModelMapper();
	}

}