package com.store.users.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.UserAppReader;

@RestController
public class UserAppContoller {
	@Autowired
	private UserAppReader userReader;

	@GetMapping("/user/{id}")
	public ResponseEntity<UserApp> getUser(@PathVariable Long id) {
		UserApp user = userReader.getUser(id);
		if (user == null) {
			return new ResponseEntity<UserApp>(user, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<UserApp>(user, HttpStatus.FOUND);
		}
	}
}