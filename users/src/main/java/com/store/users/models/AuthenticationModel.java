package com.store.users.models;

import com.store.users.entities.UserApp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthenticationModel {
	private String token;
	private UserApp user;
}