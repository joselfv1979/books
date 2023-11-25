package com.jose.books;

import com.jose.books.models.User;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
class BooksApplicationTests {

	@Test
	public void givenEqualString_whenComparequality_thenReturnTrue() {
		User testUser = new User();
		testUser.setId(1);
		testUser.setFullname("Juan Magán");
		testUser.setUsername("juan");
		testUser.setEmail("juan@gmail.com");
		testUser.setPassword("1234");
		// testUser.setRole("user");

		assertEquals(testUser.getFullname(), "Juan Magán");
	}

	@Test
	public void givenDifferentString_whenComparequality_thenReturnFalse() {
		User testUser = new User();
		testUser.setId(1);
		testUser.setFullname("Juan Magán");
		testUser.setUsername("juan");
		testUser.setEmail("juan@gmail.com");
		testUser.setPassword("1234");
		// testUser.setRole("user");

		assertNotEquals(testUser.getFullname(), "Juan Rico");
	}

	// @Test
	// void contextLoads() {
	// }

}
