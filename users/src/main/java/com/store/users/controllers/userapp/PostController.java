package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.userapp.UserAppWriter;

@RestController
public class PostController {
	@Autowired
	private UserAppWriter userWriter;

	@PostMapping("/user/save")
	public ResponseEntity<?> saveUser(@RequestBody UserApp user) {
		return userWriter.save(user);
	}
}