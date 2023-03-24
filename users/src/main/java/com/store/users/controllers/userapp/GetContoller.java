package com.store.users.controllers.userapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.userapp.UserAppReader;

@CrossOrigin
@RestController
public class GetContoller {
	@Autowired
	private UserAppReader userReader;

	@GetMapping("/user/{id}")
	public ResponseEntity<UserApp> getUser(@PathVariable Long id) {
		return userReader.getUser(id);
	}

	@GetMapping("/user/nonroots")
	public ResponseEntity<List<UserApp>> getUsers() {
		return userReader.getUsers();
	}

	@GetMapping("/user/roots")
	public ResponseEntity<List<UserApp>> getRootUsers() {
		return userReader.getRootUsers();
	}
}