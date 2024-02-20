package com.jose.books.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {

	private String token;
	private String id;
	private String fullname;
	private String username;
	private String email;
	private List<String> roles;

}
