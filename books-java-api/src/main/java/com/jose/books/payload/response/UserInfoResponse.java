package com.jose.books.payload.response;

import java.util.List;

public class UserInfoResponse {
	private String token;
    private int id;
	private String fullname;
	private String username;
	private String email;
	private List<String> roles;

	public UserInfoResponse(String token, int id, String fullname, String username, String email, List<String> roles) {
		this.token = token;
		this.id = id;
		this.fullname = fullname;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
