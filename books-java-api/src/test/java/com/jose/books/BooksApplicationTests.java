package com.jose.books;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.jose.books.model.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
class BooksApplicationTests {

	@Test
	void givenEqualString_whenComparequality_thenReturnTrue() {
		User testUser = new User();
		testUser.setId("1");
		testUser.setFullname("Juan Magán");
		testUser.setUsername("juan");
		testUser.setEmail("juan@gmail.com");
		testUser.setPassword("1234");
		// testUser.setRole("user");

		assertEquals("Juan Magán", testUser.getFullname());
	}

	@Test
	void givenDifferentString_whenComparequality_thenReturnFalse() {
		User testUser = new User();
		testUser.setId("1");
		testUser.setFullname("Juan Magán");
		testUser.setUsername("juan");
		testUser.setEmail("juan@gmail.com");
		testUser.setPassword("1234");
		// testUser.setRole("user");

		assertNotEquals("Juan Rico", testUser.getFullname());
	}

	// @Test
	// void contextLoads() {
	// }

}
